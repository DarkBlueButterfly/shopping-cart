import { Link } from "react-router";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 300px;
`;

const StyledImg = styled.img`
  width: 250px;
`;

const StyledText = styled.div`
  color: blueviolet;
`;

const ProductCard = ({ product }) => {
  return (
    <StyledDiv>
      <Link
        to={`/products/${product.id}`}
        className="product-card"
        title={product.title}
      >
        <StyledImg src={product.image} alt={product.title} />
        <StyledText>
          <h3>{product.title}</h3>
          <p>${product.price.toFixed(2)}</p>
        </StyledText>
      </Link>
    </StyledDiv>
  );
};

export default ProductCard;
