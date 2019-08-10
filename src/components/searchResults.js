import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pagination, Button } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
`;
const InnerWrapper = styled.div`
  border-top: 1px solid #a7a7a7;
  border-bottom: 1px solid #a7a7a7;
  padding: 1rem 0;
  margin: 1rem 0;
`;
const ItemWrapper = styled.div`
  display: flex;
  margin: 1.5rem 0;
`;
const CoverWrapper = styled.div`
`;
const InfoWrapper = styled.div`
  margin-left: 30px;
  width: 500px;
  position: relative;

  button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
const BookTitle = styled.h2`
  font-weight: bolder;
  margin-bottom: 0;

  span {
    color: #0000006b;
    font-weight: 100;
  }
`;
const AuthorList = styled.div`
  font-size: 12px;
  span {
    font-weight: bold;
  }
`;
class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentPage: 1,
      offset: 10,
      saveBookState: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ saveBookState: false });
    } else {
      this.setState({ saveBookState: true });
    }

    this.setState(async (prevState) => {
      const { data } = this.props.location.state; {/* eslint-disable-line */}
      const state = prevState;
      state.data = data;

      return state;
    });
  }

  static getDerivedStateFromProps(props) {
    return {
      data: props.location.state.data,
    };
  }

  handleClick = (page) => {
    this.setState({ currentPage: page });
  }

  renderItems() {
    const {
      currentPage,
      offset,
      data,
      saveBookState,
    } = this.state;

    const lastIndex = currentPage * offset;
    const firstIndex = lastIndex - offset;
    const currentTodos = data.slice(firstIndex, lastIndex);

    const items = currentTodos.map((item) => {
      const hasPropImgLinks = Object.prototype.hasOwnProperty.call(item.volumeInfo, 'imageLinks');
      const hasPropTextSnippet = Object.prototype.hasOwnProperty.call(item.searchInfo, 'textSnippet');
      const hasPropAuthors = Object.prototype.hasOwnProperty.call(item.volumeInfo, 'authors');
      const hasPropPublishedDate = Object.prototype.hasOwnProperty.call(item.volumeInfo, 'publishedDate');

      const imgSrc = hasPropImgLinks ? item.volumeInfo.imageLinks.smallThumbnail : 'https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png';
      const textSnippet = hasPropTextSnippet ? item.searchInfo.textSnippet : '';
      const authors = hasPropAuthors ? item.volumeInfo.authors.map(author => author) : [];
      const publishedDate = hasPropPublishedDate ? item.volumeInfo.publishedDate : '';

      return (
        <ItemWrapper key={item.id}>
          <CoverWrapper>
            <Link to={`/book/${item.id}`}><img src={imgSrc} style={{ width: '128px' }} alt={item.volumeInfo.title} /></Link>
          </CoverWrapper>
          <InfoWrapper>
            <BookTitle>
              {item.volumeInfo.title}
              <span>
                &nbsp;|&nbsp;
                {moment(publishedDate).format('YYYY')}
              </span>
            </BookTitle>
            <AuthorList>
              {authors.length
                ? (
                  <p>
                    <span>by</span>
                    &nbsp;
                    {
                      authors.join(', ')
                    }
                  </p>
                )
                : ''}
            </AuthorList>
            <p>{textSnippet}</p>
            <Button disabled={saveBookState}>Save To Bookshelf</Button>
          </InfoWrapper>
        </ItemWrapper>
      );
    });

    return items;
  }

  render() {
    const { data, currentPage, offset } = this.state;
    let searchResultHeader = `TOP 40 MATCHES FOUND FOR "${window.location.search.split('?query=')[1]}"`;

    if (data.length < 40) {
      searchResultHeader = `${data.length} MATCHES FOUND FOR "${window.location.search.split('?query=')[1]}"`;
    }

    return (
      <Wrapper>
        <h2>{searchResultHeader}</h2>
        <InnerWrapper>
          {this.renderItems()}
        </InnerWrapper>
        <Pagination
          onChange={this.handleClick}
          current={currentPage}
          pageSize={offset}
          size="small"
          total={
            data.length
              ? data.length
              : 1
          }
        />
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return { searchResults: state.searchResults };
}

export default connect(mapStateToProps, null)(SearchResults);


SearchResults.propTypes = {
  data: PropTypes.arrayOf({}),
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: PropTypes.arrayOf({}),
    }),
  }),
};

SearchResults.defaultProps = {
  data: [],
  location: {
    state: {
      data: [],
    },
  },
};
