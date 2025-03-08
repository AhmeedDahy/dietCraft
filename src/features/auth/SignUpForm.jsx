import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignUp from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const { signup, isPending } = useSignUp();

  return (
    <section>
      <div className="flex flex-col items-center justify-center min-h-screen max-w-[35rem] mx-auto max-sm:px-5">
        <div className="w-full bg-white rounded-lg shadow-lg">
          <div className="p-5 space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold text-center text-gray-700">
              Create an Account
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit(signup)}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* First Name Input */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    {errors.firstName ? (
                      <p className="text-red-500">{errors.firstName.message}</p>
                    ) : (
                      "First Name"
                    )}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm"
                    placeholder="Your First Name"
                    {...register("firstName", {
                      required: "First Name is required"
                    })}
                  />
                </div>
                {/* Last Name Input */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    {errors.lastName ? (
                      <p className="text-red-500">{errors.lastName.message}</p>
                    ) : (
                      "Last Name"
                    )}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm"
                    placeholder="Your Last Name"
                    {...register("lastName", {
                      required: "Last Name is required"
                    })}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  {errors.email ? (
                    <p className="text-red-500">{errors.email.message}</p>
                  ) : (
                    "Email"
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm"
                  placeholder="example@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address"
                    }
                  })}
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  {errors.password ? (
                    <p className="text-red-500">{errors.password.message}</p>
                  ) : (
                    "Password"
                  )}
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    },
                    maxLength: {
                      value: 20,
                      message: "Password cannot be longer than 20 characters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@])[A-Za-z\d@]{8,}$/,
                      message:
                        'Password must include at least 1 lowercase, 1 uppercase, 1 "@" and be at least 8 characters long'
                    }
                  })}
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  {errors.confirmPassword ? (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  ) : (
                    "Confirm Password"
                  )}
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match"
                  })}
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isPending}
                className="text-white bg-gray-700 hover:bg-gray-900 transition font-medium rounded-lg text-sm w-full px-5 py-2.5 flex justify-center items-center shadow-md"
              >
                {isPending ? <SpinnerMini /> : "Create an account"}
              </button>
            </form>
            <div className="text-sm font-light text-center text-gray-600">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline"
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
