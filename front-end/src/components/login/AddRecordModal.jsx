import React, { useState } from "react";
import { BACKEND_ENDPOINT } from "@/constants/constant";

const AddRecordModal = () => {
  const [transactionType, setTransactionType] = useState("EXP");
  const [records, setRecords] = useState({
    name: "",
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
    const timePart = records.createdat.split("T")[1]; // Get existing time
    setRecords((prevRecords) => ({
      ...prevRecords,
      createdat: `${newDate}T${timePart}`,
    }));
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    const datePart = records.createdat.split("T")[0]; // Get existing date
    setRecords((prevRecords) => ({
      ...prevRecords,
      createdat: `${datePart}T${newTime}`,
    }));
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

      if (!response.ok) console.log("error");

      const data = await response.json();
      console.log("Record added successfully:", data);
      setRecords({
        name: "",
        amount: "",
        transaction_type: transactionType,
        category_id: "",
        description: "",
        createdat: new Date().toISOString(), // Reset to current time after submit
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
            <option disabled>Who shot first?</option>
            <option value={"ddb49410-7646-46cd-9dbe-56fadb7a9a8c"}>hool</option>
            <option value={"67facf23-3dea-4a17-a33c-3c59041e7e79"}>
              minii muur
            </option>
          </select>
        </div>

        {/* Date and Time Inputs */}
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block">Date</label>
            <input
              type="date"
              value={records.createdat.split("T")[0] || ""}
              onChange={handleDateChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block">Time</label>
            <input
              type="time"
              value={records.createdat.split("T")[1].split(".")[0] || ""} // Get only the time part without milliseconds
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
        >
          Add Record
        </button>
      </div>
    </form>
  );
};

export default AddRecordModal;
