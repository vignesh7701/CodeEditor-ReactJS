import React, { useState } from "react";
import {
  FaCircleArrowLeft,
  FaCircleArrowRight,
} from "react-icons/fa6";
import { BsSearch} from "react-icons/bs"
import { MdHome } from "react-icons/md";
import { motion } from "framer-motion";
import { Link,Routes,Route } from "react-router-dom";
import Logo  from "../assets/logo.png";
import Projects from "./Projects";
import SignUp from "./SignUp";
import {UserProfile} from "../components"
import { useSelector } from "react-redux";

const Home = () => {
  const [sideMenu, setSideMenu] = useState(true);
   const user  = useSelector((state) => state.user?.user)
  return (
    <>
      <div
        className={` ${
          sideMenu ? "w-2" : "flex-[.3] xl:flex-[.3]"
        }  min-h-screen max-h-screen relative bg-secondary px-3 py-4 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out z-10`}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setSideMenu(!sideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer "
        >
          {sideMenu ? (
            <FaCircleArrowRight className=" text-white text-xl" />
          ) : (
            <FaCircleArrowLeft className="text-white text-xl" />
          )}
        </motion.div>

        <div className=" overflow-hidden w-full flex flex-col gap-4">
          <Link to={"/home"}>
            <img src={Logo} alt="logo" className="object-contain w-28 h-auto" />
          </Link>
          <Link to={"/newProject"}>
            <div className=" px-2 py-2 flex items-center justify-center rounded-md border group border-white cursor-pointer group hover:border-cyan-50">
              <p className="text-xs md:text-lg text-white group-hover:text-sky-200 capitalize">
                Start Coding
              </p>
            </div>
          </Link>
          {user && (
            <Link
              to={"/home/projects"}
              className="flex items-center justify-center gap-2 xl:gap-6"
            >
              <MdHome className="text-primaryText text-md lg:text-xl" />
              <p className="text-md lg:text-xl text-primaryText">Home</p>
            </Link>
          )}
        </div>
      </div>

      <div className=" flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start  px-2 md:px-12 py-2 md:py-12">
        <div className=" xs:w-full flex items-center justify-between gap-3 ">
          <div className="border-white border-2 bg-secondary w-full py-2 ml-6 px-3 md:px-4 md:py-3 rounded-md flex items-center justify-center gap-3">
            <BsSearch className="text-sm text-primaryText" />
            <input
              type="text"
              className="flex-1 md:px-4 md:py-1 text-sm md:text-lg bg-transparent outline-none border-none text-primaryText placeholder:text-cyan-100"
              placeholder="Search here..."
            />
          </div>

          {!user && (
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="flex items-center justify-center gap-3"
            >
              <Link
                to={"/home/auth"}
                className="bg-sky-900 md:px-6 md:py-2 px-2 py-1 rounded-md border-white border-2 text-white text-sm md:text-lg cursor-pointer hover:bg-blue-300 font-bold"
              >
                SignUp
              </Link>
            </motion.div>
          )}

          {user && <UserProfile/>}
        </div>
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
