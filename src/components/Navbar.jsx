import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/Authslice";
import Spinner from "./Spinner";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);

  const onlogout = async () => {
    await dispatch(logout());
    await dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <nav className="navbar">
          <ul className="navbar-item">
            <li className="title">
              <Link to="/">Bütçe Yönetimi</Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link to="/login">Giriş</Link>
                </li>
                <li>
                  <Link to="/register">Kaydol</Link>
                </li>
              </>
            ) : (
              <li>
                <span>Hoş geldin, {user.displayName}</span>
                <button onClick={onlogout}>
                  <FaSignOutAlt />
                  Çıkış
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
