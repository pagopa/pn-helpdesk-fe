import { Routes, Route, Navigate } from "react-router-dom";
import MonitorPage from "../pages/monitor/MonitorPage";
import LoginPage from "../pages/login/LoginPage";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";
import AggregatesPage from "../pages/aggregates/AggregatesPage";
import AggregateDetailPage from "../pages/aggregates/AggregateDetailPage";
import AssociationPage from "../pages/paAssociation/PaAssociationPage";
import PaTransferListPage from "../pages/paTransfer/PaTransferListPage";
import * as routes from "./routes";
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
      <Route
        path={routes.AGGREGATES}
        element={
          <PrivateRoute condition="token">
            <AggregatesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.UPDATE_AGGREGATE}
        element={
          <PrivateRoute condition="token">
            <AggregateDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.AGGREGATE}
        element={
          <PrivateRoute condition="token">
            <AggregateDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.ADD_PA}
        element={
          <PrivateRoute condition="token">
            <AssociationPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.TRANSFER_PA}
        element={
          <PrivateRoute condition="token">
            <PaTransferListPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Router;
