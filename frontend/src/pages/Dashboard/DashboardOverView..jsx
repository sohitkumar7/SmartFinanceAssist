import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select.jsx";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";

import { cn } from "@/lib/utils";

import { DashfetchAllTransaction } from "../../Store/Dashboarddataslice/index.js";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];

const DashboardOverview = () => {
  const dispatch = useDispatch();

  const { DashallTransaction, isLoading } = useSelector(
    (state) => state.dashData
  );
  const { allAccount } = useSelector((state) => state.Account);
  const { backendUser } = useSelector((state) => state.auth);

  const accounts = allAccount || [];
  const transactions = DashallTransaction || [];

  const [selectedAccountId, setSelectedAccountId] = useState("");

  useEffect(() => {
    if (backendUser?._id) {
      dispatch(DashfetchAllTransaction({ userId: backendUser._id }));
    }
  }, [backendUser, dispatch]);

  useEffect(() => {
    if (accounts.length > 0) {
      const defaultAcc = accounts.find((a) => a.isDefault) || accounts[0];
      setSelectedAccountId(defaultAcc._id);
    }
  }, [accounts]);

  const accountTransactions = transactions.filter(
    (t) => String(t.accountId) === String(selectedAccountId)
  );

  const recentTransactions = [...accountTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const now = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const d = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  const expensesByCategory = currentMonthExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full overflow-x-hidden">
      <Card className="w-full max-w-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-4 px-4 sm:px-6">
          <CardTitle className="text-base font-normal">
            Recent Transactions
          </CardTitle>

          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[120px] sm:w-[140px]">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account._id} value={account._id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {isLoading ? (
            <p className="text-center py-4">Loading...</p>
          ) : recentTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No recent transactions
            </p>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {t.description || "Untitled Transaction"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(t.date), "PP")}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "flex items-center shrink-0",
                      t.type === "EXPENSE"
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                  >
                    {t.type === "EXPENSE" ? (
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                    )}
                    ₹{t.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full max-w-full overflow-hidden">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base font-normal">
            Monthly Expense Breakdown
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pb-5">
          {pieChartData.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No expenses this month
            </p>
          ) : (
            <div className="h-[240px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, value }) =>
                      `${name}: ₹${value.toFixed(0)}`
                    }
                  >
                    {pieChartData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
