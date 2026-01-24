import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import AccountPage from "../pages/Account/AccountPage";

function Account() {
  const params = useParams();
  const location = useLocation();

  const account = location.state?.account;

  // console.log(account);

  return (
    <>
      <Header />
      <AccountPage key={account._id} account = {account} ></AccountPage>
      {/* <div>{params.accountId}</div> */}
    </>
  );
}

export default Account;
