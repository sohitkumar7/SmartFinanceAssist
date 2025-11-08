import React, { useMemo, useState } from "react";
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
import {
  Badge,
  ChevronDown,
  ChevronUp,
  Clock,
  MoreHorizontal,
  Search,
  Trash,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip.jsx";
import { Button } from "../../components/ui/button.jsx";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu.jsx";
import { useNavigate } from "react-router-dom";
import { Input } from "../..//components/ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../..//components/ui/select.jsx";
import { useDispatch } from "react-redux";
import { DeletTransaction, fetchAllTransaction } from "../../Store/Transaction-Slice/index.js";

const RECURRING_INTERVALS = {
  DAILY: "Dily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

function Transactiontable({ accountId , Transactions }) {

  // console.log(accountId);

  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFiter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const dispatch = useDispatch();


  // console.log(Transactions);

  const filterAndSordtedTransaction = useMemo(() => {
    let result = [...Transactions];

    if (searchTerm) {
      const seachLower = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.description?.toLowerCase().includes(seachLower)
      );
    }

    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter == "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }

    if (typeFiter) {
      result = result.filter((transaction) => transaction.type === typeFiter);
    }

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
    

    return result;
  }, [Transactions, searchTerm, typeFiter, recurringFilter, sortConfig]);

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field == field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item != id)
        : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === Transactions.length
        ? []
        : Transactions.map((transaction) => transaction._id)
    );
  };

  const handleBulkDelete = () => {
    const formdata  = {
      selectedIds,
      accountId
    }
    dispatch(DeletTransaction(formdata))
    setSelectedIds([])

  };

  const handleClearFilters = () => {
    setRecurringFilter("");
    setSearchTerm("");
    setTypeFilter("");
    setSelectedIds([]);
  };

  return (
    <div>
      {/* filters */}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search Transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={typeFiter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(value) => setRecurringFilter(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Transaction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Recurring-Only</SelectItem>
              <SelectItem value="non-recurring">Non-Recurring-Only</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash className="h-4 w-4 mr-2"></Trash>
                Deleted Selected({selectedIds.length})
              </Button>
            </div>
          )}

          {(searchTerm ||
            typeFiter ||
            recurringFilter ||
            selectedIds.length > 0) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              title="Clear Filters"
            >
              <X className="h-4 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Transaction */}

      <div className="rounded-md border">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  onCheckedChange={() => handleSelectAll()}
                  checked={
                    selectedIds.length === Transactions.length &&
                    Transactions.length > 0
                  }
                />
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  <div>
                    {sortConfig.field === "date" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4 "></ChevronUp>
                      ) : (
                        <ChevronDown className="m1-1 h-4 w-4"></ChevronDown>
                      ))}
                  </div>
                </div>
              </TableHead>

              <TableHead>Description</TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  <div>
                    {sortConfig.field === "category" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4"></ChevronUp>
                      ) : (
                        <ChevronDown className="m1-1 h-4 w-4"></ChevronDown>
                      ))}
                  </div>
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end">
                  Amount
                  <div>
                    {sortConfig.field === "amount" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4 "></ChevronUp>
                      ) : (
                        <ChevronDown className="m1-1 h-4 w-4"></ChevronDown>
                      ))}
                  </div>
                </div>
              </TableHead>

              <TableHead>Reccuring</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterAndSordtedTransaction.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No Transactions Found
                </TableCell>
              </TableRow>
            ) : (
              filterAndSordtedTransaction.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={() => handleSelect(transaction._id)}
                      checked={selectedIds.includes(transaction._id)}
                    />
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
                  <TableCell
                    className="text-right font-medium"
                    style={{
                      color: transaction.type === "EXPENSE" ? "red" : "green",
                    }}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}₹
                    {transaction.amount}
                  </TableCell>

                  <TableCell>
                    {transaction.isRecurring ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            _
                            className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                          >
                            <Clock className="h-3 w-3"></Clock>
                            {RECURRING_INTERVALS[transaction.recurringInterval]}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <div>Next Date:</div>
                            <div>
                              {format(
                                new Date(transaction.nextRecurringDate),
                                "PPpp"
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button>
                        <Clock className="h-3 w-3"></Clock>
                        One-Time
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4"> </MoreHorizontal>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel
                          onClick={() =>
                            navigate(
                              `/transaction/create/edit/${transaction._id}`
                            )
                          }
                        >
                          Edit
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          // onClick={()=>deletefn([transaction._id])}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
