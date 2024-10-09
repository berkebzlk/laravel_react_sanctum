"use client"
import { useState } from "react";

const MenuItem = ({ menuItem, open }) => {
    console.log(menuItem)
    return <li
        className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-800 text-gray-300 text-sm items-center gap-x-4 
            ${menuItem?.gap ? "mt-9" : "mt-2"}`}
    >
        <img src={`/assets/${menuItem.src}.svg`} />
        <span className={`${!open && "hidden"} origin-left duration-200`}>
            {menuItem.title}
        </span>
    </li>
}

const Menu = ({ menu, open }) => {
    return <ul className="h-full pt-6 pb-16 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb">
        {menu.map((menuItem, index) => (
            <MenuItem menuItem={menuItem} open={open} />
        ))}
    </ul>
}

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Overview", src: "Overview" },
        { title: "Transactions", src: "Transactions" },
        { title: "Loyalty Cards", src: "Card", gap: true },
        { title: "Subscriptions ", src: "Calendar" },
        { title: "Debts", src: "Debt" },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting", src: "Settings" },
        { title: "Overview", src: "Overview" },
        { title: "Transactions", src: "Transactions" },
        { title: "Loyalty Cards", src: "Card", gap: true },
        { title: "Subscriptions ", src: "Calendar" },
        { title: "Debts", src: "Debt" },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting", src: "Settings" },
        { title: "Overview", src: "Overview" },
        { title: "Transactions", src: "Transactions" },
        { title: "Loyalty Cards", src: "Card", gap: true },
        { title: "Subscriptions ", src: "Calendar" },
        { title: "Debts", src: "Debt" },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting", src: "Settings" },
        { title: "Overview", src: "Overview" },
        { title: "Transactions", src: "Transactions" },
        { title: "Loyalty Cards", src: "Card", gap: true },
        { title: "Subscriptions ", src: "Calendar" },
        { title: "Debts", src: "Debt" },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting", src: "Settings" },
        { title: "Overview", src: "Overview" },
        { title: "Transactions", src: "Transactions" },
        { title: "Loyalty Cards", src: "Card", gap: true },
        { title: "Subscriptions ", src: "Calendar" },
        { title: "Debts", src: "Debt" },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting", src: "Settings" },
        { title: "Overview", src: "Overview" },
        { title: "Transactions", src: "Transactions" },
        { title: "Loyalty Cards", src: "Card", gap: true },
        { title: "Subscriptions ", src: "Calendar" },
        { title: "Debts", src: "Debt" },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting", src: "Settings" },
        { title: "Overview", src: "Overview" },
        { title: "Transactions", src: "Transactions" },
        { title: "Loyalty Cards", src: "Card", gap: true },
        { title: "Subscriptions ", src: "Calendar" },
        { title: "Debts", src: "Debt" },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting", src: "Settings" },
        { title: "Overview", src: "Overview" },
        { title: "Transactions", src: "Transactions" },
        { title: "Loyalty Cards", src: "Card", gap: true },
        { title: "Subscriptions ", src: "Calendar" },
        { title: "Debts", src: "Debt" },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting asd", src: "Settings" },
    ];
    return (
        <div className="flex">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-black h-screen p-5  pt-8 relative duration-300`}
            >
                <img
                    src="/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex items-center gap-x-4">
                    <img
                        src="/assets/smiley.svg"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        AdeCodes
                    </h1>
                </div>
                <Menu menu={Menus} open={open} />
            </div>

        </div>
    )
}

export default Sidebar