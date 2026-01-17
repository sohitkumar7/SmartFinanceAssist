import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTransaction } from "../../Store/Transaction-Slice/index.js";
import { fetchBudget } from "../../Store/Budget-Slice/index.js";
import { toast } from "react-hot-toast";
import { defaultCategories } from "../Account/data.js";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";
import api from "../../services/api.js";

function AddTransactionForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allAccount } = useSelector((state) => state.Account);
  const { backendUser } = useSelector((state) => state.auth);

  const defaultAccount = allAccount?.find((acc) => acc.isDefault);

  const [form, setForm] = useState({
    type: "EXPENSE",
    amount: "",
    description: "",
    category: "",
    receiptUrl: "",
    isRecurring: false,
    status: "COMPLETED",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!defaultAccount) {
      toast.error("No default account found!");
      return;
    }

    const dateObj = new Date(form.date);
    dateObj.setUTCHours(8, 0, 0, 0);

    const dataToSend = {
      ...form,
      amount: String(form.amount),
      accountId: defaultAccount._id,
      date: dateObj.toISOString(),
    };

    dispatch(createTransaction(dataToSend)).then((res) => {
      if (res?.payload?.success) {
        toast.success("Transaction added successfully!");
        // Refresh budget to update progress bar
        if (form.type === "EXPENSE" && defaultAccount?._id) {
          console.log("Fetching budget for account:", defaultAccount._id); // Debug
          dispatch(fetchBudget(defaultAccount._id)).then(() => {
            // Navigate after fetch completes
            navigate("/dashboard");
          });
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("Error adding transaction!");
      }
    });
  };
  
  const [receiptFile, setReceiptFile] = useState(null);

  console.log(defaultAccount,"defaultaccount")
const handleUploadReceipt = async () => {

  if (!receiptFile) return toast.error("Upload a receipt image");
  if (!defaultAccount) return toast.error("No default account");
  toast.error("currently this feature is not Available");
  return;

  const formData = new FormData();
  formData.append("receipt", receiptFile);           
  formData.append("accountId", defaultAccount._id);  

  try {
    const res = await api.post(
      "/api/ai/receipt-transaction",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.data?.success) {
      toast.success("Transaction added from receipt!");
      navigate("/dashboard");
    } else {
      toast.error("Failed to process receipt");
    }
  } catch (err) {
    toast.error("AI receipt processing failed");
  }
};



  return (
    <div className="max-w-lg mx-auto p-5 bg-white rounded shadow">
      {/* AI Receipt Upload Section */}
      <div className="mb-6 p-4 border border-dashed border-purple-400 rounded-lg bg-purple-50">
        <p className="text-sm font-medium text-purple-700 mb-3 text-center">
          Upload your receipt image
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setReceiptFile(e.target.files[0])}
          className="
                w-full
                text-sm
                file:mr-4
                file:py-2
                file:px-4
                file:rounded-md
                file:border-0
                file:text-sm
                file:font-semibold
                file:bg-purple-600
                file:text-white
                hover:file:bg-purple-700
                cursor-pointer
              "
        />

        <button
          type="button"
          onClick={handleUploadReceipt}
          className="
              mt-4
              w-full
              bg-gradient-to-r
              from-pink-500
              to-purple-500
              text-white
              font-semibold
              py-2
              rounded-lg
              shadow
              hover:opacity-90
              transition
            "
        >
          Upload Receipt (AI)
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

      <p className="mb-3 text-sm text-gray-600">
        <b>Default Account:</b>{" "}
        {defaultAccount ? defaultAccount.name : "Loading..."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>

            {defaultCategories
              .filter((cat) => cat.type === form.type)
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Receipt URL</label>
          <input
            type="text"
            name="receiptUrl"
            value={form.receiptUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="https://example.com/receipt.jpg"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Recurring checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isRecurring"
            checked={form.isRecurring}
            onChange={handleChange}
          />
          <label>Is Recurring?</label>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
