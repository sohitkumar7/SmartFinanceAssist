import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Switch } from "../../components/ui/switch.jsx";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { ArrowDownLeft, ArrowUpRight, Trash2, Plus, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  fetchallAccount,
  makeoneDefault,
  deleteAccount,
} from "../../Store/Account-Slice/index.js";
import { fetchBudget } from "../../Store/Budget-Slice/index.js";

function AccountCard({ account }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { backendUser } = useSelector((state) => state.auth);

  const { name, AccountType, balance, _id, isDefault } = account;

  // ---------------- Default Switch Handler ----------------
  function handlechange(e) {
    e.stopPropagation();

    if (isDefault) {
      toast.error("At least one default account is required");
      return;
    }

    dispatch(makeoneDefault({ accountId: _id })).then((res) => {
      if (res?.payload?.success) {
        toast.success("Default account changed");
        dispatch(fetchallAccount({ UserId: backendUser._id }));
        // Fetch budget for the new default account
        dispatch(fetchBudget(res.payload.updatedAccount._id));
      } else {
        toast.error("Failed to change default account");
      }
    });
  }

  // ---------------- Delete Confirmation Handler ----------------
  function handleDeleteConfirmed(e) {
    e.stopPropagation();

    if (isDefault) {
      toast.error("You cannot delete default account");
      return;
    }

    dispatch(deleteAccount({ accountId: _id })).then((res) => {
      if (res?.payload?.success) {
        toast.success("Account deleted successfully");
        dispatch(fetchallAccount({ UserId: backendUser._id }));
      } else {
        toast.error("Failed to delete account");
      }
    });
  }

  return (
    <Card
      onClick={() => navigate(`/account/${_id}`, { state: { account } })}
      className="group hover:shadow-md transition-shadow cursor-pointer w-full"
    >
      {/* ---------------- Header ---------------- */}
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 sm:px-6">
        <CardTitle className="text-sm sm:text-base font-medium capitalize truncate max-w-[60%]">
          {name}
        </CardTitle>

        <div className="flex items-center gap-2">
          <Switch checked={isDefault} onClick={handlechange} />

          {/* ---------- Delete Confirmation Modal ---------- */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="
                  text-red-500 hover:text-red-700
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                "
              >
                <Trash2 size={18} />
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete Account?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.  
                  All transactions related to this account will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDeleteConfirmed}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      {/* ---------------- Body ---------------- */}
      <CardContent className="px-4 sm:px-6">
        <div className="text-xl sm:text-2xl font-bold truncate">
          ₹{balance}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {AccountType}
        </p>
      </CardContent>

      {/* ---------------- Footer ---------------- */}
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          Income
        </div>
        <div className="flex items-center">
          <ArrowDownLeft className="mr-1 h-4 w-4 text-red-500" />
          Expense
        </div>
        
        {/* Add Transaction Button - Only visible for default accounts */}
        {isDefault ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/transaction", { state: { account } });
            }}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <Plus size={14} />
            Add Transaction
          </button>
        ) : (
          /* AlertDialog for non-default accounts */
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-gray-400 hover:text-gray-600 font-medium transition-colors cursor-not-allowed"
              >
                <Plus size={14} />
                Add Transaction
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Make This Account Default?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You can only add transactions to your default account. 
                  Would you like to make <strong>{name}</strong> your default account?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(makeoneDefault({ accountId: _id })).then((res) => {
                      if (res?.payload?.success) {
                        toast.success(`${name} is now your default account`);
                        dispatch(fetchallAccount({ UserId: backendUser._id }));
                        dispatch(fetchBudget(_id));
                      } else {
                        toast.error("Failed to change default account");
                      }
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Make Default
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}

export default AccountCard;
