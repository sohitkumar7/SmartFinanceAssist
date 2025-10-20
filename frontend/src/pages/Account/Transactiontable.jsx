import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Checkbox } from "../../components/ui/checkbox";
import { categoryColors } from "./data.js";

function Transactiontable({ Transactions }) {
  console.log(Transactions);
  const filterAndSordtedTransaction = Transactions;

  const handleSort = () => {};

  return (
    <div>
      {/* filters */}

      {/* Transaction */}
      <div className="rounded-md border">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex-items-center">Date</div>
              </TableHead>

              <TableHead>Description</TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex-items-center">Category</div>
              </TableHead>

              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("amount")}
              >
                <div className="flex-items-center justify-end">Amount</div>
              </TableHead>

              <TableHead>Reccuring</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No Transactions Found
                </TableCell>
              </TableRow>
            ) : (
              Transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="capitalize">
                    <span
                      className="px-2 py-1 rounded text-black text-sm"
                      style={{
                      //   background: categoryColors[transaction.category],
                        background: categoryColors["groceries"],

                      }}
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium" style={{
                    color: transaction.type === "EXPENSE" ? "red" : "green", 
                  }}>
                    {transaction.type === 'EXPENSE' ? "-" : "+" }
                    ₹{transaction.amount}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Transactiontable;
