import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;
const CoverWrapper = styled.div`
`;

class CurrentlyReading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: [],
      visible: false,
    };
  }

  componentDidMount() {
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const state = prevState;
    state.book = nextProps.book;

    return {
      book: state.book,
    };
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  readMore() {
    this.setState({ visible: true }, () => console.log(this.state));
  }

  confirmation() {
    const { markBookCompleted, index } = this.props;

    markBookCompleted(index);
  }

  modalConfirm(title) {
    Modal.confirm({
      title: 'Confirm',
      content: `Are you finished reading ${title}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: this.confirmation.bind(this),
    });
  }

  render() {
    const {
      cover,
      description,
      title,
      status,
      bookId,
    } = this.state.book; {/* eslint-disable-line */}
    const { visible } = this.state;

    return (
      <Wrapper>
        <Link to={`/book/${bookId}`}>
          <CoverWrapper>
            <img src={cover} alt="" />
          </CoverWrapper>
        </Link>
        {status === 'current' ? <Button type="primary" icon="check" onClick={() => this.modalConfirm(title)}>Complete</Button> : ''}
        <Modal
          title=""
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div>
            {description}
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

export default CurrentlyReading;


CurrentlyReading.propTypes = {
  markBookCompleted: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
