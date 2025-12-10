import { inngest } from "./index.js";
import Budget from "../models/budgets.js";
import User from "../models/user.js";
import Account from "../models/Account.js";
import Transaction from "../models/transaction.js";
import { sendEmail } from "../utilis/send-mail.js";


function isNewMonth(last, now) {
  return (
    last.getMonth() !== now.getMonth() ||
    last.getFullYear() !== now.getFullYear()
  );
}

export const checkBudgetAlerts = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" }, // Run every 6 hours
  async ({ step }) => {

    // 1️⃣ Fetch all budgets
    const budgets = await step.run("fetch-budgets", async () => {
      return await Budget.find().lean();
    });

    for (const budget of budgets) {
      await step.run(`check-budget-${budget._id}`, async () => {

        // 2️⃣ Fetch user
        const user = await User.findById(budget.userId);
        if (!user) return;

        // 3️⃣ Fetch default account
        const defaultAccount = await Account.findOne({
          userId: budget.userId,
          isDefault: true,
        });

        if (!defaultAccount) return;

        // 4️⃣ Start of this month
        const startDate = new Date();
        startDate.setDate(1);

        // 5️⃣ Monthly expense aggregation
        const expensesAgg = await Transaction.aggregate([
          {
            $match: {
              userId: budget.userId,
              accountId: defaultAccount._id.toString(),
              type: "EXPENSE",
              date: { $gte: startDate },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]);

        const totalExpenses = expensesAgg[0]?.total || 0;
        const percentageUsed = (totalExpenses / budget.amount) * 100;

        // 6️⃣ Alert if 80% reached and no alert this month
        const shouldSendAlert =
          percentageUsed >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(budget.lastAlertSent, new Date()));

        if (!shouldSendAlert) return;

        // 7️⃣ Send email notification
        await sendEmail({
          to: user.email,
          subject: `Budget Alert: ${defaultAccount.name}`,
          text: `You have used ${percentageUsed.toFixed(
            1
          )}% of your monthly budget.`,
        });

        // 8️⃣ Update lastAlertSent
        await Budget.findByIdAndUpdate(budget._id, {
          lastAlertSent: new Date(),
        });
      });
    }
  }
);

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Export all functions for Inngest
export const functions = [
  helloWorld,
  checkBudgetAlerts
];

