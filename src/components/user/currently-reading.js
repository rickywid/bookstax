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
const BookDescription = styled.p`
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

class CurrentlyReading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: [],
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

  modalConfirm(title) {
    Modal.confirm({
      title: 'Confirm',
      content: `Are you finished reading ${title}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: this.confirmation.bind(this),
    });
  }

  confirmation() {
    const { markBookCompleted, index } = this.props;

    markBookCompleted(index);
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
          <BookDescription>{description}</BookDescription>
          <Button type="primary" icon="check" onClick={() => this.modalConfirm(title)}>Complete</Button>
        </BookInfo>
      </Wrapper>
    );
  }
}

export default CurrentlyReading;


CurrentlyReading.propTypes = {
  markBookCompleted: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
