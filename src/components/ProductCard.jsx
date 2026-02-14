import { Link } from "react-router";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 300px;
`;

const StyledImg = styled.img`
  width: 250px;
`;

const ProductCard = ({ product }) => {
  return (
    <StyledDiv>
      <Link to={`/products/${product.id}`} className="product-card">
        <StyledImg src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price.toFixed(2)}</p>
      </Link>
    </StyledDiv>
  );
};

export default ProductCard;
