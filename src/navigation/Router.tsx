import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MonitorPage from "../pages/monitor/MonitorPage";
import LoginPage from "../pages/login/LoginPage";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";
import TenderPage from "../pages/tender/TenderPage";

/**
 * Create the routing of the page
 */
function Router() {
  const [email, setEmail] = useState("");

  return (
    <Routes>
      <Route
        key={"default"}
        path={"/"}
        element={<LoginPage setEmail={setEmail} />}
      />

      <Route
        path="/search"
        element={
          <PrivateRoute condition="token">
            <SearchPage email={email} />
          </PrivateRoute>
        }
      />
      <Route
        path="/tender"
        element={
          <PrivateRoute condition="token">
            <TenderPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate replace to="/search" />} />
    </Routes>
  );
}

export default Router;
