import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";
import TenderPage from "../pages/tender/TenderPage";
import {TenderDetailPage} from "../pages/details/detail";
import {FormTenderPage} from "../pages/createTender/FormTenderPage";
import {CREATE_TENDER_ROUTE, GET_TENDER, GET_DETAIL_TENDER} from "./router.const";

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
        path={GET_TENDER}
        element={
          <PrivateRoute condition="token">
            <TenderPage email={email}/>
          </PrivateRoute>
        }
      />

      <Route
        path={CREATE_TENDER_ROUTE}
        element={
          <PrivateRoute condition="token">
            <FormTenderPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate replace to="/search" />} />

        <Route
            path={GET_DETAIL_TENDER}
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
