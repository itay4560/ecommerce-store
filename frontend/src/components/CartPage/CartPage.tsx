import "./Cart.css";
import { Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useShoppingStore } from "../../store/useShoppingStore";
import CartItem from "./CartItem";
import agent from "../../api/agent";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart: cartItems, logOut, clearCart } = useShoppingStore();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.producPrice, 0);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-In", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const onCompleteOrder = async () => {
    try {
      await agent.UserActions.onPlaceAnOrder(cartItems);
      toast.success("Your order has been completed");
      clearCart();
    } catch (error: any) {
      console.log("🚀 ~ useEffect ~ fetchAll:", error);
      logOut();
    }
  };

  return (
    <>
      <div className="cartPage">
        {/* <MetaData title="Your Cart" /> */}
        <div className="cart_HeaderTop">
          <div className="headerLeft">
            <Typography variant="h5" component="h1" className="cartHeading">
              Shopping Cart
            </Typography>
          </div>
          <Typography variant="body2" className="cartText2">
            <Link to={"/products"}>Continue Shopping</Link>
          </Typography>
        </div>

        <div className="separator_cart2"></div>

        {cartItems.length === 0 ? (
          <div className="emptyCartContainer">
            <RemoveShoppingCartIcon className="cartIcon" />

            <Typography variant="h5" component="h1" className="cartHeading">
              Your Shopping Cart is Empty
            </Typography>
            <Typography variant="body1" className="cartText">
              Nothin' to see here.
            </Typography>
            <Typography variant="body1" className="cartText">
              Let's get shopping!
            </Typography>
            <Link to="/products">
              <Button className="shopNowButton">Shop Now</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart_content_wrapper">
              <div className="cart_left_container">
                {cartItems &&
                  cartItems.map((item) => (
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "none" }}
                      key={item.productId}
                    >
                      <CartItem
                        key={item.productId}
                        item={item}
                        length={cartItems.length}
                      />
                    </Link>
                  ))}
              </div>

              <div className="separator_cart3"></div>
              <div className="cart_right_container">
                <div className="order_summary">
                  <h4>
                    Order Summary &nbsp; ( {cartItems.length}{" "}
                    {cartItems.length > 1 ? "items" : "item"} )
                  </h4>
                  <div className="order_summary_details">
                    <div className="separator_cart"></div>
                    <div className="total_price order_Summary_Item">
                      <div>
                        <h4>Total Price</h4>

                        <p
                          style={{
                            fontSize: "14px",
                            marginTop: "-10px",
                            color: "#414141",
                          }}
                        >
                          (Inclusive of all taxes)
                        </p>
                      </div>
                      <p>
                        <b>{formatPrice(totalPrice)}</b>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="separator"></div>

                <Button
                  variant="contained"
                  className="btn-custom"
                  onClick={() => onCompleteOrder()}
                >
                  Complete order
                </Button>

                <div className="paymentLogoImg">
                  <img
                    src={"/Image/cart/cart_img.png"}
                    alt="payemnt-icons"
                    className="paymentImg"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
