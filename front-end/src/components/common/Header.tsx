import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Button,
  InputBase,
  Avatar,
  Tooltip,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";

import {
  AccountCircle,
  Add,
  Login,
  Menu as MenuIcon,
  Search,
  Map,
  Logout,
  Person,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "../../redux";
import { logout } from "../../redux/auth/auth.actions";
import { lightGreen } from "@mui/material/colors";
import { AuthDialog } from "../manager/AuthDialog";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, profile } = useSelector((state: RootState) => state);
  const token = localStorage.getItem("token");
  const isLoggedIn = isAuth || Boolean(token);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
    setAnchorElUser(null);
  };

  const pages = [
    { label: t("components.header.trips"), path: "/trips", icon: <Map /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {pages.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: lightGreen[700] }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {!isLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setAuthDialogOpen(true);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: lightGreen[700] }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary={t("components.header.login")} />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/profile")}>
                <ListItemIcon sx={{ color: lightGreen[700] }}>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={t("components.header.account")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/trips/create")}>
                <ListItemIcon sx={{ color: lightGreen[700] }}>
                  <Add />
                </ListItemIcon>
                <ListItemText primary={t("components.header.create")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ color: lightGreen[700] }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={t("components.header.logout")} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: lightGreen[700] }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ px: 1, gap: 1 }}>
            {/* Burger menu */}
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo */}
            <Box
              component="img"
              src="./logo.png"
              alt="logo"
              sx={{
                height: { xs: 40, md: 70 },
                flexShrink: 0,
                mr: 2,
              }}
            />

            {/* Desktop navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  onClick={() => navigate(page.path)}
                  sx={{ color: "white" }}
                  startIcon={page.icon}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            {/* Search */}
            <Box
              sx={{
                flexGrow: 1,
                mx: "auto",
                maxWidth: { xs: "100%", sm: 400 },
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search sx={{ mr: 1 }} />
              <InputBase
                placeholder={t("components.header.search")}
                sx={{ color: "inherit", width: "100%" }}
              />
            </Box>

            {/* Profile / Auth actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isLoggedIn ? (
                <>
                  <Tooltip title={t("components.header.account")}>
                    <IconButton
                      onClick={(e) => setAnchorElUser(e.currentTarget)}
                      color="inherit"
                    >
                      {profile?.avatar ? (
                        <Avatar
                          alt={profile.username}
                          src={`${
                            import.meta.env.VITE_BACK_END_URL
                          }uploads/profile-pictures/${profile.avatar}`}
                          sx={{ width: 32, height: 32 }}
                        />
                      ) : (
                        <AccountCircle />
                      )}
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={() => setAnchorElUser(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        setAnchorElUser(null);
                      }}
                    >
                      <Person sx={{ mr: 1 }} />
                      {t("components.header.account")}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} />
                      {t("components.header.logout")}
                    </MenuItem>
                  </Menu>

                  <Tooltip title={t("components.header.create")}>
                    <IconButton
                      onClick={() => navigate("/trips/create")}
                      color="inherit"
                      sx={{ display: { xs: "none", md: "inline-flex" } }}
                    >
                      <Add />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Button
                  onClick={() => setAuthDialogOpen(true)}
                  color="inherit"
                  sx={{ display: { xs: "none", md: "flex" } }}
                  startIcon={<Login />}
                >
                  {t("components.header.login")}
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(6px)",
            color: "white",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
};
