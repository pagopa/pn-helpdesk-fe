import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";
import TenderPage from "../pages/tender/TenderPage";
import {TenderDetailPage} from "../pages/details/detail";
import {FormTenderPage} from "../pages/createTender/FormTenderPage";
import {CREATE_TENDER_ROUTE, TENDERS_TABLE_ROUTE, TENDER_DETAIL_ROUTE} from "./router.const";
import MonitorPage from "../pages/monitor/MonitorPage";
import AggregatesPage from '../pages/aggregates/AggregatesPage';
import AggregateDetailPage from '../pages/aggregates/AggregateDetailPage';
import AssociationPage from '../pages/paAssociation/PaAssociationPage';
import PaTransferListPage from '../pages/paTransfer/PaTransferListPage';
import * as routes from './routes';
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
        path={TENDERS_TABLE_ROUTE}
        element={
          <PrivateRoute condition="token">
            <TenderPage email={email}/>
          </PrivateRoute>
        }
      />
      <Route path={CREATE_TENDER_ROUTE}>
        <Route path=":tenderCode" element={
          <PrivateRoute condition="token">
            <FormTenderPage />
          </PrivateRoute>}
        />

        <Route path="" element={
          <PrivateRoute condition="token">
            <FormTenderPage />
          </PrivateRoute>}
        />
      </Route>

      <Route
        path={CREATE_TENDER_ROUTE}
        element={
          <PrivateRoute condition="token">
            <FormTenderPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/monitoring"
        element={
          <PrivateRoute condition="token">
            <MonitorPage email={email} />
          </PrivateRoute>
        }
      />
      <Route path={routes.AGGREGATES} element={<PrivateRoute condition="token"><AggregatesPage email={email}/></PrivateRoute>}/>
      <Route path={routes.UPDATE_AGGREGATE} element={<PrivateRoute condition="token"><AggregateDetailPage email={email}/></PrivateRoute>}/>
      <Route path={routes.AGGREGATE} element={<PrivateRoute condition="token"><AggregateDetailPage email={email}/></PrivateRoute>}/>
      <Route path={routes.ADD_PA} element={<PrivateRoute condition="token"><AssociationPage email={email}/></PrivateRoute>}/>
      <Route path={routes.TRANSFER_PA} element={<PrivateRoute condition="token"><PaTransferListPage email={email}/></PrivateRoute>}/>
      <Route path="*" element={<Navigate replace to="/search" />} />

        <Route
            path={TENDER_DETAIL_ROUTE}
            element={
                <PrivateRoute condition="token">
                    <TenderDetailPage />
                </PrivateRoute>
            }
        />


    </Routes>
  );
}

export default Router;
