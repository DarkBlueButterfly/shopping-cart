import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Link to={`/products/${product.id}`} className="product-card">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
