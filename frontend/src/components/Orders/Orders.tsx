import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { Product } from "../../models/Product";
import { DeleteForever } from "@mui/icons-material";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard";

const Orders = () => {
  const [userOrders, setUserOrders] = useState<any>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const _orders = await agent.Orders.getUserOrders();
      if (_orders) {
        setUserOrders(_orders);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-In", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const onDeleteOrder = async (orderId: number) => {
    await agent.Orders.deleteOrder(orderId);
    toast.success(`Order ${orderId} has beed deleted`);
    setUserOrders((prev: any) => {
      return prev.filter((o: any) => {
        return o["orderId"] !== orderId;
      });
    });
  };

  const calcToalOrderPrice = (_order: any) => {
    if (_order["products"]) {
      const totalPrice = _order["products"].reduce(
        (acc: number, item: Product) => acc + item.producPrice,
        0
      );
      return formatPrice(totalPrice);
    }
  };

  return (
    <Container sx={{ minHeight: "800px" }}>
      <Typography variant="h2">My Orders</Typography>

      {userOrders && userOrders.length == 0 && (
        <Typography variant="h4">No orders yet</Typography>
      )}

      {userOrders &&
        userOrders.length > 0 &&
        userOrders.map((order: any, index: number) => {
          return (
            <Box
              key={order["orderId"]}
              sx={{
                marginBottom: "20px",
                border: "1px solid",
                marginTop: "30px",
                borderRadius: "30px",
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "15px",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4">
                    Order:{" "}
                    <span style={{ color: "red" }}>#{order["orderId"]}</span>
                  </Typography>
                  <Typography variant="h6">
                    Total Price: {calcToalOrderPrice(order)}
                  </Typography>
                </Box>
                <Box
                  onClick={() => onDeleteOrder(order["orderId"])}
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      color: "red",
                    },
                  }}
                >
                  <DeleteForever style={{ fontSize: "2rem" }} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  padding: "15px",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {order["products"].map((product: Product, index: number) => {
                  return (
                    <Box key={product.productId} sx={{ width: "300px" }}>
                      <ProductCard product={product} />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
    </Container>
  );
};

export default Orders;
