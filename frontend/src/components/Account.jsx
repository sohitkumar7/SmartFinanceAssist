import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

function Account() {
  const params = useParams();
  const accountId = params.accountId;
  return (
    <>
      <Header />

      <div>{params.accountId}</div>
    </>
  );
}

export default Account;
