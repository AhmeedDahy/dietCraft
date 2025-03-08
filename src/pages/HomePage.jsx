import { FaUtensils, FaRunning, FaChartLine, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../features/auth/useUser";

function HomePage() {
  // Sample data (replace with real data from your app)
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
  const progress = { current: 50, target: 100 }; // Example: 50% progress toward a goal

  return (
    <main className="w-full min-h-screen p-6 bg-[#feffff]">
      {/* Welcome Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl">
          Welcome back, {isAuthenticated ? Name : "User"}!
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Keep up the great work on your fitness journey.
        </p>
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
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            to="/food-log"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white rounded-lg shadow-md hover:bg-green-50"
          >
            <FaUtensils className="text-green-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Log a Meal
            </span>
          </Link>
          <Link
            to="/start-workout"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white rounded-lg shadow-md hover:bg-blue-50"
          >
            <FaRunning className="text-blue-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Start a Workout
            </span>
          </Link>
          <Link
            to="/set-goal"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white rounded-lg shadow-md hover:bg-purple-50"
          >
            <FaChartLine className="text-purple-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Set a Goal
            </span>
          </Link>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Notifications</h2>
        <div className="flex items-center gap-2 p-6 bg-white rounded-lg shadow-md">
          <FaBell className="text-yellow-600" size={24} />
          <p className="text-gray-700">Don’t forget to log your dinner!</p>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
