import { Link, useNavigate, useOutletContext } from "react-router";
import styled from "styled-components";

const CartBody = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledCartCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin: 20px 0;
`;

const StyledImg = styled.img`
  width: 136px;
`;

const QuantityDiv = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const SummaryDiv = styled.div`
  position: sticky;
  top: 0;
  width: 50%;
  height: 100vh;
  margin-left: 15px;
`;

const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Cart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart, addToWishlist } =
    useOutletContext();

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/checkout");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <>
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
      </>
    );
  }

  return (
    <>
      <h1>Your Cart</h1>
      <CartBody>
        <div>
          {cartItems.map((item) => (
            <StyledCartCard key={item.id}>
              <StyledImg src={item.image} alt={item.title} />

              <div>
                <Link to={`/products/${item.id}`}>
                  <h3>{item.title}</h3>
                </Link>

                <QuantityDiv>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <p>Qty: {item.quantity}</p>
                  <button onClick={() => addToCart(item)}>+</button>
                </QuantityDiv>
              </div>

              <div>
                <h3>${(item.price * item.quantity).toFixed(2)}</h3>
                <button
                  onClick={() => {
                    addToWishlist(item);
                    removeFromCart(item.id);
                  }}
                >
                  Save for later
                </button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </StyledCartCard>
          ))}
        </div>

        <SummaryDiv>
          <h2>Order Summary</h2>
          <hr style={{ width: "50%" }} />
          <DivFlex>
            <p>
              <strong>Subtotal </strong>(quantity)
            </p>
            <p>${total.toFixed(2)}</p>
          </DivFlex>
          <DivFlex>
            <p>Shipping </p>
            <p>Free</p>
          </DivFlex>
          <DivFlex>
            <p>Taxes</p>
            <p>Calculated at Checkout</p>
          </DivFlex>
          <DivFlex>
            <h3>Total:</h3>
            <h3>${total.toFixed(2)}</h3>
          </DivFlex>

          <button onClick={handleNavigation}>Continue to Checkout</button>
        </SummaryDiv>
      </CartBody>
    </>
  );
};

export default Cart;
