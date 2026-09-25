// import React from "react";
import React, { useState } from "react";
import Search from "./Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/User/user-action";
import toast from "react-hot-toast";
import { propertyAction } from "../../store/Property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";
import "../../css/AiTripPlanner.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const logoutUser = () => {
    dispatch(logout());
    toast.success("User has loggedout successfully");
    navigate("/");
  };

  const refreshFunction = () => {
    dispatch(propertyAction.updateSearchParams({}));
    dispatch(getAllProperties());
  };

  return (
    <>
      <nav className="header row sticky-top ">
        <Link to="/">
          <img
            src="/assets/Alogo.png"
            alt="logo"
            className="Alogo"
            onClick={refreshFunction}
          />
        </Link>
        {isHomePage && (
          <div className="search_filter">
            <Search />
            <Filter />

            <Link to="/ai-trip-planner" className="ai-trip-link">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>Trip Genie</span>
            </Link>
          </div>
        )}
        {!isAuthenticated && !user && (
          <Link to="/login" className="login-tip">
            <span className="material-symbols-outlined web_logo">
              account_circle
            </span>
            <span className="login-tip-text">
              You are not logged in. Please login
            </span>
          </Link>
        )}

        {/* {isAuthenticated && user && (
          <div className="dropdown">
            <button
              className="btn material-symbols-outlined web_logo dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.avatar.url && (
                <img src={user.avatar.url} className="user-img" alt="icon" />
              )}
              {!user.avatar.url && "account_circle"}
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to="/profile">
                  {" "}
                  My Account
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )} */}

        {/* {isAuthenticated && user && (
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user?.avatar?.url ? (
                <img src={user.avatar.url} className="user-img" alt="profile" />
              ) : (
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              )}
            </button>

            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/profile">
                  My Account
                </Link>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )} */}

        {isAuthenticated && user && (
          <div className="dropdown">
            <button
              type="button"
              className=" dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setShowMenu(!showMenu)}
            >
              {user?.avatar?.url ? (
                <img src={user.avatar.url} className="user-img" alt="profile" />
              ) : (
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              )}
              <span className="dropdown-arrow">▼</span>
            </button>

            {showMenu && (
              <ul className="profile-menu">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    My Account
                  </Link>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
    </>
  );
};
export default Header;

////  profile icon dropdown styling deect
