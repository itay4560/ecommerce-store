import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Product } from "../../models/Product";
import ProductCard from "../ProductCard";
import { DeleteForever } from "@mui/icons-material";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { useAdminShoppingStore } from "../../store/useAdminShoppingStore";
import { TablePagination } from "@mui/material";

export const TableOrders = () => {
  const [orders, setOrders] = React.useState<any>([]);
  const { data } = useAdminShoppingStore();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (data.orders) {
      setOrders(data.orders);
    }
  }, [data.orders]);

  const onDeleteOrder = async (orderId: number) => {
    await agent.Orders.deleteOrder(orderId);
    toast.success(`Order ${orderId} has beed deleted`);
    setOrders((prev: any) => {
      return prev.filter((o: any) => {
        return o["orderId"] !== orderId;
      });
    });
  };

  function Row(props: { row: ReturnType<any> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.orderId}
          </TableCell>
          <TableCell>{row["fkUserId"]["userEmail"]}</TableCell>
          <TableCell>{calcToalOrderPrice(row)}</TableCell>
          <TableCell>{row["fkUserId"]["roleId"]["roleName"]}</TableCell>
          <TableCell>
            <Box
              onClick={() => onDeleteOrder(row["orderId"])}
              sx={{ cursor: "pointer" }}
            >
              <DeleteForever />
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Products
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {row["products"].map((product: Product, index: number) => {
                    return (
                      <Box key={index} sx={{ marginRight: "10px" }}>
                        <ProductCard product={product} />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const calcToalOrderPrice = (_order: any) => {
    if (_order["products"]) {
      const totalPrice = _order["products"].reduce(
        (acc: number, item: Product) => acc + item.producPrice,
        0
      );
      return formatPrice(totalPrice);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-In", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <Row key={row.orderId} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
