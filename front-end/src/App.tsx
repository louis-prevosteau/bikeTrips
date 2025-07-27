import React from "react";
import { Container } from "@mui/material";
import "./App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateTrip, Home, NotFound, Profile, Trip, Trips, User } from "./pages";
import { ProtectedRoutes } from "./utils/protectedRoutes";

const App = () => {
  return (
    <div>
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
    </div>
  );
};

export default App;
