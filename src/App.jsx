import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styled from "styled-components";

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
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === product.id);
      if (item) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isInCart = (id) => {
    return cartItems.find((i) => i.id === id);
  };

  const addToWishlist = (product) => {
    setWishlistItems((prev) => [...prev, product]);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlistItems.find((i) => i.id === id);
  };

  return (
    <>
      <SplashContainer>
        <Content>
          <Wrapper>
            <Navbar cartItems={cartItems} wishlistItems={wishlistItems} />
            <main>
              <Outlet
                context={{
                  cartItems,
                  addToCart,
                  decreaseQty,
                  removeFromCart,
                  isInCart,
                  wishlistItems,
                  addToWishlist,
                  removeFromWishlist,
                  isInWishlist,
                }}
              />
            </main>
            <Footer />
          </Wrapper>
        </Content>
      </SplashContainer>
    </>
  );
}

export default App;
