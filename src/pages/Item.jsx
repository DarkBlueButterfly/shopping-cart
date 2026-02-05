import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Item = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h1>This page is for the individual items</h1>
      <h2>Product ID: {productId}</h2>
      <img src={product.image} alt={product.name} />
      <div>
        <h1>{product.title}</h1>
        <p>${product.price}</p>
        <p>{product.description}</p>
        <p>{product.category}</p>
      </div>
    </div>
  );
};

export default Item;
