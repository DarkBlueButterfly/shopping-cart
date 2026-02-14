import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import styled from "styled-components";

const StyledIcon = styled(Icon)`
  color: red;
`;

const Item = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useOutletContext();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div>
      <h1>{product.title}</h1>
      <div style={{ display: "flex" }}>
        <img src={product.image} alt={product.title} />
        <div>
          <h3>Description</h3>
          <p>{product.description}</p>
          <h3>${product.price.toFixed(2)}</h3>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button
            onClick={() => {
              isInWishlist(product.id)
                ? removeFromWishlist(product.id)
                : addToWishlist(product);
            }}
          >
            {isInWishlist(product.id) ? (
              <StyledIcon path={mdiHeart} size={1} />
            ) : (
              <StyledIcon path={mdiHeartOutline} size={1} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
