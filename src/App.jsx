// import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styled from "styled-components";
import { useHook } from "./hooks/useHook";

const SplashContainer = styled.div`
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    filter: blur(120px);
    z-index: 0;
  }

  &::before {
    background: #ff4d6d;
    top: -100px;
    left: -100px;
  }

  &::after {
    background: #4d96ff;
    bottom: -150px;
    right: -150px;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const Wrapper = styled.div`
  main {
    padding-top: 2rem;
  }
  h1 {
    color: hotpink;
    -webkit-text-stroke: 2px blueviolet;
  }
  button {
    background-color: transparent;
  }
`;

function App() {
  const cartLogic = useHook();
  const { cartItems, wishlistItems } = cartLogic;

  return (
    <>
      <SplashContainer>
        <Content>
          <Wrapper>
            <Navbar cartItems={cartItems} wishlistItems={wishlistItems} />
            <main>
              <Outlet context={cartLogic} />
            </main>
            <Footer />
          </Wrapper>
        </Content>
      </SplashContainer>
    </>
  );
}

export default App;
