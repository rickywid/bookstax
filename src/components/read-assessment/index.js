import React from 'react';
import { Button, Table } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Timer from '../../helpers/timer';
import { data, dataSource, columns } from './data';

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 800px;
  padding-bottom: 5rem;
  margin: 0 auto;

  img {
    width: 150px;
  }
`;
const BookImg = styled.img`
  outline: ${props => (props.index === props.selectedBook ? '5px solid pink' : 'none')};
  transition: outline .2s;
`;
const ErrorMsg = styled.p`
  color: red;
`;
const ButtonStyle = styled(Button)`
  display: block !important;
  width: 300px;
  margin: 0 auto;
`;
const ResultWrapper = styled.div`
  margin-top: 2rem;
`;

class ReadAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartPage: true,
      startTime: false,
      showResults: false,
      wpm: 0,
      selectedBook: null,
      showError: false,
    };

    this.timer = new Timer();
  }

  componentDidMount() {
    console.log('read assessment mounted');
  }

  handleChange = (index) => {
    this.setState({ selectedBook: index });
  }

  onHandleStart = () => {
    const { selectedBook } = this.state;
    if (selectedBook === null) {
      this.setState({ showError: true });

      return;
    }

    this.setState((prevState) => {
      const state = prevState;
      state.showStartPage = !prevState.showStartPage;
      state.startTime = true;
      this.timer.start();

      return state;
    });
  }

  onHandleStop = () => {
    this.setState((prevState) => {
      const state = prevState;
      state.startTime = false;
      state.showResults = true;
      const time = this.timer.stop();

      state.wpm = this.calculateWpm(time);
      return state;
    });
  }

  calculateWpm(time) {
    const { selectedBook } = this.state;
    const seconds = (60 * time.minutes) + time.seconds;
    // wordCount = 944
    // seconds is 273
    // WordsPerSecond = wordCount / seconds = 3.64
    // WPM = 3.64 * 60 = 218.46

    this.setState((prevState) => {
      const state = prevState;
      state.wpm = (data[selectedBook].wordCount / seconds) * 60;
      return state;
    });
  }

  render() {
    const {
      showStartPage,
      showResults,
      wpm,
      showError,
      selectedBook,
    } = this.state;
    const error = showError ? <ErrorMsg>Must select a book</ErrorMsg> : '';

    if (showStartPage) {
      return (
        <div className="animated fadeIn">
          <h1>Reading Assessment</h1>

          <p>
            When it comes to your brain, researchers have found there&apos;s no better superfood than a book.
          </p>
          <p>
            Quickly determine your reading speed and comprehension using themed and leveled reading comprehension tests.
            Your ability to read at higher speeds with good comprehension can dramatically affect your ability to succeed in school and in your career. Efficient reading leads to efficient learning. In today&apos;s information world there is no skill that is more important.
          </p>

          <p>The timer will begin once you click Start. Please select one of the following books.</p>
          <SelectWrapper>
            {data.map((book, index) => <BookImg onClick={() => this.handleChange(index)} index={index} selectedBook={selectedBook} src={book.cover} alt={book.title} />)}
          </SelectWrapper>
          <ButtonStyle onClick={this.onHandleStart}>Start</ButtonStyle>
          {error}
        </div>
      );
    }

    return (
      <div className="read-assessment">
        <p style={{ fontWeight: 'bold' }}>{data[selectedBook].title}</p>
        <div dangerouslySetInnerHTML={{ __html: data[selectedBook].excerpt }} />
        <ButtonStyle onClick={this.onHandleStop} type="button">Stop</ButtonStyle>
        { showResults
          ? (
            <ResultWrapper>
              <p>
                You have a reading speed of&nbsp;
                <span style={{ fontWeight: 'bold' }}>{ Math.floor(wpm) }</span>
                .&nbsp;
                <Link style={{ fontWeight: 'bold' }} to="/signup">Sign Up</Link>
              </p>
              <Table pagination={false} dataSource={dataSource} columns={columns} />
              <small><a href="http://www.readingsoft.com/" target="_blank" rel="noreferrer noopener">source</a></small>
            </ResultWrapper>
          )
          : <div />
        }
      </div>
    );
  }
}

export default ReadAssessment;
