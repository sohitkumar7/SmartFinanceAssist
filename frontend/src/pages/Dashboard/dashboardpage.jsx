import React, { Suspense, useEffect, useState } from "react";
import CreateAccountDrower from "./CreateAccountDrower";
import { Card, CardContent } from "../../components/ui/card";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AccountCard from "./AccountCard";
import { fetchBudget } from "../../Store/Budget-Slice";
import toast from "react-hot-toast";
import BudgetProgrress from "../../components/BudgetProgrress";
import DashboardOverView from "./DashboardOverView.";

function Dashboardpage() {
  const { allAccount } = useSelector((state) => state.Account);
  const { budgetAmount, currentMonthExpenses, remaining } = useSelector(
    (state) => state.budget
  );
  const dispatch = useDispatch();

  // Track the current default account ID
  const [currentDefaultAccountId, setCurrentDefaultAccountId] = useState(null);

  // Find the default account
  const DefaultAccount = allAccount.find((acc) => acc.isDefault === true);

  useEffect(() => {
    // Update the tracked default account ID when it changes
    if (DefaultAccount?._id && DefaultAccount._id !== currentDefaultAccountId) {
      setCurrentDefaultAccountId(DefaultAccount._id);
      // Fetch budget for the default account
      dispatch(fetchBudget(DefaultAccount._id));
    }
  }, [DefaultAccount, currentDefaultAccountId, dispatch]);

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {DefaultAccount && <BudgetProgrress DefaultAccount={DefaultAccount} />}

      <Suspense fallback={"Loading Overview"}>
        <DashboardOverView accounts={allAccount}></DashboardOverView>
      </Suspense>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CreateAccountDrower>
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full py-8">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrower>

        {allAccount?.length > 0 ? (
          allAccount.map((account) => {
            return (
              <AccountCard key={account._id} account={account}></AccountCard>
            );
          })
        ) : (
          <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-gray-500 italic pt-5 text-center">
            No accounts found. Create one above.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboardpage;
