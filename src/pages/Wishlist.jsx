import { Link, useOutletContext } from "react-router";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

const StyledCard = styled.div`
  gap: 5px;
  margin-bottom: 20px;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 4fr 1fr;
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: stretch;
`;

// same as Cart
const StyledImg = styled.img`
  width: 136px;
`;

const Wishlist = () => {
  const { addToCart, wishlistItems, removeFromWishlist } = useOutletContext();

  if (wishlistItems.length === 0) {
    return (
      <>
        <h1>Wishlist</h1>
        <p>There's nothing in your Wishlist...</p>
        <Link to={`/products`}>Check out the Products Page!</Link>
      </>
    );
  }

  return (
    <>
      <h1>Your Wishlist</h1>
      <div>
        {wishlistItems.map((item) => (
          <StyledCard key={item.id}>
            <button onClick={() => removeFromWishlist(item.id)}>
              <Icon path={mdiTrashCanOutline} size={1} />
            </button>
            <div>
              <StyledLink to={`/products/${item.id}`}>
                <StyledImg src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <h3>${item.price.toFixed(2)}</h3>
                </div>
              </StyledLink>
            </div>
            <button
              onClick={() => {
                addToCart(item);
                removeFromWishlist(item.id);
              }}
            >
              Move to Cart
            </button>
          </StyledCard>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
