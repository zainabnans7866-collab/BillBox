import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsChart({ bills }) {
  const monthlyData = {};

  bills.forEach((bill) => {
    const month = new Date(bill.purchase_date).toLocaleString("default", {
      month: "short",
    });

    monthlyData[month] =
      (monthlyData[month] || 0) + Number(bill.price);
  });

  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    spending: monthlyData[month],
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Monthly Spending
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="spending"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}