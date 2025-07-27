import React, { useEffect, useRef } from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CreateTrip,
  Home,
  NotFound,
  Profile,
  Trip,
  Trips,
  User,
} from "./pages";
import { ProtectedRoutes } from "./utils/protectedRoutes";
import { Header } from "./components";
import type { AppDispatch } from "./redux";
import { useDispatch } from "react-redux";
import { getProfile } from "./redux/users/users.actions";

const App = () => {
  const isInitialRender = useRef(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (localStorage.getItem("token")) {
      dispatch(getProfile());
    }
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:id" element={<Trip />} />
            <Route path="/trips/create" element={<CreateTrip />} />
            <Route path="/users/:id" element={<User />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
