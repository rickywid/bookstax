import React, { Component } from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/simpleAction';
import Api from '../../services/api';

const ButtonDanger = styled(Button)`
  background: #f5222d !important;
  color: white !important;
  border-color: transparent !important;
  &:hover {
    background: #f5222dc2 !important
    border-color: transparent !important;
  }

  &:disabled {
    background: grey !important;
  }
`;

class ConfirmDelete extends Component {
  api = new Api().Resolve();

  constructor(props) {
    super(props);

    this.state = {
      isDisabled: true,
    };
  }

  handleDelete = () => {
    const { id, signOut } = this.props;

    this.api.deleteUser(id);
    signOut();
  }

  onHandleChange = (e) => {
    const inputVal = e.target.value;
    const { username } = this.props;

    if (inputVal === username) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled } = this.state;
    const { username } = this.props;

    return (
      <div>
        <p>
          Deleting your account is irreversible. Enter your username
          (
          <span style={{ color: 'red' }}>{username}</span>
          )
          to confirm you want to permanently delete your account.
        </p>
        <Input style={{ marginBottom: '1rem' }} onChange={this.onHandleChange} />
        {isDisabled ? <Button disabled>Delete Account</Button> : <ButtonDanger onClick={this.handleDelete}>Delete Account</ButtonDanger>}
      </div>
    );
  }
}

export default connect(null, actions)(ConfirmDelete);

ConfirmDelete.propTypes = {
  username: PropTypes.string,
  id: PropTypes.number,
  signOut: PropTypes.func.isRequired,
};

ConfirmDelete.defaultProps = {
  username: '',
  id: null,
};
