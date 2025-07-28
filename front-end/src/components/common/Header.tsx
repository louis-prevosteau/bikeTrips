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
import { AccountCircle, Menu as MenuIcon, Search } from "@mui/icons-material";
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
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // colonne sur mobile
              alignItems: "center",
              justifyContent: { xs: "center", sm: "space-between" },
              width: "100%",
              gap: { xs: 1.5, sm: 2 },
              p: 1,
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src="./logo.png"
              alt="logo"
              sx={{
                height: 150,
              }}
            />

            {/* Menu */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Mobile burger menu */}
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton onClick={handleOpenNavMenu} color="inherit">
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Desktop */}
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

            {/* Barre de recherche */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                width: { xs: "100%", sm: "auto" },
                maxWidth: 400,
              }}
            >
              <Search sx={{ mr: 1 }} />
              <InputBase
                placeholder="Rechercher…"
                sx={{ color: "inherit", width: "100%" }}
              />
            </Box>

            {/* Profil */}
            <Box>
              {isAuth && profile ? (
                <>
                  <Tooltip title="Mon compte">
                    <IconButton onClick={handleOpenUserMenu}>
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
                      Profil
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button onClick={() => navigate("/login")} color="inherit">
                  Connexion
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
