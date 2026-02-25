import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useOutletContext } from "react-router";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Body = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2px;
  margin-top: 15px;
  justify-items: center;
  align-items: center;
  text-align: center;
`;

const StyledIcon = styled(Icon)`
  color: red;
`;

const QuantityDiv = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        setProducts(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    isInCart,
    addToCart,
    decreaseQty,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useOutletContext();

  if (loading) {
    return <p>Loading Products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <Body>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard key={product.id} product={product} />
            <StyledDiv>
              <button
                title={
                  isInWishlist(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                onClick={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
              >
                {isInWishlist(product.id) ? (
                  <StyledIcon path={mdiHeart} size={1} />
                ) : (
                  <StyledIcon path={mdiHeartOutline} size={1} />
                )}
              </button>
              {isInCart(product.id) ? (
                <QuantityDiv>
                  <button
                    title="Decrease amount"
                    onClick={() => decreaseQty(product.id)}
                  >
                    -
                  </button>
                  <p
                    title={`You have ${isInCart(product.id).quantity} in your cart`}
                  >
                    Qty: {isInCart(product.id).quantity}
                  </p>
                  <button
                    title="Increase amount"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </QuantityDiv>
              ) : (
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              )}
            </StyledDiv>
          </div>
        ))}
      </Body>
    </div>
  );
};

export default Products;
