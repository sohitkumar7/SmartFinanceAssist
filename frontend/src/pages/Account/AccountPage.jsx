import React, { useEffect } from "react";
import {useDispatch} from "react-redux"
import { fetchAllTransaction } from "../../Store/Transaction-Slice";
import toast from "react-hot-toast";
function AccountPage({ account }) {
  console.log(account._id);

  const dispatch = useDispatch();

  useEffect(()=>{
    const accountId = account._id;
    dispatch(fetchAllTransaction({accountId})).then((data)=>{
      if(!data.payload?.success){
        toast.error("Error in Fetching All Transaction")
      }
      else{
        console.log("allTransaction Fetched Successfully");
      }
    })
  },[])

  return (
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
        <div className="text-xl sm:text-2xl font-bold"> ₹{parseFloat(account.balance).toFixed(2)}</div>
        <p className="text-sm text-mited-foreground" >Transactions</p>
      </div>

      {/* Chart Section */}

      {/* Transaction Table */}
    </div>
  );
}

export default AccountPage;
