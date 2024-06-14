import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Layout from "./shared/Layout";
import ManageResidents from "./components/features/manage-residents/pages/ManageResidents";
import Login from "./components/features/authentication/pages/Login";
import ManageRequests from "./components/features/manage-requests/pages/ManageRequests";
import {
  selectAdminInfo,
  selectIsAuthenticated,
} from "./components/features/authentication/slice/authSlice";
import { useSelector } from "react-redux";
import ManageAdmins from "./components/features/manage-admins/pages/ManageAdmins";
import AddAdminForKebele from "./components/features/manage-admins/pages/AddAdminForKebele";

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const adminInfo = useSelector(selectAdminInfo);
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
      <Route
        path="/manage-requests"
        element={
          <Layout>
            <ManageRequests />
          </Layout>
        }
      />
      <Route
        path="/manage-admins"
        element={
          isAuthenticated && adminInfo?.role === "Super Admin" ? (
            <Layout>
              <ManageAdmins />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/add-admins"
        element={
          isAuthenticated && adminInfo?.role === "Super Admin" ? (
            <Layout>
              <AddAdminForKebele />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
