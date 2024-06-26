import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Layout from "./shared/Layout";
import ManageResidents from "./components/features/manage-residents/pages/ManageResidents";
import Login from "./components/features/authentication/pages/Login";
import ManageRequestForNewId from "./components/features/manage-requests/pages/ManageRequestForNewId";
import {
  selectAdminInfo,
  selectIsAuthenticated,
} from "./components/features/authentication/slice/authSlice";
import { useSelector } from "react-redux";
import ManageAdmins from "./components/features/manage-admins/pages/ManageAdmins";
import AddAdminForKebele from "./components/features/manage-admins/pages/AddAdminForKebele";
import ManageRequestsInKebele from "./components/features/manage-requests/pages/ManageRequestsInKebele";
import ManageResidentsInKebele from "./components/features/manage-residents/pages/ManageResidentsInKebele";
import Profile from "./components/features/authentication/pages/Profile";
import RequestDetails from "./components/features/manage-requests/pages/RequestDetails";
import ManageKebele from "./components/features/manage-kebele/pages/ManageKebele";
import AddKebele from "./components/features/manage-kebele/pages/AddKebele";
import ManageRenewalRequests from "./components/features/manage-requests/pages/ManageRenewalRequests";
import ForgetPassword from "./components/features/authentication/pages/ForgetPassword";
import ResetPassword from "./components/features/authentication/pages/ResetPassword";
import UpdateProfile from "./components/features/authentication/pages/UpdateProfile";
import ChangePassword from "./components/features/authentication/pages/ChangePassword";

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
        path="/manage-requests-for-new-id"
        element={
          <Layout>
            <ManageRequestForNewId />
          </Layout>
        }
      />
      <Route
        path="/manage-renewal-requests"
        element={
          <Layout>
            <ManageRenewalRequests />
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
      <Route
        path="/manage-requests-in-kebele"
        element={
          isAuthenticated && adminInfo?.role === "Kebele Admin" ? (
            <Layout>
              <ManageRequestsInKebele />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/manage-residents-in-kebele"
        element={
          isAuthenticated && adminInfo?.role === "Kebele Admin" ? (
            <Layout>
              <ManageResidentsInKebele />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/manage-kebeles"
        element={
          isAuthenticated && adminInfo?.role === "Super Admin" ? (
            <Layout>
              <ManageKebele />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/add-kebele"
        element={
          isAuthenticated && adminInfo?.role === "Super Admin" ? (
            <Layout>
              <AddKebele />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/update-profile"
        element={
          <Layout>
            <UpdateProfile />
          </Layout>
        }
      />
      <Route
        path="/forget-password"
        element={
          <Layout>
            <ForgetPassword />
          </Layout>
        }
      />
      <Route
        path="/change-password"
        element={
          <Layout>
            <ChangePassword />
          </Layout>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <Layout>
            <ResetPassword />
          </Layout>
        }
      />
      <Route
        path="/requests/:id"
        element={
          <Layout>
            <RequestDetails />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
