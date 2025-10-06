import React from "react";
import CreateAccountDrower from "./CreateAccountDrower";
import { Card, CardContent } from "../../components/ui/card";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import AccountCard from "./AccountCard";

function Dashboardpage() {
  const { allAccount } = useSelector((state) => state.Account);
  // console.log(allAccount)
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

        {allAccount?.length > 0
          ? allAccount.map((account) => {
              return (
                <AccountCard key={account._id} account={account}></AccountCard>
              );
            })
          :  (
              <p className="col-span-3 text-gray-500 italic pt-5">
                No accounts found. Create one above.
              </p>
            )}
      </div>
    </div>
  );
}

export default Dashboardpage;
