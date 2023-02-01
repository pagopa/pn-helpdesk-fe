import { Routes, Route, Navigate } from "react-router-dom";
import MonitorPage from "../pages/monitor/MonitorPage";
import LoginPage from "../pages/login/LoginPage";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";

/**
 * Create the routing of the page
 */
function Router() {
  return (
    <Routes>
      <Route key={"default"} path={"/"} element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to="/search" />} />
      <Route
        path="/search"
        element={
          <PrivateRoute condition="token">
            <SearchPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/monitoring"
        element={
          <PrivateRoute condition="token">
            <MonitorPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Router;
