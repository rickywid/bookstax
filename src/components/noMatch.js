import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const Wrapper = styled.div`
  height: calc(100vh - 193px);
  display: flex;
  margin: auto;
`;
const InnerWrapper = styled.div`
  margin: auto;
`;
const IconStyle = styled(Icon)`
  display: block;
  font-size: 28px;
  display: block !important;
  margin-bottom: 2rem;
`;

class NoMatch extends React.Component {
  componentDidMount() {
    console.log('no match mounted');
  }

  render() {
    return (
      <Wrapper className="animated fadeIn">
        <InnerWrapper>
          <IconStyle type="home" />
          <h1>The page you are looking for does not exist</h1>
          <p style={{ textAlign: 'center' }}>
            Go back to&nbsp;
            <Link to="/home">homepage</Link>
          </p>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default NoMatch;
