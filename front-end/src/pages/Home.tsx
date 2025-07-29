import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux";
import { Button, Box, Typography, Container } from "@mui/material";
import { Add, Login, Map } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import Background from "../assets/backgrounds/cycling-sunset.png";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: -1,
      }}
    >
      {/* Overlay sombre */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          zIndex: 1,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" gutterBottom>
          {t('pages.home.welcome')}
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          {t('pages.home.subtitle')}
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
            sx={{ backgroundColor: green[300] }}
            startIcon={<Map />}
            onClick={() => navigate("/trips")}
          >
            {t('pages.home.see')}
          </Button>

          {isAuth ? (
            <Button
              variant="outlined"
              sx={{
                color: green[300],
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                },
              }}
              startIcon={<Add />}
              onClick={() => navigate("/create-trip")}
            >
              {t('pages.home.create')}
            </Button>
          ) : (
            <Button
              variant="text"
              sx={{
                color: green[300],
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                },
              }}
              startIcon={<Login />}
              onClick={() => navigate("/login")}
            >
              {t('pages.home.login')}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};
