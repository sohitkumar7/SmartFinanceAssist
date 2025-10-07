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

function AccountCard({ account }) {
    

  const { name, AccountType, balance, _id, isDefault } = account;
    const navigate = useNavigate();
  return (
    <Card 
    // onClick={()=>navigate(`/account/${_id}`)} 
    className="hover:shadow-md transition-shadow group relative">
      {/* <Link href={`/account/${_id}`}> */}

        <CardHeader className="flex flex-row items-center justify-between  space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium capitalize" >{name}</CardTitle>
          <Switch checked = {isDefault}/>
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
