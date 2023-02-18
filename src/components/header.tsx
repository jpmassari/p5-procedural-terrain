import styled from 'styled-components';

const Name = styled.p`
  font-family: 'PT Sans', sans-serif;
  font-size: 32px;
  color: #fff;
  margin: auto;
  padding: 10px 0 10px 20px;
  line-height: 32px;
`;
const Container = styled.div`
  display: inline-block;
`;
const DivisorLine = styled.div`
  position: relative;
  bottom: 20px;
  margin: auto;
  background-color: #000;
  height: 4px;
`;

const Header = () => {
  return (
    <Container>
      <Name>João Pedro</Name>
{/*       <DivisorLine /> */}
    </Container>
  )
}

export default Header;