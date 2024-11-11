"use client";

import React, { use, useEffect, useState } from "react";
import ExpenseLogo from "../../../public/assets/ExpenseLogo";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddRecordModal from "@/components/login/AddRecordModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BACKEND_ENDPOINT } from "@/constants/constant";

const RecordsPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [records, setRecords] = useState([]);
  const [tranType, setTranType] = useState("all");
  const [cateType, setCateType] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const toggleCheckbox = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCateType((prev) => [...prev, value]);
    } else {
      setCateType((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_id"); 

    toast.success("You have logged out successfully.");

    router.push("/");
  };

  const fetchRecords = async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/records?category=${JSON.stringify(
        cateType
      )}&type=${tranType}`;

      const response = await fetch(url);
      const responseData = await response.json();
      setRecords(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const respone = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/categories`);
      const responseData = await respone.json();
      setCategories(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRecords = records.filter((record) => {
    const isCategoryMatch =
      cateType.length === 0 || cateType.includes(record.category_id);
    const isTransactionMatch =
      tranType === "all" || record.transaction_type === tranType;

    return isCategoryMatch && isTransactionMatch;
  });

  const handleForSubmit = async (e) => {
    e.preventDefault();
    const newCategory = {
      name: categoryName,
      description: description,
      category_icon: icon,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      console.log(newCategory);
      if (response.ok) {
        setCategoryName("");
        setIcon("");
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTodayRange = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(); 
    return { start, end };
  };

  // Get start and end of yesterday
  const getYesterdayRange = () => {
    const end = new Date();
    end.setHours(0, 0, 0, 0); // Midnight today
    const start = new Date(end);
    start.setDate(start.getDate() - 1); // Yesterday's date
    return { start, end };
  };

  // Get start and end of last week (Sunday to Saturday)
  const getLastWeekRange = () => {
    const now = new Date();
    const end = new Date(now);
    end.setDate(end.getDate() - now.getDay()); // Last Saturday
    end.setHours(23, 59, 59, 999); // End of last Saturday
    const start = new Date(end);
    start.setDate(start.getDate() - 6); // Start of last week (Sunday)
    start.setHours(0, 0, 0, 0); // Start of last Sunday
    return { start, end };
  };

  const getLastMonthRange = () => {
    const now = new Date();
    const end = new Date(now);
    end.setDate(end.getDate() - now.getDay());
    end.setHours(23, 59, 59, 999);
    const start = new Date(end);
    start.setDate(start.getDate() - 30);
    start.setHours(0, 0, 0, 0);
    return { start, end };
  };

  const filterByDateRange = (records, { start, end }) => {
    return records.filter((record) => {
      const recordDate = new Date(record.createdat);
      return recordDate >= start && recordDate <= end;
    });
  };

  // Define each group
  const todayRecords = filterByDateRange(filteredRecords, getTodayRange());
  const yesterdayRecords = filterByDateRange(
    filteredRecords,
    getYesterdayRange()
  );
  const lastWeekRecords = filterByDateRange(
    filteredRecords,
    getLastWeekRange()
  );

  const lastMonthRecords = filterByDateRange(
    filteredRecords,
    getLastMonthRange()
  );

  useEffect(() => {
    // Retrieve user data from localStorage when the component mounts
    const storedUser = localStorage.getItem("user_id");
    setUserId(storedUser); // Set the user state with the retrieved data
    console.log(userId);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [tranType, cateType]);

  return (
    <div className="flex justify-center flex-col items-center gap-5 ">
      <header className="flex w-full py-4 justify-center bg-base-200">
        <div className="flex w-[55vw] justify-between items-center">
          <div className="flex gap-4 items-center">
            <div>
              <ExpenseLogo />
            </div>
            <Link href="/dashboard">
              <div>Dashboard</div>
            </Link>
            <div>Records</div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="btn btn-primary rounded-s-full rounded-e-full btn-sm"
            >
              Add Record
            </button>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <AddRecordModal categories={categories} userId={userId} />
              </div>
            </dialog>
            <button className="btn btn-primary" onClick={handleLogout}>
              Log Out
            </button>
            <div className="avatar">
              <div className="w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ///////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////// */}

      <main className="w-[55vw] flex gap-5">
        <div className="card w-72 bg-base-200 border-[1px] h-max border-base-300 py-5 px-3 gap-5">
          <div className="text-2xl font-semibold ">Records</div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="btn btn-primary w-full h-8 min-h-8"
            >
              add
            </button>
            <label className="input input-bordered flex items-center gap-2 h-8 min-h-8">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="flex flex-col gap-3">
            <div>Types</div>
            <div className="form-control ml-2">
              <label className="label cursor-pointer">
                <span className="label-text">All</span>
                <input
                  value="all"
                  type="radio"
                  name="radio-1"
                  className="radio"
                  checked={tranType === "all"}
                  onChange={(e) => setTranType(e.target.value)}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Income</span>
                <input
                  value="INC"
                  type="radio"
                  name="radio-1"
                  className="radio"
                  checked={tranType === "INC"}
                  onChange={(e) => setTranType(e.target.value)}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Expense</span>
                <input
                  value="EXP"
                  type="radio"
                  name="radio-1"
                  className="radio"
                  checked={tranType === "EXP"}
                  onChange={(e) => setTranType(e.target.value)}
                />
              </label>
            </div>
            <div className="flex w-full justify-between">
              <div>Category</div>
              <button className="text-base-content">Clear</button>
            </div>
            <div className="form-control ml-2">
              {categories?.map((category, index) => {
                return (
                  <label className="label" key={index}>
                    <span className="label-text">{category.name}</span>

                    <input
                      value={category.id}
                      onChange={toggleCheckbox}
                      type="checkbox"
                      className="checkbox checkbox-sm"
                    />
                  </label>
                );
              })}
            </div>
            <button
              className="btn btn-primary min-h-4 h-8 w-full"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              + Add Category
            </button>
            <dialog id="my_modal_5" className="modal">
              <div className="modal-box">
                <form method="dialog" onSubmit={handleForSubmit}>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_5").close()
                    }
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                  <h3 className="font-bold text-lg">Add Category</h3>
                  <div className="divider"></div>
                  <div className="flex justify-between">
                    <select
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="select select-bordered w-24"
                    >
                      <option disabled value="">
                        select icon
                      </option>
                      <option value={"🏠"}>🏠</option>
                      <option value={"🥘"}>🥘</option>
                      <option value={"🚗"}>🚗</option>
                      <option value={"🐈"}>🐈</option>
                      <option value={"💊"}>💊</option>
                      <option value={"🏥"}>🏥</option>
                      <option value={"🍻"}>🍻</option>
                      <option value={"🎲"}>🎲</option>
                      <option value={"🧒"}>🧒</option>
                      <option value={"🧳"}>🧳</option>
                      <option value={"✈️"}>✈️</option>
                      <option value={"🥤"}>🥤</option>
                      <option value={"🍭"}>🍭</option>
                    </select>

                    <input
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                      }}
                      type="text"
                      placeholder="Name"
                      className="input input-bordered w-full max-w-[350px]"
                    />
                  </div>
                  <input
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    type="text"
                    placeholder="Description"
                    className="input input-bordered w-full mt-4"
                  />
                  <button
                    type="submit"
                    className="btn btn-success w-full min-h-5 h-9 mt-6 "
                    onClick={() =>
                      document.getElementById("my_modal_5").close()
                    }
                  >
                    Add
                  </button>
                </form>
              </div>
            </dialog>
          </div>
        </div>

        <div className="w-[75%] flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <div className="flex gap-3">
              <button className="btn btn-xs">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div>Last 30 days</div>
              <button className="btn btn-xs">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="dropdown">
              <button tabIndex={0} role="button" className="btn m-1">
                Newest first
                <i className="fa-solid fa-caret-down"></i>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>

          {todayRecords.length > 0 ? (
            todayRecords.map((record, index) => (
              <div key={index} className="w-full flex flex-col gap-3">
                <h2>Today</h2>
                <div
                  key={index}
                  className="card w-full bg-base-200 border-[1px] border-base-300 px-5 py-4 flex-row items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      {categories.map((category) => {
                        if (category.id === record.category_id) {
                          return (
                            <span key={category.id}>
                              {category.category_icon}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div>{record.description}</div>
                  </div>

                  <div
                    className={`${
                      record.transaction_type == "EXP"
                        ? "text-error"
                        : "text-success"
                    }`}
                  >
                    {record.transaction_type == "EXP" ? "-" : "+"}
                    {record.amount}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No records for today.</p>
          )}

          {yesterdayRecords.length > 0
            ? yesterdayRecords.map((record, index) => (
                <div key={index}>
                  <h2>Yesterday</h2>
                  <div
                    key={index}
                    className="card w-full bg-base-200 border-[1px] border-base-300 px-5 py-4 flex-row items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        {categories.map((category) => {
                          if (category.id === record.category_id) {
                            return (
                              <span key={category.id}>
                                {category.category_icon}
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <div>{record.description}</div>
                    </div>

                    <div
                      className={`${
                        record.transaction_type == "EXP"
                          ? "text-error"
                          : "text-success"
                      }`}
                    >
                      {record.transaction_type == "EXP" ? "-" : "+"}
                      {record.amount}
                    </div>
                  </div>
                </div>
              ))
            : null}

          {lastWeekRecords.length > 0
            ? lastWeekRecords.map((record, index) => (
                <div key={index}>
                  <h2>Last Week</h2>
                  <div
                    key={index}
                    className="card w-full bg-base-200 border-[1px] border-base-300 px-5 py-4 flex-row items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        {categories.map((category) => {
                          if (category.id === record.category_id) {
                            return (
                              <span key={category.id}>
                                {category.category_icon}
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <div>{record.description}</div>
                    </div>

                    <div
                      className={`${
                        record.transaction_type == "EXP"
                          ? "text-error"
                          : "text-success"
                      }`}
                    >
                      {record.transaction_type == "EXP" ? "-" : "+"}
                      {record.amount}
                    </div>
                  </div>
                </div>
              ))
            : null}

          {lastMonthRecords.length > 0
            ? lastMonthRecords.map((record, index) => (
                <div key={index}>
                  <h2>Last month</h2>
                  <div
                    key={index}
                    className="card w-full bg-base-200 border-[1px] border-base-300 px-5 py-4 flex-row items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        {categories.map((category) => {
                          if (category.id === record.category_id) {
                            return (
                              <span key={category.id}>
                                {category.category_icon}
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <div>{record.description}</div>
                    </div>

                    <div
                      className={`${
                        record.transaction_type == "EXP"
                          ? "text-error"
                          : "text-success"
                      }`}
                    >
                      {record.transaction_type == "EXP" ? "-" : "+"}
                      {record.amount}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </main>
    </div>
  );
};

export default RecordsPage;
