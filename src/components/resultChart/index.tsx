import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Plugin,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { VoteResultItem } from "../../types/vote";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ResultChartProps {
  data: VoteResultItem[];
}

const thumbnailPlugin = (items: VoteResultItem[]): Plugin<"bar"> => ({
  id: "thumbnailPlugin",
  afterDatasetDraw(chart) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);

    meta.data.forEach((bar, index) => {
      const item = items[index];
      if (!item?.thumbnailUrl) return;

      const img = new Image();
      img.src = item.thumbnailUrl;

      img.onload = () => {
        const x = bar.x - 40;
        const y = bar.y - 12;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, 24, 24, 6);
        ctx.clip();
        ctx.drawImage(img, x, y, 24, 24);
        ctx.restore();
      };
    });
  },
});

const ResultChart = ({ data }: ResultChartProps) => {
  const sortedData = [...data].sort((a, b) => b.totalScore - a.totalScore);

  const [imageMap, setImageMap] = useState<Record<string, HTMLImageElement>>(
    {},
  );

  const chartData = {
    labels: sortedData.map((item) => item.candidateName),
    datasets: [
      {
        label: "Score",
        data: sortedData.map((item) => item.totalScore),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    layout: {
      padding: {
        left: 50,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Vote Result",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar
        data={chartData}
        options={options}
        plugins={[thumbnailPlugin(sortedData)]}
      />
    </div>
  );
};

export default ResultChart;
