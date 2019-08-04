import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Rate } from 'antd';


const BookCoverWrap = styled.div`
  float: left;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;
const BookCover = styled.img`
  display: block
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
const BookshelfBookModal = (props) => {
  const {
    cover,
    title,
    author,
    pageCount,
    description,
    avgRating,
  } = props.content;  {/* eslint-disable-line */}


  return (
    <div className="modal__bookshelf-book">
      <BookCoverWrap>
        <BookCover src={cover} alt="book cover" />
        <Rate allowHalf disabled defaultValue={avgRating} />
        <RatingTitle>Rating</RatingTitle>
      </BookCoverWrap>
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
    </div>
  );
};

export default BookshelfBookModal;


BookshelfBookModal.propTypes = {
  content: PropTypes.shape({
    cover: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    pageCount: PropTypes.number,
    avgRating: PropTypes.number,
  }),
};

BookshelfBookModal.defaultProps = {
  content: {
    cover: '',
    title: '',
    author: '',
    description: '',
    pageCount: null,
    avgRating: null,
  },
};
