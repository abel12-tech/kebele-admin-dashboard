import React from "react";
import { Route, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Layout from "./shared/Layout";
import ManageResidents from "./components/features/manage-residents/pages/ManageResidents";
import Login from "./components/features/authentication/pages/Login";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <MainContent />
          </Layout>
        }
      />
      <Route
        path="/manage-residents"
        element={
          <Layout>
            <ManageResidents />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
