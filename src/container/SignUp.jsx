import React, { useState } from "react";
import { Logo } from "../assets";
import UserInput from "../components/userInput";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [emailState, setEmailState] = useState(false);
  const [isLogin, setisLogin] = useState(false);

  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        alt="logo"
        className="object-contain w-12 opacity-50 h-auto"
      />

      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-md md:text-xl text-primaryText">
          Sign up here!
        </p>
        <div className="px-4 w-3/4 md:w-auto py-4 rounded-lg bg-sky-50 shadow-md flex flex-col items-center jusity-center gap-6">
          <UserInput
            label="Email"
            placeHolder="Email"
            isPwd={false}
            key="Email"
            setState={setemail}
            Icon={FaEnvelope}
            setEmailState={setEmailState}
          />
          <UserInput
            label="Password"
            placeHolder="Password"
            isPwd={true}
            key="Pwd"
            setState={setpwd}
            Icon={RiLockPasswordFill}
          />

          {!isLogin ? (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-1 rounded-md hover:bg-sky-700 bg-sky-900"
            >
              <p className="text-md text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-1 rounded-md hover:bg-sky-700 bg-sky-900"
            >
              <p className="text-md text-white">Login</p>
            </motion.div>
          )}

          {!isLogin ? (
            <p className="text-xs text-black flex items-center justify-center gap-1">
              Already have an account !
              <span
                onClick={() => setisLogin(!isLogin)}
                className="text-slate-950 font-bold underline cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-xs text-black flex items-center justify-center gap-1">
              Don't have an account !
              <span
                onClick={() => setisLogin(!isLogin)}
                className="text-slate-950 font-bold underline cursor-pointer"
              >
                Create Here
              </span>
            </p>
          )}

          <motion.div
            className="flex items-center  justify-center py-3 gap-4 bg-slate-900 backdrop:blur-md w-full cursor-pointer rounded-lg hover:bg-slate-700"
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="text-xl text-white" />
            <p className="text-sm md:text-md text-textm font-medium">Sign in with Github</p>
          </motion.div>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] text-slate-700 rounded-sm w-24"></div>
            <p className="text-sm ">OR</p>
            <div className="h-[1px] text-slate-700 rounded-sm w-24"></div>
          </div>

          <motion.div
            className="flex items-center justify-center py-3 gap-4 bg-blue-800 backdrop:blur-md w-full cursor-pointer rounded-lg hover:bg-blue-700"
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className="text-xl" />
            <p className="text-sm md:text-md text-textm font-medium">Sign in with Google</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
