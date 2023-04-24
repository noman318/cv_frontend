import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import { doLogout, getUser, isLoggedInPortal } from "../services/MyService";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "Resume", "Logout"];
const loginReg = ["Login", "Register"];

function Navbar() {
  const getUserInfo = getUser();
  // console.log("getUserInfo", getUserInfo)
  console.log("isLoggedInPortal", isLoggedInPortal());
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [userloggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = isLoggedInPortal();
    setUserLoggedIn(isLoggedIn);
  }, []);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (auth) => {
    setAnchorElNav(null);
    if (auth === "Login") {
      navigate("/login");
    } else if (auth === "Register") {
      navigate("/register");
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      doLogout();
      navigate("/login");
    }
  };

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          aria-label="navbar_tools"
          sx={styles.toolbarStyles}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={styles.myLogo}
          >
            myCV
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={styles.myLogoResponsive}
          >
            myCV
          </Typography>
          <Box sx={styles.boxStyles}>
            <Tooltip>
              {getUserInfo ? (
                <IconButton onClick={handleOpenUserMenu} sx={styles.iconButton}>
                  <>
                    {userloggedIn ? (
                      <Avatar alt="User Avatar" src={`none`} />
                    ) : (
                      <Avatar
                        alt="Default Avatar"
                        src={"/static/images/avatar/2.jpg"}
                      />
                    )}
                  </>
                </IconButton>
              ) : (
                <Box aria-label="auth_ButtonGroup" sx={styles.boxResponsive}>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}
                  >
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <LockOpenIcon />
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
                        display: { xs: "block", md: "block" },
                      }}
                    >
                      {loginReg.map((auth) => (
                        <MenuItem
                          key={auth}
                          onClick={() => handleCloseNavMenu(auth)}
                        >
                          <Typography textAlign="center">{auth}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Box>
              )}
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
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

const styles = {
  myLogo: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  myLogoResponsive: {
    mr: 2,
    display: { xs: "flex", md: "none" },
    flexGrow: 1,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  toolbarStyles: { display: "flex", justifyContent: "space-between" },
  boxStyles: { flexGrow: 0 },
  iconButton: { p: 0 },
  boxResponsive: { display: { xs: "flex", md: "block" } },
};
