import React, { Suspense, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchAllTransaction } from "../../Store/Transaction-Slice";
import toast from "react-hot-toast";
import Transactiontable from "./Transactiontable";
import { BarLoader } from "react-spinners";
import AccountChart from "./AccountChart";

function AccountPage({ account }) {
  // console.log(account._id);

  const dispatch = useDispatch();

  useEffect(()=>{
    const accountId = account._id;
    dispatch(fetchAllTransaction({accountId})).then((data)=>{
      if(!data.payload?.success){
        toast.error("Error in Fetching All Transaction")
      }
      else{
        // console.log("allTransaction Fetched Successfully");
      }
    })
  },[])

  const {allTransaction,TotalTransaction,updatedBalance} = useSelector((state)=>state.Transaction)
  // console.log(allTransaction);

  return (
    <>
    <div className="  m-5 space-y-8 px-5 flex gap-4 items-end justify-between">
      <div>
        <h1 className=" text-5xl sm:text-6xl font-bold tracking-tight capitalize bg-clip-text text-transparent bg-gradient-to-r from-[#6f00ff] to-[#A16EE7]">
          {account.name}
        </h1>
        <p className="text-0.5xl text-muted-foreground">
          {account.AccountType} Account
        </p>
      </div>

      <div className="text-right pb-2">
        <div className="text-xl sm:text-2xl font-bold"> ₹{parseFloat(updatedBalance).toFixed(2)}</div>
        <p className="text-sm text-mited-foreground" >{TotalTransaction} Transactions</p>
      </div>
        
      </div>

      {/* Chart Section */}

       <Suspense fallback={<BarLoader className="mt-4" width ={"100%"} color="#9333ea"/>}>
        <AccountChart accountId = {account._id} Transactions = {allTransaction}/>
      </Suspense>

      
      
      {/* Transaction Table */}
      <div className="m-5 space-y-8 px-5">
      <Suspense fallback={<BarLoader className="mt-4" width ={"100%"} color="#9333ea"/>}>
        <Transactiontable accountId = {account._id} Transactions = {allTransaction}/>
      </Suspense>
    </div>
    </>
  );
}

export default AccountPage;
