import React, { useState, useEffect } from "react";
import { BACKEND_ENDPOINT } from "@/constants/constant";

const AddRecordModal = ({ categories, userId }) => {
  const [transactionType, setTransactionType] = useState("EXP");
  const [dateInput, setDateInput] = useState(""); // Initialize as empty
  const [timeInput, setTimeInput] = useState(""); // Initialize as empty
  const [records, setRecords] = useState({
    name: "",
    user_id: userId,
    amount: "",
    transaction_type: transactionType,
    description: "",
    category_id: "",
    createdat: new Date().toISOString(), // Initialize with current time
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecords((prevRecords) => ({ ...prevRecords, [name]: value }));
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDateInput(newDate);
    console.log(dateInput);
    if (newDate && timeInput) {
      setRecords((prevRecords) => ({
        ...prevRecords,
        createdat: `${newDate}T${timeInput}`,
      }));
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setTimeInput(newTime);
    console.log(timeInput);
    // Only set `createdat` when both date and time are provided
    if (dateInput && newTime) {
      setRecords((prevRecords) => ({
        ...prevRecords,
        createdat: `${dateInput}T${newTime}`,
      }));
    }
  };

  const toggleTransactionType = (type) => {
    setTransactionType(type);
    setRecords((prevRecords) => ({ ...prevRecords, transaction_type: type }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(records),
      });

      if (!response.ok) {
        console.log("error");
      }

      const data = await response.json();
      console.log("Record added successfully:", data);
      setRecords({
        name: "",
        amount: "",
        transaction_type: transactionType,
        category_id: "",
        description: "",
        createdat: "",
      });
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <form method="dialog" onSubmit={handleFormSubmit}>
      <button
        type="button"
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById("my_modal_3").close()}
      >
        ✕
      </button>
      <div className="max-w-md mx-auto p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Record</h2>

        {/* Transaction Type Buttons */}
        <div className="flex justify-between mb-4">
          <button
            type="button"
            className={`w-1/2 py-2 text-center font-semibold rounded-l-lg ${
              transactionType === "EXP"
                ? "bg-info text-white"
                : "bg-base-200 text-neutral-content"
            }`}
            onClick={() => toggleTransactionType("EXP")}
          >
            Expense
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 text-center font-semibold rounded-r-lg ${
              transactionType === "INC"
                ? "bg-success text-white"
                : "bg-base-200 text-neutral-content"
            }`}
            onClick={() => toggleTransactionType("INC")}
          >
            Income
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block">Amount</label>
          <input
            type="number"
            name="amount"
            value={records.amount}
            onChange={handleInputChange}
            placeholder="₮ 000"
            className="input input-bordered w-full"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block">Category</label>
          <select
            name="category_id"
            value={records.category_id}
            onChange={handleInputChange}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_icon}
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time Inputs */}
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block">Date</label>
            <input
              type="date"
              value={dateInput}
              onChange={handleDateChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block">Time</label>
            <input
              type="time"
              value={timeInput}
              onChange={handleTimeChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Payee Input */}
        <div className="mb-4">
          <label className="block">Payee</label>
          <input
            name="name"
            value={records.name}
            onChange={handleInputChange}
            type="text"
            placeholder="Write here"
            className="input input-bordered w-full"
          />
        </div>

        {/* Note Input */}
        <div className="mb-4">
          <label className="block">Note</label>
          <textarea
            name="description"
            value={records.description}
            onChange={handleInputChange}
            placeholder="Write here"
            className="input input-bordered w-full"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-2 text-white font-semibold rounded-lg ${
            transactionType === "EXP" ? "bg-blue-500" : "bg-green-500"
          }`}
          type="submit"
          onClick={() => document.getElementById("my_modal_3").close()}
        >
          Add Record
        </button>
      </div>
    </form>
  );
};

export default AddRecordModal;
