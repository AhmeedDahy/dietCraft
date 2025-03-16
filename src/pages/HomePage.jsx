import { FaUtensils, FaRunning, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../features/auth/useUser";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function HomePage() {
  const { user, isAuthenticated } = useUser();
  const Name =
    user?.user_metadata?.firstName + " " + user?.user_metadata?.lastName;
  const stats = {
    caloriesConsumed: 1200,
    workoutsCompleted: 3,
    goalsAchieved: 2
  };
  const recentActivities = [
    { id: 1, type: "Meal", description: "Logged breakfast: 400 kcal" },
    { id: 2, type: "Workout", description: "Completed 30-minute run" },
    { id: 3, type: "Goal", description: "Reached 50% of monthly goal" }
  ];
  const progress = { current: 50, target: 100 };
  const weeklySummary = {
    totalCalories: 8400,
    totalWorkouts: 5,
    averageWaterIntake: 2.5,
    weightChange: -1.2
  };
  const progressData = [
    { week: "Week 1", progress: 20 },
    { week: "Week 2", progress: 40 },
    { week: "Week 3", progress: 60 },
    { week: "Week 4", progress: 80 }
  ];
  const reminders = [
    { id: 1, message: "Don’t forget to log your dinner!" },
    { id: 2, message: "You’re close to your daily water intake goal!" },
    { id: 3, message: "Time for your evening workout!" }
  ];
  const dailyTips = [
    "Drink a glass of water before every meal to help control portion sizes.",
    "Aim for at least 30 minutes of physical activity every day.",
    "Include a variety of colorful fruits and vegetables in your meals.",
    "Track your progress regularly to stay motivated."
  ];
  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  return (
    <main className="w-full min-h-screen p-6 rounded-lg bg-[#feffff]">
      {/* Welcome Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl">
          Welcome back, {isAuthenticated ? Name : "User"}!
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Keep up the great work on your fitness journey.
        </p>
        <div className="p-4 mt-4 rounded-lg bg-green-50">
          <p className="text-sm text-green-700">💡 Daily Tip: {randomTip}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Calories Consumed
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.caloriesConsumed} kcal
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Workouts Completed
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.workoutsCompleted}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Goals Achieved
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {stats.goalsAchieved}
          </p>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Weekly Summary
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Calories
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {weeklySummary.totalCalories} kcal
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Workouts
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {weeklySummary.totalWorkouts}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Avg. Water Intake
            </h3>
            <p className="text-2xl font-bold text-purple-600">
              {weeklySummary.averageWaterIntake}L/day
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Weight Change
            </h3>
            <p className="text-2xl font-bold text-yellow-600">
              {weeklySummary.weightChange} kg
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <p className="text-gray-700">{activity.description}</p>
            </div>
          ))}
        </div>
        <Link
          rel="preload"
          to="/activity"
          className="block mt-4 text-sm text-blue-600 hover:underline"
        >
          View All Activity →
        </Link>
      </div>

      {/* Goals and Progress */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Progress</h2>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Monthly Goal: {progress.current}% Complete
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${progress.current}%` }}
            ></div>
          </div>
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <XAxis dataKey="week" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            rel="preload"
            to="/food-log"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white rounded-lg shadow-md hover:bg-green-50"
          >
            <FaUtensils className="text-green-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Log a Meal
            </span>
          </Link>
          <Link
            rel="preload"
            to="/start-workout"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white rounded-lg shadow-md hover:bg-blue-50"
          >
            <FaRunning className="text-blue-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Start a Workout
            </span>
          </Link>
          <Link
            rel="preload"
            to="/browse-foods"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white rounded-lg shadow-md hover:bg-orange-50"
          >
            <FaUtensils className="text-orange-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Explore Recipes
            </span>
          </Link>
        </div>
      </div>

      {/* Reminders */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Reminders</h2>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-md"
            >
              <FaBell className="text-yellow-600" size={20} />
              <p className="text-gray-700">{reminder.message}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
