"use client";

import React from "react";
import ExpenseLogo from "../../../public/assets/ExpenseLogo";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import IncomeExpenseChart from "@/components/login/IncomeExpenseChart";
import PieChart from "@/components/login/IncomeExpenseChart";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashBoardPage = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Income",
        data: [5000, 7000, 8000, 6500, 9000, 11000, 10500],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Expenses",
        data: [3000, 4000, 2000, 3000, 4500, 5000, 6000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income and Expenses by Month",
      },
    },
  };
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
          <div className="card bg-base-300 w-[50%] rounded-box grid h-56 place-items-center">
            <Bar data={data} options={options} />
          </div>
          <div className="card bg-base-300 w-[50%] rounded-box grid h-max place-items-center">
            <div>
              <h1>Income - Expense (Jun 1 - Nov 30)</h1>
              <PieChart />
            </div>
          </div>
        </div>
        <div className="card bg-base-300 w-full rounded-box grid h-[456px] place-items-center">
          content
        </div>
      </main>
    </div>
  );
};

export default DashBoardPage;
