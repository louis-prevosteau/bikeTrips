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
  Typography,
  Box,
  Menu,
  MenuItem,
  Container,
  Button,
  InputBase,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { lightGreen } from "@mui/material/colors";

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, profile } = useSelector((state: RootState) => state);

  const pages = [{ label: "Accueil", path: "/" }];

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
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "nowrap",
            overflowX: "auto", // évite que ça déborde
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", fontWeight: 700 }}
          >
            MonLogo
          </Typography>

          {/* Menu (desktop & mobile adapté) */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Mobile burger menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => {
                      navigate(page.path);
                      handleCloseNavMenu();
                    }}
                  >
                    {page.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop links */}
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
          </Box>

          {/* Search bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 1,
              px: 1.5,
              py: 0.5,
              flexGrow: 1,
              maxWidth: 400,
            }}
          >
            <SearchIcon sx={{ mr: 1 }} />
            <InputBase
              placeholder={"Rechercher…"}
              sx={{ color: "inherit", width: "100%" }}
            />
          </Box>

          {/* Profil (connexion/avatar) */}
          <Box>
            {isAuth && profile ? (
              <>
                <Tooltip title="Mon compte">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt={profile.username} src={profile.avatarUrl} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate("/profile")}>
                    {"Profil"}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>{"Déconnexion"}</MenuItem>
                </Menu>
              </>
            ) : (
              <Button onClick={() => navigate("/login")} color="inherit">
                {"Connexion"}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
