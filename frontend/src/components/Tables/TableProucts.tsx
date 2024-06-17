import React, { useEffect, useState } from "react";
import { useAdminShoppingStore } from "../../store/useAdminShoppingStore";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { Product } from "../../models/Product";
import { NavLink } from "react-router-dom";
import agent from "../../api/agent";
import { toast } from "react-toastify";

export const TableProucts = () => {
  const { data } = useAdminShoppingStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (data.products) {
      const _products = [...data.products].map((item, index) => {
        return {
          id: index,
          ...item,
        };
      });
      setProducts(_products);
    }
  }, [data.products]);

  const onDeleteProduct = async (productId: number) => {
    await agent.AdminActions.deleteProduct(productId);
    toast.success(`Product ${productId} has beed deleted`);
    setProducts((prev: any) => {
      return prev.filter((o: any) => {
        return o["productId"] !== productId;
      });
    });
  };

  function Row(props: { row: ReturnType<any> }) {
    const { row } = props;
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row["productId"]}
          </TableCell>
          <TableCell>{row["producTitle"]}</TableCell>
          <TableCell>{row["producDescription"]}</TableCell>
          <TableCell>
            <img width={50} height={50} src={row["producImage"]} />
          </TableCell>
          <TableCell>{row["producPrice"]}</TableCell>
          <TableCell>{row["productCategory"]}</TableCell>

          <TableCell>
            <Box sx={{ cursor: "pointer" }} display={"flex"} gap={"25px"}>
              <Box
                sx={{
                  ":hover": {
                    color: "red",
                  },
                }}
                onClick={() => onDeleteProduct(row.productId)}
              >
                <DeleteForever />
              </Box>
              <NavLink to={`/admin/product/${row["productId"]}`}>
                <Box sx={{ cursor: "pointer" }}>
                  <EditIcon
                    sx={{
                      ":hover": {
                        color: "red",
                      },
                    }}
                  />
                </Box>
              </NavLink>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Product, index: number) => (
                <Row key={index} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
