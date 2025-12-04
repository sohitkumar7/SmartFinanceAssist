import React, { useEffect } from "react";
import CreateAccountDrower from "./CreateAccountDrower";
import { Card, CardContent } from "../../components/ui/card";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AccountCard from "./AccountCard";
import { fetchBudget } from "../../Store/Budget-Slice";
import toast from "react-hot-toast";

function Dashboardpage() {
  const { allAccount } = useSelector((state) => state.Account);
  const { budgetAmount } = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  // console.log(allAccount)

  const DefaultAccount = allAccount.find((acc) => acc.isDefault === true);

  console.log("DefaultAccount",DefaultAccount);

  let budgetData = null;
  useEffect(() => {
  if (DefaultAccount) {
    dispatch(fetchBudget(DefaultAccount.userId));
  }
}, [DefaultAccount, dispatch]);


  console.log("budgetAmount",budgetAmount)

  return (
    <div className="px-5">
      {/* budget progress */}

      {/* overview */}

      {/* Account grid */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrower>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2"></Plus>
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
          <p className="col-span-3 text-gray-500 italic pt-5">
            No accounts found. Create one above.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboardpage;
