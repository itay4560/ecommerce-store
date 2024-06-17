import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";
import { Product } from "../models/Product";

const server_endpoint = import.meta.env.VITE_SERVER_URL;
axios.defaults.baseURL = server_endpoint;

const idle = () => new Promise((resolve) => setTimeout(resolve, 100));
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(function (config) {
  let obj = localStorage.getItem("shopping-store-storage");

  if (obj) {
    const data = JSON.parse(obj);
    const { state } = data;
    const user = state["user"];
    if (user) {
      const token = user["token"];
      config.headers.Authorization = token;
    }
  }

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await idle();
    return response;
  },
  (error: AxiosError) => {
    const status = error.code as string;
    switch (status) {
      case "ERR_NETWORK":
        toast.error(error.message);
        break;
      case "ERR_BAD_REQUEST":
        toast.error(error.message);
        router.navigate("/login");
        break;
      default:
        break;
    }
    return Promise.reject(error.message);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Products = {
  list: () => requests.get("products"),
  getProductById: (id: string) => requests.get(`/product/${id}`),
};

const UserActions = {
  onPlaceAnOrder: (products: Product[]) =>
    requests.post("orders/save", products),
  login: (_userDetails: any) => requests.post("auth/signin", _userDetails),
  register: (_userDetails: any) => {
    try {
      const data = {
        userEmail: _userDetails["email"],
        userPassword: _userDetails["password"],
      };
      requests.post("user", data).then((res: any) => {
        toast.success("User registred successfully");
        router.navigate("/login");
      });
    } catch (error: any) {
      throw new Error("");
    }
  },
  logout: () => requests.get("products"),
  getUser: (id: string) => requests.get(`user/${id}`),
};

const Orders = {
  getUserOrders: () => {
    return requests.get("/orders/user");
  },
  deleteOrder: (orderId: number) => {
    return requests.delete(`/order/${orderId}`);
  },
};

const AdminActions = {
  getUsers: () => {
    return requests.get("/users");
  },
  getOrders: () => {
    return requests.get("/orders");
  },
  updateUser: (user: any) => requests.post(`update/user`, user),
  deleteUser: (userId: number) => {
    return requests.delete(`/user/${userId}`);
  },
  deleteProduct: (productId: number) => {
    return requests.delete(`/product/${productId}`);
  },
  updateProduct: (product: Product) => requests.post(`update/product`, product),
  addProduct: (product: Product) => requests.post(`product`, product),
};

const agent = {
  Products,
  UserActions,
  Orders,
  AdminActions,
};

export default agent;
