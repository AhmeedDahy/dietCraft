import { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import useUser from "../features/auth/useUser";
import usePlan from "../features/DietRecommendation/usePlan";
import useUpdateUser from "../features/auth/useUpdateUser";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import PlanForm from "../ui/PlanForm";
import Modal from "../ui/Modal";
import UpdatePassword from "../features/auth/UpdatePassword";
import toast from "react-hot-toast";

function Account() {
  const { user, isPending, isAuthenticated } = useUser();
  const { plan, isPending: isPlanning } = usePlan(user?.email);
  const { editUser, isPending: isUpdating } = useUpdateUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [firstName, setFirstName] = useState(
    user?.user_metadata?.firstName || ""
  );
  const [lastName, setLastName] = useState(user?.user_metadata?.lastName || "");
  const [avatar, setAvatar] = useState(null);
  const [originalData, setOriginalData] = useState({
    firstName: "",
    lastName: "",
    avatar: null
  });
  // Set the original user data on component mount
  useEffect(() => {
    if (user) {
      setOriginalData({
        firstName: user?.user_metadata?.firstName || "",
        lastName: user?.user_metadata?.lastName || "",
        avatar: user?.user_metadata?.avatar || null
      });
    }
  }, [user]);
  const hasDataChanged =
    firstName !== originalData.firstName ||
    lastName !== originalData.lastName ||
    avatar !== null;
  // Show a full-page spinner while loading user or plan data
  if (isPending || isPlanning) return <Spinner />;

  // Redirect or show a message if the user is not authenticated
  if (!isAuthenticated) return <p>You must log in first.</p>;

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    editUser(
      { firstName, lastName, avatar },
      {
        onSuccess: () => {
          toast.success("User updated successfully!");
          setIsEditModalOpen(false);
        }
      }
    );
  };

  return (
    <div className="min-h-screen p-3 md:p-6 bg-gray-50">
      {/* User Profile Section */}
      <div className="flex flex-wrap items-center justify-between p-4 mx-auto mb-8 bg-white rounded-lg shadow-md max-w-8xl">
        <div className="flex items-center gap-4">
          {/* Display user avatar */}
          {user?.user_metadata?.avatar ? (
            <img
              src={user.user_metadata.avatar}
              alt="User Avatar"
              loading="lazy"
              className="rounded-full block w-[4rem] h-[4rem] object-cover object-center aspect-square"
            />
          ) : (
            <FaUserCircle className="text-6xl text-gray-400" />
          )}
          <div>
            <h1 className="text-lg font-bold text-gray-800 md:text-2xl">
              {user?.user_metadata?.firstName || "User"}{" "}
              {user?.user_metadata?.lastName}
            </h1>
            <p className="text-sm text-gray-600 md:text-base">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 mt-3 font-medium text-white transition-colors bg-green-600 rounded-lg max-sm:justify-center max-sm:w-full hover:bg-green-700"
          onClick={() => setIsEditModalOpen(true)}
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button
            type="button"
            onClick={() => setIsEditModalOpen(false)}
            className="text-black hover:text-[#FB0101] transition"
          >
            <IoIosClose size={40} />
          </button>
        </div>
        <form onSubmit={handleProfileUpdate}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className={`flex items-center justify-center w-full px-4 py-2 text-white ${hasDataChanged ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"} rounded-lg md:w-40`}
              disabled={!hasDataChanged || isUpdating}
            >
              {isUpdating ? <SpinnerMini /> : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Diet Plan Section */}
      <div className="p-8 mx-auto mb-8 bg-white rounded-lg shadow-md max-w-8xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Your Diet Plans
        </h2>
        {Array.isArray(plan) && plan.length > 0 ? (
          <div className="space-y-4">
            {plan.map((planItem, index) => (
              <PlanForm key={index} planItem={planItem} email={user?.email} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-gray-600">
              No saved diet plans found. Create a new plan to get started!
            </p>
            <Link
              to="/create-plan"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              <FaPlus /> Create New Plan
            </Link>
          </div>
        )}
      </div>

      {/* Account Settings Section */}
      <div className="p-8 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <UpdatePassword />
      </div>

      {/* Motivational Message */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <p className="text-gray-600">
          Success is the sum of small efforts, repeated day in and day out
        </p>
      </div>
    </div>
  );
}

export default Account;
