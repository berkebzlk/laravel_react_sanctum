import { useState } from "react";
import { NavLink, Link} from "react-router-dom";


const MenuItem = ({ menu }) => {
    return (
        <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4 mt-2 bg-gray-700`}
        >
            <span className={`hidden origin-left duration-200`}>
                <Link
                    to={menu.href}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    {menu.title}
                </Link>
            </span>
        </li>

    )
}
const Menu = ({ menu }) => {
    return (
        <ul className="pt-6 overflow-x-hidden overflow-y-scroll pb-16 h-full scrollbar-thin scrollbar-thumb">
            {menu.map((item, index) => (
                <MenuItem key={index} menu={item} />
            ))}
        </ul>
    )
}

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const menu = [
        {
            title: "Home",
            src: "home",
            href: "/",
        },
        {
            title: "Dashboard",
            src: "",
            href: "/dashboard",
        },
    ]

    return (
        <div className="flex">
            <div
                className={` ${open ? "w-72" : "w-20 "} bg-black h-screen p-5  pt-8 relative duration-300`}
            >
                <img
                    src="/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src="/assets/smiley.svg"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Fiteknoloji
                    </h1>
                </div>
                <Menu menu={menu} />
            </div>

        </div>
    )
}

export default Sidebar