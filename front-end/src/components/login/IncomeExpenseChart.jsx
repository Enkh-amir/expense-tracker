// components/DonutChart.js
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ cutout = "70%" }) => {
  // No need for width and height props here
  // Data values for each category
  const values = [5000000, 5000000, 5000000, 5000000, 5000000];
  // Calculate percentages based on equal distribution
  const total = values.reduce((acc, value) => acc + value, 0);
  const percentages = values.map((value) => ((value / total) * 100).toFixed(2));

  // Data configuration
  const data = {
    labels: [
      `Bills - ₮5,000,000 (${percentages[0]}%)`,
      `Food - ₮5,000,000 (${percentages[1]}%)`,
      `Shopping - ₮5,000,000 (${percentages[2]}%)`,
      `Insurance - ₮5,000,000 (${percentages[3]}%)`,
      `Clothing - ₮5,000,000 (${percentages[4]}%)`,
    ],
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#2B65EC",
          "#FF69B4",
          "#F4A460",
          "#20B2AA",
          "#FF8C00",
        ],
        hoverBackgroundColor: [
          "#1F4CAD",
          "#FF4977",
          "#D9875C",
          "#1B8A83",
          "#CC7000",
        ],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    cutout: cutout, // This controls the cutout size
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ₩${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Doughnut
      data={data}
      options={options}
      width={600} // Set width to 600
      height={200} // Set height to 200
      style={{ width: "600px", height: "200px" }} // Ensure styles match the dimensions
    />
  );
};

export default DonutChart;
