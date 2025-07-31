import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Container,
  Paper,
  Box,
  Tab,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux";
import { useTranslation } from "react-i18next";
import { login, register } from "../../redux/auth/auth.actions";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

interface Register extends Record<string, string> {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface Login extends Record<string, string> {
  email: string;
  password: string;
}

export const AuthDialog = ({ open, onClose }: AuthDialogProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [tab, setTab] = useState("register");

  const [loginForm, setLoginForm] = useState<Login>({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState<Register>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleInputChange = <T extends Record<string, string>>(
    formSetter: React.Dispatch<React.SetStateAction<T>>,
    field: keyof T,
    value: string
  ) => {
    formSetter((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    dispatch(login(loginForm));
  };

  const handleRegister = () => {
    dispatch(register(registerForm));
  };

  const AuthTextField = ({
    label,
    type = "text",
    value,
    onChange,
  }: {
    label: string;
    type?: string;
    value: string;
    onChange: (val: string) => void;
  }) => (
    <TextField
      variant="filled"
      type={type}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
    />
  );

  const renderFields = <T extends Record<string, string>>(
    fields: { name: keyof T; label: string; type?: string }[],
    formData: T,
    formSetter: React.Dispatch<React.SetStateAction<T>>
  ) => (
    <>
      {fields.map(({ name, label, type }) => (
        <AuthTextField
          key={name as string}
          label={label}
          type={type}
          value={formData[name]}
          onChange={(val) => handleInputChange(formSetter, name, val)}
        />
      ))}
    </>
  );

  const registerFields = [
    { name: "firstName", label: t("forms.auth.fields.firstName") },
    { name: "lastName", label: t("forms.auth.fields.lastName") },
    { name: "username", label: t("forms.auth.fields.username") },
    {
      name: "email",
      label: t("forms.auth.fields.email"),
      type: "email",
    },
    {
      name: "password",
      label: t("forms.auth.fields.password"),
      type: "password",
    },
  ];

  const loginFields = [
    {
      name: "email",
      label: t("forms.auth.fields.email"),
      type: "email",
    },
    {
      name: "password",
      label: t("forms.auth.fields.password"),
      type: "password",
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" color="white">
          {t("components.auth.title")}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          <Paper
            sx={{
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "white",
            }}
          >
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  textColor="inherit"
                  indicatorColor="secondary"
                >
                  <Tab
                    label={t("components.auth.register")}
                    value="register"
                    sx={{ color: "white" }}
                  />
                  <Tab
                    label={t("components.auth.login")}
                    value="login"
                    sx={{ color: "white" }}
                  />
                </TabList>
              </Box>

              <TabPanel value="register">
                {renderFields(registerFields, registerForm, setRegisterForm)}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleRegister}
                  sx={{
                    backgroundColor: "#8BC34A",
                    color: "black",
                    mt: 2,
                    "&:hover": { backgroundColor: "#7CB342" },
                  }}
                >
                  {t("components.auth.register")}
                </Button>
              </TabPanel>

              <TabPanel value="login">
                {renderFields(loginFields, loginForm, setLoginForm)}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "#8BC34A",
                    color: "black",
                    mt: 2,
                    "&:hover": { backgroundColor: "#7CB342" },
                  }}
                >
                  {t("components.auth.login")}
                </Button>
              </TabPanel>
            </TabContext>
          </Paper>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
