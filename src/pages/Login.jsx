import React, { useState } from "react";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { useAuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {
  //* birleştirilmiş state
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const { signIn, googleProvider, forgotPassword } = useAuthContext();

  const handleChange = (e) =>
    setInfo({ ...info, [e.target.name]: e.target.value });

  const { email, password } = info;
  const handlesubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="flex justify-center">
      <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
        <div className={`form-container mt-[5vh] w-[380px] h-[500px] `}>
          <form onSubmit={handlesubmit}>
            <h2 className="text-[#cc135c] text-2xl font-[500] text-center tracking-[0.1em] mb-3">
              Log In
            </h2>

            <div className="relative z-0 w-full mb-6 group text-black">
              <input
                name="email"
                className="peer"
                type="email"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label htmlFor="floating_email">Email</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="password"
                className="peer"
                type="password"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label htmlFor="floating_password">Password</label>
            </div>
            <div className="flex justify-between">
              <span className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]" onClick={()=>forgotPassword(email)}>
                Forgot Password
              </span>
              <Link
                className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
                to="/register"
              >
                Sign Up
              </Link>
            </div>
            <div className="flex mt-10 h-15 flex-row-reverse ">
              <button
                className="btn-danger  text-[15px] bg-yellow-400 text-purple-700 hover:bg-orange-200"
                type="submit"
              >
                Login
              </button>
              <button
                className="flex justify-between text-center items-center btn-danger  text-[12px]"
                type="button"
                onClick={()=> googleProvider()}
              >
                with Google
                <GoogleIcon color="currentColor" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login
