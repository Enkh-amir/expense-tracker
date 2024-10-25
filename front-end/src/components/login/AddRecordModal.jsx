"use client";
import React, { useState } from "react";

const AddRecordModal = () => {
  const [transactionType, setTransactionType] = useState("expense");

  const toggleTransactionType = (type) => {
    setTransactionType(type);
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Record</h2>

      <div className="flex justify-between mb-4">
        <button
          className={`w-1/2 py-2 text-center font-semibold rounded-l-lg ${
            transactionType === "expense"
              ? "bg-info text-white"
              : "bg-base-200 text-neutral-content"
          }`}
          onClick={() => toggleTransactionType("expense")}
        >
          Expense
        </button>
        <button
          className={`w-1/2 py-2 text-center font-semibold rounded-r-lg ${
            transactionType === "income"
              ? "bg-success text-white"
              : "bg-base-200 text-neutral-content"
          }`}
          onClick={() => toggleTransactionType("income")}
        >
          Income
        </button>
      </div>

      <div className="mb-4">
        <label className="block">Amount</label>

        <input
          type="number"
          placeholder="₮ 000"
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block">Category</label>
        <select className="select select-bordered w-full">
          <option disabled>Who shot first?</option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>

      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label className="block">Date</label>
          <input type="date" className="input input-bordered w-full" />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block">Time</label>
          <input type="time" className="input input-bordered w-full" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block">Payee</label>
        <input
          type="text"
          placeholder="Write here"
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block">Note</label>
        <textarea
          placeholder="Write here"
          className="input input-bordered w-full"
          rows="3"
        />
      </div>

      <button
        className={`w-full py-2 text-white font-semibold rounded-lg ${
          transactionType === "expense" ? "bg-blue-500" : "bg-green-500"
        }`}
      >
        Add Record
      </button>
    </div>
  );
};

export default AddRecordModal;
