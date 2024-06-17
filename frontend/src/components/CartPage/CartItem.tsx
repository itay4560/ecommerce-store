import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../models/Product";
import { useShoppingStore } from "../../store/useShoppingStore";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  roots11: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem 2rem",
    width: "fit-content",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "auto",

    [theme.breakpoints.down(899)]: {
      padding: "3rem 3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },
    [theme.breakpoints.down(499)]: {
      padding: "2rem",
      margin: "1rem",
      width: "65%",
    },
  },
  root11: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 1rem",
    width: "fit-content",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "auto",

    [theme.breakpoints.down(899)]: {
      padding: "3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },

    [theme.breakpoints.down(499)]: {
      padding: "2rem",
      margin: "1rem",
      width: "65%",
    },
  },
  media: {
    width: "200px",
    height: "240px",
    marginRight: "16px",

    [theme.breakpoints.down(699)]: {
      with: "35%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down(599)]: {
      with: "30%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down(499)]: {
      with: "20%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "fit-content",

    [theme.breakpoints.down(699)]: {
      padding: "0",
      width: "fit-content",
    },
    [theme.breakpoints.down(599)]: {
      padding: "0",
      width: "fit-content",
    },
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  title: {
    width: "90%",
    fontSize: "1rem",
    fontWeight: 600,
    marginLeft: "1rem",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
      marginLeft: "0",
    },
    "& .MuiTypography-subtitle1 ": {
      [theme.breakpoints.down(599)]: {
        fontSize: "14px",
      },
    },
  },

  cartDeleteIcon: {
    color: "black",
    marginTop: "-.5rem",

    [theme.breakpoints.down(599)]: {
      marginRight: "-2.5rem",
    },
    "&:hover": {
      color: "#ed1c24",
    },
    [theme.breakpoints.down(499)]: {
      marginRight: "-2rem",
    },
  },

  priceItem: {
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
    marginLeft: "1.2rem",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
  },

  cartSubHeadings: {
    fontSize: "16px",
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#414141",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "12px",
    },
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: 400,
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "13px",
    },
  },
  itemOldPrice: {
    marginLeft: "-8px",
    fontSize: "14px",
    fontWeight: 400,

    [theme.breakpoints.down(499)]: {
      fontSize: "12px",
    },
  },

  contentBottom: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1rem",
    alignItems: "baseline",
    width: "fit-content",
    flexDirection: "column",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
    [theme.breakpoints.down(550)]: {
      position: "relative",
      marginLeft: "0rem",
    },
  },
}));

const CartItem = ({ item, length }: { item: Product; length: number }) => {
  const classes = useStyles();
  const { removeFromCart } = useShoppingStore();

  return (
    <>
      <Card
        style={{ maxWidth: "550px" }}
        className={length < 2 ? classes.root11 : classes.roots11}
      >
        <CardMedia
          className={classes.media}
          image={item.producImage}
          title={item.producTitle}
        />
        <CardContent className={classes.content}>
          <div>
            <div className={classes.cartHeader}>
              <Typography variant="subtitle1" className={classes.title}>
                {item.producTitle}
              </Typography>

              <IconButton
                aria-label="delete"
                className={classes.cartDeleteIcon}
                onClick={() => {
                  removeFromCart(item);
                  toast.success("Product removed successfully");
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>

            <div className={classes.priceItem}>
              <Typography className={classes.cartSubHeadings} variant="body2">
                Price:
              </Typography>
              <Typography variant="subtitle1" className={classes.itemPrice}>
                {/* {finalPrice} */}
              </Typography>
            </div>
          </div>
          <div className={classes.contentBottom}>
            <div className={classes.priceItem}>
              <Typography variant="body2" className={classes.cartSubHeadings}>
                TOTAL:
              </Typography>
              <Typography variant="subtitle1" className={classes.priceItem}>
                {item.producPrice}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CartItem;
