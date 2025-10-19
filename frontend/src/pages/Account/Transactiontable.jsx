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

function Transactiontable({ Transactions }) {
  // console.log(Transactions);
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
                className="cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <div className="flex-items-center justify-end">Amount</div>
              </TableHead>

              <TableHead>Reccuring</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
          {filterAndSordtedTransaction.length === 0? (
          <TableRow>
          <TableCell
            colSpan={7}
              className="text-center text-muted-foreground">
          No Transactions Found
        </TableCell>
</TableRow>
) 8 ©
<TableRow>
<TableCell className="font-medium" >INV@@1</TableCel1>
<TableCell>Paid</TableCell>
<TableCell>Credit Card</TableCell>
<TableCell className="text-right">$250.00</TableCell>
</TableRow>
uy
</TableBody>

        </Table>
      </div>
    </div>
  );
}

export default Transactiontable;
