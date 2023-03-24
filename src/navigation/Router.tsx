import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import TenderPage from "../pages/tender/TenderPage";
import { TenderDetailPage } from "../pages/tender/TenderDetailPage";
import { FormTenderPage } from "../pages/createTender/FormTenderPage";
import {
  CREATE_TENDER_ROUTE,
  SEARCH_USAGE_ESTIMATES_ROUTE,
  TENDER_DETAIL_ROUTE,
  TENDERS_TABLE_ROUTE
} from "./router.const";
import MonitorPage from "../pages/monitor/MonitorPage";
import LoginPage from "../pages/login/LoginPage";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";
import AggregatesPage from "../pages/aggregates/AggregatesPage";
import AggregateDetailPage from "../pages/aggregates/AggregateDetailPage";
import AssociationPage from "../pages/paAssociation/PaAssociationPage";
import PaTransferListPage from "../pages/paTransfer/PaTransferListPage";
import * as routes from "./router.const";
import { Permission } from "../model/user-permission";
import HomePage from "../pages/home/HomePage";
import {useCurrentUser} from "../hooks/useCurrentUser";
import {SearchUsageEstimationsPage} from "../pages/usageEstimates/SearchUsageEstimationsPage";

/**
 * Create the routing of the page
 */
function Router() {
  const { currentUser } = useCurrentUser();

  return (
    <Routes>
      <Route path={routes.LOGIN_ROUTE} element={<LoginPage />} />
      <Route path={"/"} element={currentUser ? <Outlet /> : <Navigate to={routes.LOGIN_ROUTE} />} >
        <Route key={"default"} path={"/"} element={<HomePage />} />
        <Route path="*" element={<Navigate replace to={"/"} />} />
        <Route
          path={routes.SEARCH_ROUTE}
          element={
            <PrivateRoute roles={[Permission.LOG_EXTRACT_READ]}>
              <SearchPage />
            </PrivateRoute>
          }
        />
        <Route
          path={TENDERS_TABLE_ROUTE}
          element={
            <PrivateRoute roles={[Permission.TENDER_READ]}>
              <TenderPage />
            </PrivateRoute>
          }
        />
        <Route path={CREATE_TENDER_ROUTE}>
          <Route path=":tenderCode" element={
            <PrivateRoute roles={[Permission.TENDER_WRITE]}>
              <FormTenderPage />
            </PrivateRoute>}
          />
          <Route path="" element={
            <PrivateRoute roles={[Permission.TENDER_WRITE]}>
              <FormTenderPage />
            </PrivateRoute>}
          />
        </Route>
        <Route
          path={routes.MONITOR_ROUTE}
          element={
            <PrivateRoute roles={[Permission.LOG_DOWNTIME_READ]}>
              <MonitorPage />
            </PrivateRoute>
          }
        />
        {/* Pagina di Elenco Aggregati*/}
        <Route
          path={routes.AGGREGATES_LIST}
          element={
            <PrivateRoute roles={[Permission.API_KEY_READ]}>
              <AggregatesPage />
            </PrivateRoute>
          }
        />
        {/* Pagina di Modifica/Dettaglio aggregato*/}
        <Route
          path={routes.UPDATE_AGGREGATE}
          element={
            <PrivateRoute roles={[Permission.API_KEY_READ]}>
              <AggregateDetailPage />
            </PrivateRoute>
          }
        />
        {/* Pagina di Creazione Aggregato*/}
        <Route
          path={routes.CREATE_AGGREGATE}
          element={
            <PrivateRoute roles={[Permission.API_KEY_WRITE]}>
              <AggregateDetailPage />
            </PrivateRoute>
          }
        />
        {/* Pagina di Associazione PA all'aggregato*/}
        <Route
          path={routes.ADD_PA}
          element={
            <PrivateRoute roles={[Permission.API_KEY_WRITE]}>
              <AssociationPage />
            </PrivateRoute>
          }
        />
        {/* Pagina di Trasferimento PA tra aggregati*/}
        <Route
          path={routes.TRANSFER_PA}
          element={
            <PrivateRoute roles={[Permission.API_KEY_WRITE]}>
              <PaTransferListPage />
            </PrivateRoute>
          }
        />
        <Route
            path={TENDER_DETAIL_ROUTE}
            element={
                <PrivateRoute roles={[Permission.TENDER_READ]}>
                    <TenderDetailPage />
                </PrivateRoute>
            }
        />
        <Route
            path={SEARCH_USAGE_ESTIMATES_ROUTE}
            element={
                <PrivateRoute roles={[Permission.TENDER_READ]}>
                    <SearchUsageEstimationsPage/>
                </PrivateRoute>
            }
        />
      </Route>
    </Routes>
  );
}

export default Router;
