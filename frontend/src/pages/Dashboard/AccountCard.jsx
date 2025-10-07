import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "../../components/ui/switch.jsx";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { makeoneDefault } from "../../Store/Account-Slice/index.js";

function AccountCard({ account }) {
  const dispatch = useDispatch();
  
  function handlechange(){
    
    // if (account.isDefault) {
    //   console.log("Account is already default. Cannot toggle off.");
    //   return; 
    // }
    
    console.log(account._id)
    // console.log("handlechange");

    // dispatch(makeoneDefault({ accountId: account._id })).then((data) => {
    //   if (data?.payload?.success) {
    //     toast.success("Defaut account change");
    //   } else {
    //     toast.error("error in changing default Account");
    //   }
    // });
  };

  const { name, AccountType, balance, _id, isDefault } = account;
  const navigate = useNavigate();
  return (
    <Card
      // onClick={()=>navigate(`/account/${_id}`)}
      className="hover:shadow-md transition-shadow group relative"
    >
      {/* <Link href={`/account/${_id}`}> */}

      <CardHeader className="flex flex-row items-center justify-between  space-y-0 pb-2">
        <CardTitle className=" text-sm font-medium capitalize">
          {name}
        </CardTitle>
        <Switch
          // disabled={isDefault}
          // checked={isDefault}
          onChange={handlechange}
        />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">₹{balance}</div>

        <p className="text-0.5xl text-muted-foreground  ">{AccountType}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          Income
        </div>
        <div className="flex items-center">
          <ArrowDownLeft className="mr-1 h-4 w-4 text-red-500" />
          Expense
        </div>
      </CardFooter>
      {/* </Link> */}
    </Card>
  );
}

export default AccountCard;
