import { NavLink } from "react-router";
import useTheme from "../hooks/useTheme";
import styled from "styled-components";
import Icon from "@mdi/react";
import {
  mdiCartOutline,
  mdiHeart,
  mdiHeartOutline,
  mdiThemeLightDark,
} from "@mdi/js";

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.5rem;
  margin: 0 25px;

  &.active {
    color: lightblue;
  }
  &:hover {
    color: hotpink;
  }
  svg {
    width: 1.5em;
    height: 1.5em;
    margin-top: 10px;
  }
`;

const HeartBadge = styled.span`
  font-size: 1rem;
  svg {
    color: red;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  right: 90px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  text-align: center;
`;

const Button = styled.button`
  background: transparent;
  color: #646cff;
  &:hover {
    color: hotpink;
  }
  svg {
    width: 2em;
    height: 2em;
    margin-top: 4px;
  }
`;

const Navbar = ({ cartItems, wishlistItems }) => {
  const { theme, setTheme } = useTheme();

  const itemTotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <StyledNav>
      <StyledNavLink style={{ marginLeft: "15px" }} to="/">
        Home
      </StyledNavLink>
      <StyledDiv>
        <StyledNavLink to="products">Products</StyledNavLink>
        <StyledNavLink to="wishlist">
          Wishlist
          {wishlistItems.length > 0 ? (
            <HeartBadge>
              <Icon path={mdiHeart} />
            </HeartBadge>
          ) : (
            <HeartBadge>
              <Icon path={mdiHeartOutline} />
            </HeartBadge>
          )}
        </StyledNavLink>
        <StyledNavLink to="/cart">
          <CartBadge>{itemTotal}</CartBadge>
          <Icon path={mdiCartOutline} title="Go to Cart" />
        </StyledNavLink>
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={
            theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          <Icon path={mdiThemeLightDark} />
        </Button>
      </StyledDiv>
    </StyledNav>
  );
};

export default Navbar;
