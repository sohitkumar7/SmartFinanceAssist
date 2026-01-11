import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "../../components/ui/switch.jsx";
import { ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  fetchallAccount,
  makeoneDefault,
  deleteAccount,
} from "../../Store/Account-Slice/index.js";

function AccountCard({ account }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { backendUser } = useSelector((state) => state.auth);

  const { name, AccountType, balance, _id, isDefault } = account;

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
      } else {
        toast.error("Failed to change default account");
      }
    });
  }

  function handleDelete(e) {
    e.stopPropagation();

    if (isDefault) {
      toast.error("You cannot delete default account");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirmDelete) return;

    dispatch(deleteAccount({ accountId: _id })).then((res) => {
      if (res?.payload?.success) {
        toast.success("Account deleted successfully");
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
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 sm:px-6">
        <CardTitle className="text-sm sm:text-base font-medium capitalize truncate max-w-[60%]">
          {name}
        </CardTitle>

        <div className="flex items-center gap-2">
          <Switch checked={isDefault} onClick={handlechange} />

          <button
            onClick={handleDelete}
            className="
              text-red-500 hover:text-red-700
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        <div className="text-xl sm:text-2xl font-bold truncate">
          ₹{balance}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {AccountType}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          Income
        </div>
        <div className="flex items-center">
          <ArrowDownLeft className="mr-1 h-4 w-4 text-red-500" />
          Expense
        </div>
      </CardFooter>
    </Card>
  );
}

export default AccountCard;
