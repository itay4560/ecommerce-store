import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import { Product } from "../../models/Product";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import "./ProductDetails.css";
import BackButton from "../BackButton";
import { Button } from "@mui/material";
import { useShoppingStore } from "../../store/useShoppingStore";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const { user, addToCart, cart } = useShoppingStore();

  useEffect(() => {
    if (cart.length > 0 && product) {
      const cartItem = cart.find(
        (item) => item.productId === product.productId
      );

      if (cartItem) {
        setIsProductInCart(true);
      }
    }
  }, [cart, product]);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const _product = await agent.Products.getProductById(id);
        setProduct(_product);
      }
    };
    fetch();
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-In", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const onAddToCart = () => {
    addToCart(product);
    setIsProductInCart(true);
    toast.success("Product added to cart");
  };

  return (
    <div className="">
      {/* <MetaData title={product?.producTitle} /> */}
      <section id="product_details" className="section">
        <div style={{ marginTop: "10px", marginLeft: "10px" }}>
          <BackButton />
        </div>
        <div className="product_container">
          <div className="wrapper prod_details_wrapper">
            {/*=== Product Details Left-content ===*/}
            <div className="prod_details_left_col">
              <figure className="prod_details_img">
                <img src={product?.producImage} alt="product-img" />
              </figure>
            </div>

            {/*=== Product Details Right-content ===*/}
            <div className="prod_details_right_col_001">
              <h1 className="prod_details_title">{product?.producTitle}</h1>

              <div className="prod_details_price">
                <div className="price_box">
                  <h2 className="price">
                    {product && formatPrice(product?.producPrice)}
                  </h2>
                </div>
              </div>

              <div className="seprator2"></div>

              <div className="productDescription">
                <div className="productDiscriptiopn_text">
                  <h4>Descripition :</h4>
                  <p>{product?.producDescription}</p>
                </div>
                <div className="prod_details_offers">
                  <h4>Offers and Discounts</h4>
                  <ul>
                    <li>No Cost EMI on Credit Card</li>
                    <li>Pay Later Cashback</li>
                  </ul>
                </div>
                <div className="deliveryText">
                  <LocalShippingOutlinedIcon />
                  <div style={{ marginLeft: "10px" }}>
                    We deliver! Just say when and how.
                  </div>
                </div>
                <div style={{ marginTop: "15px" }}>
                  {!isProductInCart && user && (
                    <Button onClick={() => onAddToCart()} variant="contained">
                      Add to cart
                    </Button>
                  )}
                  {isProductInCart &&
                    user &&
                    "This product already in your cart"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
