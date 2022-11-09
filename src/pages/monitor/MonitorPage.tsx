import React from "react";
import MainLayout from "../mainLayout/MainLayout";

/**
 * Monitor page
 * @component
 */
const MonitorPage = ({ email }: any) => {
  return (
    <MainLayout email={email}>
      <h1>Monitor page</h1>
    </MainLayout>
  );
};
export default MonitorPage;
