import React, { useEffect } from "react";
import CreateAccountDrower from "./CreateAccountDrower";
import { Card, CardContent } from "../../components/ui/card";
import { Plus } from "lucide-react";
import {useSelector,useDispatch} from "react-redux"
import AccountCard from "./AccountCard";
import { fetchallAccount } from "../../Store/Account-Slice";
function Dashboardpage() {
   const dispatch  = useDispatch();
   const {allAccount} = useSelector((state)=>state.Account)

   console.log(allAccount)

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

        {allAccount?.length > 0 && 
        allAccount?.map((account) => {
          return <AccountCard key={account._id} account={account}></AccountCard>;
        })}
        
      </div>
    </div>
  );
}

export default Dashboardpage;
