"use client";

import React from "react";
import ExpenseLogo from "../../../public/assets/ExpenseLogo";
import Link from "next/link";
import { IncomeGraphic } from "@/components/login/Barchart";
import { ExpenseGraphic } from "@/components/login/IncomeExpenseChart";

const DashBoardPage = () => {
  return (
    <div className="flex justify-center flex-col items-center bg-base-200 gap-5 ">
      <header className="flex w-full py-4 justify-center bg-base-100">
        <div className="flex w-[55vw] justify-between items-center">
          <div className="flex gap-4 items-center">
            <div>
              <ExpenseLogo />
            </div>
            <div>Dashboard</div>
            <Link href="/records">
              <div>Records</div>
            </Link>
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
      <main className="flex flex-col gap-5 bg-base-200 mt-4 pb-[70px]">
        <div className="flex gap-5 ">
          <div className="card bg-base-300 w-[18vw] rounded-box grid h-56 place-items-center">
            content
          </div>
          <div className="card bg-base-300 w-[18vw] rounded-box grid h-56 place-items-center">
            content
          </div>
          <div className="card bg-base-300 w-[18vw] rounded-box grid h-56 place-items-center">
            content
          </div>
        </div>
        <div className="flex gap-5">
          <IncomeGraphic />
          <ExpenseGraphic />
        </div>
        <div className="card bg-base-300 w-full rounded-box grid h-[456px] place-items-center">
          content
        </div>
      </main>
    </div>
  );
};

export default DashBoardPage;
