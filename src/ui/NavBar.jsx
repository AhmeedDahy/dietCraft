import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import SpinnerMini from "../ui/SpinnerMini";
import useUser from "../features/auth/useUser";
import useLogout from "../features/auth/useLogout";

function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const { logout, isPending } = useLogout();
  const handleMenuToggle = () => setMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    logout({}, { onSuccess: () => navigate("/login") });
  };

  return (
    <nav>
      <div className="flex items-center justify-between w-full p-3 bg-white border-b-2 shadow-lg border-b-gray-200">
        <div className="flex items-center justify-center gap-20">
          <Link rel="preload" to="/">
            <span className="self-center pl-3 text-2xl font-bold text-black sm:pl-7">
              DietCraft
            </span>
          </Link>
        </div>
        <div className="hidden gap-4 lg:flex">
          {isAuthenticated ? (
            <>
              <button className="px-3 py-2 border border-gray-200 rounded-lg">
                <Link
                  to="/account"
                  className="flex items-center justify-center gap-x-2"
                >
                  <FaUserAlt size={20} />
                  Your Profile
                  {/* {user.user_metadata.firstName +
                    " " +
                    user.user_metadata.lastName} */}
                </Link>
              </button>
              <button
                className="px-3 py-2 border border-gray-200 rounded-lg"
                onClick={handleLogout}
              >
                <div className="flex items-center justify-center gap-x-2">
                  {isPending ? (
                    <div className="spinner-mini-black"></div>
                  ) : (
                    <>
                      <TbLogout2 size={20} />
                      <span>Logout</span>
                    </>
                  )}
                </div>
              </button>
            </>
          ) : (
            <>
              <button className="px-3 py-2 font-semibold border border-gray-200 rounded-lg">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-x-2"
                >
                  <LuLogIn size={20} />
                  <span>Login</span>
                </Link>
              </button>
              <button className="px-3 py-2 font-semibold border border-gray-200 rounded-lg">
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-x-2"
                >
                  <RiAccountCircleFill size={24} />
                  <span>SignUp</span>
                </Link>
              </button>
            </>
          )}
        </div>

        <button
          onClick={handleMenuToggle}
          type="button"
          className="items-center justify-center hidden w-10 h-10 p-2 text-sm max-lg:inline-flex"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          style={{ zIndex: isMenuOpen ? "101" : "100" }}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <RiCloseLargeFill className="text-white" size={20} />
          ) : (
            <IoMenu size={20} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="top-0 left-0 z-40 items-center justify-center hidden w-full h-full bg-black max-lg:fixed bg-opacity-90 max-lg:flex">
          <ul className="flex flex-col items-center space-y-6 text-xl text-white">
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    onClick={handleMenuToggle}
                    to="/account"
                    className={`flex items-center justify-center gap-3 hover:underline ${location.pathname === "/account" ? "font-bold" : ""}`}
                  >
                    <FaUserAlt className="w-5 h-5" />
                    {/* {user.user_metadata.firstName +
                      " " +
                      user.user_metadata.lastName} */}
                    Your Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <div className="text-white hover:underline">
                      {isPending ? (
                        <SpinnerMini />
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <TbLogout2 size={20} />
                          <span className="block mb-1">Logout</span>
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center justify-center text-white gap-x-2 hover:underline"
                    onClick={handleMenuToggle}
                  >
                    <LuLogIn />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center text-white gap-x-2 hover:underline"
                    onClick={handleMenuToggle}
                  >
                    <RiAccountCircleFill size={20} />
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
