import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { PiCalculatorLight } from "react-icons/pi";
import { FiPieChart } from "react-icons/fi";
import { PiBowlFood } from "react-icons/pi";
import { PiCarrotLight } from "react-icons/pi";

function Nav() {
  const location = useLocation();
  const menu = useMemo(
    () => [
      {
        id: 1,
        label: "Dashboard",
        href: "/",
        icon: <AiOutlineHome size={20} />
      },
      {
        id: 2,
        label: "Calculator",
        href: "/diet-recommendation",
        icon: <PiCalculatorLight size={20} />
      },
      {
        id: 3,
        label: "Food Log",
        href: "/food-log",
        icon: <PiCarrotLight size={20} />
      },
      {
        id: 4,
        label: "Recipes",
        href: "/browse-foods",
        icon: <PiBowlFood size={20} />
      },
      {
        id: 5,
        label: "Progress",
        href: "/progress",
        icon: <FiPieChart size={20} />
      }
    ],
    []
  );

  return (
    <div className="pb-5">
      <ul className="flex flex-wrap items-center justify-between w-full gap-4 md:justify-start">
        {menu.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <li key={item.id} className="flex-1 md:flex-grow-0">
              <Link
                className={`flex gap-2 transition text-center items-center justify-center px-3 py-2 rounded-lg text-nowrap ${
                  isActive
                    ? "text-white bg-[#16a34a]"
                    : "text-[#4b5563] bg-white hover:bg-[#f9fafb]"
                }`}
                to={item.href}
              >
                {item.icon}{" "}
                <span className={isActive ? "text-white" : ""}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Nav;
