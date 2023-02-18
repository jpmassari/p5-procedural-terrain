import styled from 'styled-components';
import type { NextPage } from "next";
import Head from "next/head";

import Header from '../components/header';
import Terrain from '../components/proceduralTerrain';
import Hexagon from '../components/customBackground';

const Container = styled.div`
line-height: 0;
overflow: hidden
`;
const Wrapper = styled.div`
  position: relative;
  bottom: 0%;
`;
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>João Pedro Massari Web Portfolio</title>
      </Head>
      <Header />
      <Container>
        <Hexagon/>
        <Wrapper>
          <Terrain />
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;
