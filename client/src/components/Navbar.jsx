import React, { useEffect, useState } from "react";
import logo from "/logo.png";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setSticky(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        {/* <details>
          <summary>Shop</summary>
          <ul className="p-2 xl:w-52">
            <li>
              <strong>Ground Floor</strong>
              <ul>
                <li>
                  <a>GF01 - SuperMart</a>
                </li>
                <li>
                  <a>GF02 - More</a>
                </li>
              </ul>
            </li>
            <li>
              <strong>First Floor</strong>
              <ul>
                <li>
                  <a>1F01 - Trends</a>
                </li>
                <li>
                  <a>1F02 - Maxx</a>
                </li>
              </ul>
            </li>
            <li>
              <strong>Second Floor</strong>
              <ul>
                <li>
                  <a>2F01 - Puma</a>
                </li>
                <li>
                  <a>2F02 - Nike</a>
                </li>
              </ul>
            </li>
            <li>
              <strong>Third Floor</strong>
              <ul>
                <li>
                  <a>3F01 - Lenovo</a>
                </li>
                <li>
                  <a>3F02 - Pizza</a>
                </li>
              </ul>
            </li>
          </ul>
        </details> */}
        <a href="/store">Stores</a>
      </li>
      <li>
        <a>Support</a>
      </li>
    </>
  );
  return (
    <header className="h-16 max-w-screen-2xl container mx-auto fixed left-0 right-0 transition-all duration-300 ease-in-out">
      <div className={`navbar xl:px-5 ${isSticky ? "shadow-md bg-blue-100 transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img className="w-20" src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* Cart icon */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle mr-3 flex items-center justify-center"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>

          {/* Profile icon */}
          <div>
            <div className="drawer drawer-end z-10">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  <li>
                    <a>Sidebar Item 1</a>
                  </li>
                  <li>
                    <a>Sidebar Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
