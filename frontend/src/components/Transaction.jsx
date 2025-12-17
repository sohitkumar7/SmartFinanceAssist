
import React from "react";
import Header from "./Header";
import AddTransactionForm from "../pages/Transaction/AddTransactionForm.jsx";

function Transaction() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Add Transaction
          </span>
        </h1>
        
        <div>
          <AddTransactionForm />
        </div>
      </div>
    </div>
  );
}

export default Transaction;
