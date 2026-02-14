import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useOutletContext } from "react-router";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";

// to include the add to cart button
const StyledDiv = styled.div`
  // width: 300px;
  // width: 100%;
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

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useOutletContext();

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
          <StyledDiv key={product.id}>
            <ProductCard key={product.id} product={product} />
            <button
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
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </StyledDiv>
        ))}
      </Body>
    </div>
  );
};

export default Products;
