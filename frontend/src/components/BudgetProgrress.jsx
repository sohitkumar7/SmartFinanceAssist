import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, Pencil, X } from "lucide-react";
import { createBudget, fetchBudget, resetBudget } from "../Store/Budget-Slice/index.js";
import toast from "react-hot-toast";
import {Progress} from "../components/ui/progress.jsx"

function BudgetProgrress({DefaultAccount}) {

  const { budgetAmount, currentMonthExpenses, remaining } = useSelector(
    (state) => state.budget
  );

  const dispatch = useDispatch();

  // Fetch budget on mount and when account changes
  useEffect(() => {
    if (DefaultAccount?._id) {
      // Reset budget state before fetching for new account
      dispatch(resetBudget());
      dispatch(fetchBudget(DefaultAccount._id));
    }
  }, [DefaultAccount, dispatch]);

  // Sync newBudget with budgetAmount when it changes (e.g., when switching accounts)
  useEffect(() => {
    if (budgetAmount !== null) {
      setNewBudget(budgetAmount);
    }
  }, [budgetAmount]);

  // Reset editing state when switching accounts
  useEffect(() => {
    setIsEditing(false);
  }, [DefaultAccount?._id]);

  // console.log(backendUser);

  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budgetAmount);

  // console.log(budgetAmount);

  const percentUsed = budgetAmount > 0 ? (currentMonthExpenses / budgetAmount) * 100 : 0;



  const handleUpdateBudget = async () => {

    if(newBudget <= 0){
        toast.error("Please Enter a Valid Budget")
         setIsEditing(false);
         setNewBudget(null)
        return;
    }
    
    console.log("handlebudget updated is runnning")
    const formData = {
        AccountId : DefaultAccount._id,
        amount: newBudget,
    }

    console.log(formData,"formData")


    await dispatch(createBudget(formData)).then((data) => {
        if(data?.payload?.success){
            toast.success("Budget Updated Successfully")
            // Fetch the updated budget data
            dispatch(fetchBudget(DefaultAccount._id))
        }
    })

     setIsEditing(false);
    
    
  };

  const handleCancel = () => {
    setNewBudget(budgetAmount);
    setIsEditing(false);
  };

  return (
    <Card >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">
            Monthly Budget (Default Account)
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Enter amount"
                  autoFocus
                //   disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                //   disabled={isLoading}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                //   disabled={isLoading}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {budgetAmount !== null && budgetAmount > 0
                    ? `${currentMonthExpenses?.toFixed(2) || "0.00"} of ${budgetAmount.toFixed(2)} `
                    : "No Budget Set"}

                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {budgetAmount !== null && budgetAmount > 0 ? (
          <div className="space-y-2">
            <Progress
              value={percentUsed}
              className="h-2 w-full bg-gray-200 rounded-full overflow-hidden"
              indicatorClassName={
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }
            />
            <p className="text-xs text-muted-foreground text-right">
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default BudgetProgrress;
