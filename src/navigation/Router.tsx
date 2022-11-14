import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MonitorPage from "../pages/monitor/MonitorPage";
import LoginPage from '../pages/login/LoginPage';
import SearchPage from '../pages/search/SearchPage';
import PrivateRoute from "./PrivateRoute"
import AggregatesPage from '../pages/aggregates/AggregatesPage';
import AggregationDetailPage from '../pages/aggregates/AggregationDetailPage';
import AssociationPage from '../pages/aggregates/AssociationPage';
import PaTransferListPage from '../pages/paTransfer/PaTransferListPage';

/**
 * Create the routing of the page 
 */
function Router() {
  const [email, setEmail] = useState("test@test.com");

  return (
    <Routes>
        <Route key={"default"} path={"/"} element={<LoginPage setEmail={setEmail}/>} />
        <Route path="*" element={<Navigate replace to="/search" />} />
        <Route path="/search" element={<PrivateRoute condition="token"><SearchPage email={email}/></PrivateRoute>}/>
        <Route path="/monitoring" element={<PrivateRoute condition="token"><MonitorPage email={email}/></PrivateRoute>}/>
        <Route path="/aggregates" element={<PrivateRoute condition="token"><AggregatesPage email={email}/></PrivateRoute>}/>
        <Route path="/aggregation/:aggregateId" element={<PrivateRoute condition="token"><AggregationDetailPage email={email}/></PrivateRoute>}/>
        <Route path="/aggregation" element={<PrivateRoute condition="token"><AggregationDetailPage email={email}/></PrivateRoute>}/>
        <Route path="/aggregation/add-pa" element={<PrivateRoute condition="token"><AssociationPage email={email}/></PrivateRoute>}/>
        <Route path="/aggregation/pa-transfer" element={<PrivateRoute condition="token"><PaTransferListPage email={email}/></PrivateRoute>}/>
    </Routes>
  );
}

export default Router;