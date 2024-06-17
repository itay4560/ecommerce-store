import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, List, ListItem, Tooltip } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useShoppingStore } from "../store/useShoppingStore";
import ScrollToTop from "../utils/ScrollToTop";
import { router } from "../routes/Routes";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Products", path: "/products" },
  { title: "About", path: "/about" },
];
const accountLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

const settings = [{ title: "Orders", path: "/orders" }];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "#a6ff00",
  },
  "&:active": {
    color: "text.secondary",
  },
};

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, logOut, cart } = useShoppingStore();
  const navigate = useNavigate();

  ScrollToTop();

  return (
    <div style={{ height: "70px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navLinks.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            alignItems="center"
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            <List sx={{ display: "flex", width: "300px" }}>
              {navLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title}
                </ListItem>
              ))}
            </List>
          </Box>

          <Box display="flex" alignItems="center" sx={{ marginRight: "10px" }}>
            <IconButton
              component={Link}
              to="/cart"
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {user !== null ? (
              <>
                <Box
                  sx={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => {
                    logOut();
                    router.navigate("/");
                    location.reload();
                  }}
                >
                  Logout
                </Box>
                <Box sx={{ flexGrow: 0, justifyContent: "space-around" }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user.email.toLocaleUpperCase()}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={handleCloseUserMenu}
                      >
                        <Link to={setting.path}>
                          <Typography textAlign="center">
                            {setting.title}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                    {user.isAdmin && (
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to={"/admin/orders"}>
                          <Typography textAlign="center">
                            {"Admin Panel"}
                          </Typography>
                        </Link>
                      </MenuItem>
                    )}
                  </Menu>
                </Box>
              </>
            ) : (
              <List sx={{ display: "flex" }}>
                {accountLinks.map(({ title, path }) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                  >
                    {title}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
