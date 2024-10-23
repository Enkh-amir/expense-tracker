import React from "react";
import ExpenseLogo from "../../../public/assets/ExpenseLogo";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";

const RecordsPage = () => {
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
            <button className="btn btn-primary rounded-s-full rounded-e-full btn-sm">
              Add Record
            </button>
            <div className="avatar">
              <div className="w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-[55vw] flex gap-5">
        <div className="card w-72 bg-base-200 border-[1px] h-max border-base-300 py-5 px-3 gap-5">
          <div className="text-2xl font-semibold ">Records</div>
          <div className="flex flex-col gap-4">
            <button className="btn btn-primary w-full h-8 min-h-8">add</button>
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
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Income</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Expense</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </div>
            <div className="flex w-full justify-between">
              <div>Category</div>
              <button className="text-base-content">Clear</button>
            </div>
            <div className="form-control ml-2">
              <label className="label">
                <span className="label-text">All</span>
                <i className="fa-solid fa-eye"></i>
              </label>
              <label className="label">
                <span className="label-text">Income</span>
                <i className="fa-solid fa-eye"></i>
              </label>
              <label className="label">
                <span className="label-text">Expense</span>
                <i className="fa-solid fa-eye"></i>
              </label>
              <label className="label">
                <span className="label-text">Expense</span>
                <i className="fa-solid fa-eye"></i>
              </label>
              <label className="label">
                <span className="label-text">Expense</span>
                <i className="fa-solid fa-eye"></i>
              </label>
            </div>
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
          <div className="w-full flex flex-col gap-3">
            <div>Today</div>
            <div className="card w-full bg-base-200 border-[1px] border-base-300 px-5 py-4 flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-house"></i>
                <div>Electricity</div>
              </div>
              <div>+1000</div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div>
              <div>Yesterday</div>
              <div className="card w-full bg-base-200 border-[1px] border-base-300 px-5 py-4 flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-house"></i>
                  <div>Electricity</div>
                </div>
                <div>+1000</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordsPage;
