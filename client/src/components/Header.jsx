import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between lg:px-[7%] border-b border-gray-200 py-6">
      <Link to="/" className="flex items-center gap-1">
        <img className="w-[7rem]" src={logo} alt="" />
      </Link>
      <div className="flex gap-2 border border-colo-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border border-l border-300" />
        <div>Any week</div>
        <div className="border border-l border-300" />
        <div>Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.4}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div
        onClick={() => setToggleMenu((prev) => !prev)}
        className="flex items-center gap-2 border rounded-full py-2 px-4 hover:shadow-md hover:shadow-gray-300 relative cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.4}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {toggleMenu && (
          <div className="absolute top-14 bg-white shadow-md shadow-gray-400 w-[220px] h-fit right-0 rounded-md z-20 py-2">
            <ul className="flex flex-col ">
              <Link
                to="/wishlist"
                className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
              >
                Wishlist
              </Link>
              <Link
                to="/account"
                className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
              >
                Account
              </Link>
            </ul>
          </div>
        )}
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          {user?.photo ? (
            <img className="w-6 h-6 object-cover" src={user?.photo} alt="" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        {!!user && <div>{user.name}</div>}
      </div>
    </header>
  );
};

export default Header;
