import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer
} from "recharts";

function Progress() {
  // Fake data for charts
  const calorieData = [
    { day: "Mon", calories: 2000 },
    { day: "Tue", calories: 1800 },
    { day: "Wed", calories: 2200 },
    { day: "Thu", calories: 1900 },
    { day: "Fri", calories: 2100 },
    { day: "Sat", calories: 2300 },
    { day: "Sun", calories: 2000 }
  ];

  const macroData = [
    { name: "Carbs", value: 50 },
    { name: "Proteins", value: 30 },
    { name: "Fats", value: 20 }
  ];

  const waterData = [
    { day: "Mon", liters: 2 },
    { day: "Tue", liters: 2.5 },
    { day: "Wed", liters: 3 },
    { day: "Thu", liters: 2 },
    { day: "Fri", liters: 2.8 },
    { day: "Sat", liters: 3.5 },
    { day: "Sun", liters: 2.2 }
  ];

  const weightData = [
    { week: "Week 1", weight: 75 },
    { week: "Week 2", weight: 74 },
    { week: "Week 3", weight: 73 },
    { week: "Week 4", weight: 72 }
  ];

  return (
    <div className="min-h-screen p-4 bg-white rounded-lg">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-left">
        Your Diet Progress
      </h1>

      {/* Grid Layout for Medium Screens and Above */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Calorie Intake Chart */}
        <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#fafcff]">
          {" "}
          {/* Light Blue */}
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Calorie Intake Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={calorieData}>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="calories"
                stroke="#3B82F6" // Blue for Calorie Chart
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Macronutrient Distribution Chart */}
        <div className="p-6 transition-shadow rounded-lg shadow-md bg-teal-50 hover:shadow-lg">
          {" "}
          {/* Light Red */}
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Macronutrient Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={macroData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#14b8a6 " // Red for Macronutrient Chart
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Water Intake Chart */}
        <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#e8fff4]">
          {" "}
          {/* Light Green */}
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Water Intake
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterData}>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="liters" fill="#10B981" />{" "}
              {/* Green for Water Chart */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weight Loss Progress Chart */}
        <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#FFFBEB]">
          {" "}
          {/* Light Orange */}
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Weight Loss Progress
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weightData}>
              <XAxis dataKey="week" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#F59E0B" // Orange for Weight Chart
                fill="#F59E0B"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Progress;
