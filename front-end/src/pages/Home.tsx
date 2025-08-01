import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux";
import { Button, Box, Typography, Container } from "@mui/material";
import { Add, Login, Map } from "@mui/icons-material";
import { lightGreen } from "@mui/material/colors";
import Background from "../assets/backgrounds/cycling-sunset.png";
import { useTranslation } from "react-i18next";
import { AuthDialog } from "../components";

export const Home = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state);
  const token = localStorage.getItem("token");
  const isLoggedIn = isAuth || Boolean(token);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Background with sunset cycling"
    >
      {/* Overlay sombre */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "black",
          opacity: 0.5,
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Contenu principal */}
      <Container
        maxWidth="sm"
        sx={{
          zIndex: 2,
          textAlign: "center",
          color: "white",
          px: 3,
          py: 6,
        }}
      >
        <Typography variant="h3" gutterBottom>
          {t("pages.home.welcome")}
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          {t("pages.home.subtitle")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: lightGreen[700],
              color: "white",
              "&:hover": { backgroundColor: lightGreen[800] },
            }}
            startIcon={<Map />}
            onClick={() => navigate("/trips")}
          >
            {t("pages.home.see")}
          </Button>

          {isLoggedIn ? (
            <Button
              variant="outlined"
              sx={{
                color: lightGreen[300],
                borderColor: lightGreen[300],
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              startIcon={<Add />}
              onClick={() => navigate("/create-trip")}
            >
              {t("pages.home.create")}
            </Button>
          ) : (
            <Button
              variant="text"
              sx={{
                color: lightGreen[300],
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              startIcon={<Login />}
              onClick={() => setAuthDialogOpen(true)}
            >
              {t("pages.home.login")}
            </Button>
          )}
        </Box>
      </Container>

      <AuthDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
      />
    </Box>
  );
};
