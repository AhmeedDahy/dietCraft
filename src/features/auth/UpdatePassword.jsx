import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import Modal from "../../ui/Modal";
import useUpdateUser from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
function UpdatePassword() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();
  const { editUser, isPending: isUpdating } = useUpdateUser();
  const isPasswordChanged = watch("password");

  const handleUpdatePassword = (data) => {
    editUser(data, {
      onSuccess: () => {
        toast.success("Password updated successfully!");
        setIsEditModalOpen(false);
        reset(); // Reset the form fields
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update password");
      }
    });
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Account Settings
      </h2>
      <div className="space-y-4">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Change Password
        </button>
        <button className="w-full px-4 py-2 text-sm font-medium text-left text-red-600 bg-red-100 rounded-lg hover:bg-red-200">
          Delete Account
        </button>
      </div>
      {/* Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Password</h2>
          <button
            type="button"
            onClick={() => setIsEditModalOpen(false)}
            className="text-black hover:text-[#FB0101] transition"
          >
            <IoIosClose size={40} />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleUpdatePassword)}>
          <div className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
                {...register("password", {
                  required: "This is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@])[A-Za-z\d@]{8,}$/,
                    message:
                      'Password must include at least 1 lowercase, 1 uppercase, 1 "@" and be at least 8 characters long'
                  },
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8"
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot be longer than 20 characters"
                  }
                })}
              />
              {errors.password && (
                <p className="mt-1 text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match"
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`flex items-center justify-center w-full px-4 py-2 ${isPasswordChanged ? "bg-green-500 hover:bg-green-700" : "disabled:cursor-pointer bg-gray-400"} text-white rounded-lg md:w-40`}
              disabled={isUpdating}
            >
              {isUpdating ? <SpinnerMini /> : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UpdatePassword;
