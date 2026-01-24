import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransaction } from "../../Store/Transaction-Slice";
import toast from "react-hot-toast";
import Transactiontable from "./Transactiontable";
import { BarLoader } from "react-spinners";
import AccountChart from "./AccountChart";

function AccountPage({ account }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (account?._id) {
      const accountId = account._id;
      dispatch(fetchAllTransaction({ accountId })).then((data) => {
        if (!data.payload?.success) {
          toast.error("Error in Fetching All Transaction");
        }
      });
    }
  }, [account?._id]);

  const { allTransaction, TotalTransaction, updatedBalance } = useSelector(
    (state) => state.Transaction
  );

  return (
    <>
      <div className="w-full overflow-x-hidden px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight capitalize bg-clip-text text-transparent bg-gradient-to-r from-[#6f00ff] to-[#A16EE7] truncate">
            {account.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {account.AccountType} Account
          </p>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-lg sm:text-2xl font-bold truncate">
            ₹{parseFloat(updatedBalance).toFixed(2)}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {TotalTransaction} Transactions
          </p>
        </div>
      </div>

      <div className="w-full overflow-x-hidden px-2 sm:px-4">
        <Suspense
          fallback={
            <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
          }
        >
          <AccountChart accountId={account._id} Transactions={allTransaction} />
        </Suspense>
      </div>

      <div className="w-full overflow-x-hidden px-2 sm:px-4 py-4">
        <Suspense
          fallback={
            <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
          }
        >
          <Transactiontable
            accountId={account._id}
            Transactions={allTransaction}
          />
        </Suspense>
      </div>
    </>
  );
}

export default AccountPage;
