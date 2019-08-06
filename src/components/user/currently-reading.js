import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button, Rate } from 'antd';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
const CoverWrapper = styled.div`
  margin: 0rem 1rem 1rem 0rem;
`;
const BookInfo = styled.div`
  background: #eeeeee;
  border-radius: 5px;
  padding: 20px;
`;
const BookTitle = styled.h2`
  margin-bottom: 0;
`;
const BookAuthor = styled.small`
  margin-right: 1rem;
  span {
    font-weight: bold;
  }
`;
const BookDescriptionTitle = styled.small`
  display: block;
  font-weight: bold;
  margin-top: 1rem;
`;
const BookDescription = styled.div`
  min-height: 150px;
`;
const BookPageCount = styled.small`
  span {
    font-weight: bold;
  }
`;
const RatingTitle = styled.small`
  font-size: 70%;
  display: block;  
`;
const ReadMoreBtn = styled.button`
  background: none;
  border: none;
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
      author,
      avgRating,
      description,
      pageCount,
      title,
    } = this.state.book; {/* eslint-disable-line */}

    const { visible } = this.state;

    return (
      <Wrapper>
        <CoverWrapper>
          <img src={cover} alt="" />
          <Rate allowHalf disabled defaultValue={avgRating} />
          <RatingTitle>Rating</RatingTitle>
        </CoverWrapper>
        <BookInfo>
          <BookTitle>{title}</BookTitle>
          <BookAuthor>
            <span>Author </span>
            {author}
          </BookAuthor>
          <BookPageCount>
            <span>Pages </span>
            {pageCount}
          </BookPageCount>
          <BookDescriptionTitle>Description</BookDescriptionTitle>
          <BookDescription>
            {description.length < 200 ? description : (
              <div>
                {`${description.slice(0, 200)}...`}
                <ReadMoreBtn onClick={() => this.readMore(description)}>Read more</ReadMoreBtn>
              </div>
            )}
          </BookDescription>
          <Button type="primary" icon="check" onClick={() => this.modalConfirm(title)}>Complete</Button>
        </BookInfo>
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
