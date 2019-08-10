import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Collapse,
  Button,
  Rate,
} from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import Divider from '../../styled-components/divider';

const Wrapper = styled.div``;
const InnerWrapper = styled.div`
  display: flex;
`;
const InfoWrapper = styled.div`
  h3 {
    font-size: 30px;
    margin-bottom: 0;
  }
`;
const CoverWrapper = styled.div`
  margin-right: 5rem;
  a {
    font-size: 12px;
    display: block;

    svg {
      margin-right: 5px;
    }
  }
`;
const MainSection = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;
const BookAdditionalInfo = styled.ul`
  margin: 0 0 1rem 0;
  padding: 0;

  li {
    display: inline-block;
    margin-right: 5px;
    font-size: 12px;
  }
`;
const RatingWrapper = styled.small`
  ul {
    display: inline-block !important;
    margin: 1rem 0 !important;
  }
`;
const Authors = styled.p`
  margin: 0;
`;
const InformationWrapper = styled.div`
  width: 250px;
`;
const ListItem = styled.div`
  display: flex;
`;
const ListName = styled.p`
  flex: 1
`;
const ListValue = styled.p`
  flex: 1
`;
const ButtonWrapper = styled.div`
  button {
    margin-right: 1rem;
  }
`;
const { Panel } = Collapse;

class BookProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [{ items: [] }],
      saveBookState: false,
    };
  }

  async componentDidMount() {
    const bookId = window.location.pathname.split('/')[2];

    if (localStorage.getItem('token')) {
      this.setState({ saveBookState: false });
    } else {
      this.setState({ saveBookState: true });
    }

    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookId}`).then(res => res.json()).then((json) => {
      this.setState({ results: [json] });
    });
  }


  saveBook = (book) => {
    const bookId = this.props.match.params.book_id; {/* eslint-disable-line */}
    const { loggedInUserListId, loggedInUserId } = this.props;

    const data = {
      id: loggedInUserListId,
      content: {
        bookId,
        title: book.title,
        author: book.authors[0],
        cover: book.imageLinks.smallThumbnail,
        description: book.description,
        avgRating: book.averageRating,
        pageCount: book.pageCount,
        isbn: book.industryIdentifiers[0].identifier,
        status: 'backlog',
      },
    };

    // save book to user's backlog
    fetch(`http://localhost:3000/user/addbook/${loggedInUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => console.log(res));
  }


  render() {
    const { results, saveBookState } = this.state;

    if (results[0].items.length === 0) return <div>loading</div>;

    const {
      authors,
      averageRating,
      categories,
      description,
      imageLinks,
      pageCount,
      title,
      industryIdentifiers,
      previewLink,
      publisher,
      publishedDate,
    } = results[0].items[0].volumeInfo;

    const { textSnippet } = results[0].items[0].searchInfo;
    const { buyLink, saleability } = results[0].items[0].saleInfo;
    const renderAuthors = authors.map(author => author);
    const isForSale = saleability !== 'NOT_FOR_SALE' ? <a target="_blank" rel="noopener noreferrer" href={buyLink}><Button icon="tag">Buy E-Book</Button></a> : '';

    return (
      <Wrapper>
        <InnerWrapper>
          <CoverWrapper>
            <img src={imageLinks.thumbnail} alt="cover" />
          </CoverWrapper>
          <InfoWrapper>
            <MainSection>
              <h3>{title.toUpperCase()}</h3>
              <Authors>
                <span>by </span>
                {renderAuthors.join(', ')}
              </Authors>
              <RatingWrapper>
                {moment(publishedDate).format('LL')}
                <Divider>|</Divider>
                <Rate value={averageRating} disabled />
              </RatingWrapper>
              <p>{textSnippet}</p>

              <BookAdditionalInfo>
                {categories !== undefined ? categories.map(category => <li key={category}>{category}</li>) : ''}
                &nbsp;
                <li>
                  {pageCount}
                  &nbsp;
                  pages
                </li>
              </BookAdditionalInfo>

              <ButtonWrapper>
                <a target="_blank" rel="noopener noreferrer" href={previewLink}><Button icon="eye">Preview</Button></a>
                {isForSale}
                <Button onClick={() => this.saveBook(results[0].items[0].volumeInfo)} disabled={saveBookState}>{saveBookState ? 'Log in to save book' : 'Save To Bookshelf' }</Button>
                ;
              </ButtonWrapper>
            </MainSection>

            <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
              <Panel header="Description" key="1">
                <p>{description}</p>
              </Panel>
              <Panel header="Details and Specs" key="2">
                <InformationWrapper>
                  <ListItem>
                    <ListName>Publisher:</ListName>
                    <ListValue>{publisher}</ListValue>
                  </ListItem>
                  <ListItem>
                    <ListName>Published Date:</ListName>
                    <ListValue>{moment(publishedDate).format('LL')}</ListValue>
                  </ListItem>
                  <ListItem>
                    <ListName>Pages:</ListName>
                    <ListValue>{pageCount}</ListValue>
                  </ListItem>
                  <ListItem>
                    <ListName>Category:</ListName>
                    <ListValue>{categories.map(category => category).join(', ')}</ListValue>
                  </ListItem>
                  <ListItem>
                    <ListName>ISBN 13:</ListName>
                    <ListValue>{industryIdentifiers[0].identifier}</ListValue>
                  </ListItem>
                  <ListItem>
                    <ListName>ISBN 10:</ListName>
                    <ListValue>{industryIdentifiers[1].identifier}</ListValue>
                  </ListItem>
                </InformationWrapper>
              </Panel>
            </Collapse>
          </InfoWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUserId: state.getUser.id,
    loggedInUserListId: state.getUser.list_id,
  };
}

export default connect(mapStateToProps, null)(BookProfile);

BookProfile.propTypes = {
  loggedInUserListId: PropTypes.number.isRequired,
  loggedInUserId: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      book_id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
