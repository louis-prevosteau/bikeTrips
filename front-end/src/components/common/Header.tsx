import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "../../redux";
import { logout } from "../../redux/auth/auth.actions";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Container,
  Button,
  InputBase,
  Avatar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Add,
  Login,
  Menu as MenuIcon,
  Search,
} from "@mui/icons-material";
import { lightGreen } from "@mui/material/colors";

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, profile } = useSelector((state: RootState) => state);

  const pages = [{ label: t("components.header.trips"), path: "/trips" }];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: lightGreen[700] }}>
      <Toolbar />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "nowrap",
              overflowX: "auto",
              gap: 1,
              p: 1,
            }}
          >
            {/* Menu burger (mobile) */}
            <Box sx={{ display: { xs: "flex", md: "none" }, flexShrink: 0 }}>
              <IconButton onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="navbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(item.path);
                    }}
                  >
                    <Typography>{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo */}
            <Box
              component="img"
              src="./logo.png"
              alt="logo"
              sx={{
                height: { xs: 50, md: 90 },
                flexShrink: 0,
              }}
            />

            {/* Menu desktop */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => navigate(page.path)}
                  sx={{ color: "white" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            {/* Barre de recherche (toujours visible) */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                flexGrow: { xs: 1, md: 1 },
                maxWidth: 400,
                mx: { xs: 1, md: 0 },
              }}
            >
              <Search sx={{ mr: 1 }} />
              <InputBase
                placeholder={t("components.header.search")}
                sx={{ color: "inherit", width: "100%" }}
              />
            </Box>

            {/* Connexion / Profil */}
            <Box sx={{ flexShrink: 0 }}>
              {isAuth && profile ? (
                <>
                  <Tooltip title={t("components.header.account")}>
                    <IconButton onClick={handleOpenUserMenu} color="inherit">
                      {profile.avatar ? (
                        <Avatar
                          alt={profile.username}
                          src={`${
                            import.meta.env.VITE_BACK_END_URL
                          }uploads/profile-pictures/${profile.avatar}`}
                        />
                      ) : (
                        <AccountCircle />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => navigate("/profile")}>
                      {t("components.header.account")}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      {t("components.header.logout")}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  {/* Icône pour mobile */}
                  <IconButton
                    onClick={() => navigate("/login")}
                    color="inherit"
                    sx={{ display: { xs: "flex", md: "none" } }}
                  >
                    <Login />
                  </IconButton>
                  {/* Texte pour desktop */}
                  <Button
                    onClick={() => navigate("/login")}
                    color="inherit"
                    sx={{ display: { xs: "none", md: "flex" } }}
                  >
                    {t("components.header.login")}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
