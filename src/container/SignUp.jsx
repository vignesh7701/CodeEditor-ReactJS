import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signinGithub, signinGoogle } from "../utils/support";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { fadeInOut } from "../animations";
import { auth } from "../config/firebase.config";

const SignUp = () => {
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [emailState, setEmailState] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [alert, setalert] = useState(false);
  const [alertmsg, setalertmsg] = useState("");

  const createUser = async () => {
    if (emailState) {
      await createUserWithEmailAndPassword(auth, email, pwd)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginwithEmailandPwd = async () => {
    if (emailState) {
      await signInWithEmailAndPassword(auth, email, pwd)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("user-not-found")) {
            setalert(true);
            setalertmsg("Invalid id: User not found");
          } else if (err.message.includes("wrong-password")) {
            setalert(true);
            setalertmsg("Password Mismatch");
          } else {
            setalert(true);
            setalertmsg("Temporarily disabled due to many accounts");
          }

          setInterval(() => {
            setalert(false);
          }, 4000);
        });
    }
  };

  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        alt="logo"
        className="object-contain w-12 opacity-50 h-auto"
      />

      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-3 md:py-7 text-md md:text-xl text-primaryText">
          Sign up here!
        </p>
        <div className="px-4 w-53 md:w-auto py-4 rounded-lg bg-sky-50 shadow-md flex flex-col items-center jusity-center gap-6">
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPwd={false}
            key="Email"
            setState={setemail}
            Icon={FaEnvelope}
            setEmailState={setEmailState}
          />
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPwd={true}
            key="Pwd"
            setState={setpwd}
            Icon={RiLockPasswordFill}
          />

          <AnimatePresence>
            {alert && (
              <motion.p
                key={"Alert Message"}
                {...fadeInOut}
                className="text-red-500"
              >
                Alert!
              </motion.p>
            )}
          </AnimatePresence>

          {!isLogin ? (
            <motion.div
              onClick={createUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center  w-60  md:w-96 py-2 rounded-md hover:bg-sky-700 bg-sky-900"
            >
              <p className="text-md xl:text-lg  text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginwithEmailandPwd}
              whileTap={{ scale: 0.9 }}
              className="flex cursor-pointer items-center justify-center  w-60  md:w-96  py-2 rounded-md hover:bg-sky-700 bg-sky-900"
            >
              <p className="text-md xl:text-lg  text-white">Login</p>
            </motion.div>
          )}

          {!isLogin ? (
            <p className="text-xs  text-black flex items-center justify-center gap-1">
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
            onClick={signinGithub}
            className="flex items-center   justify-center py-2 gap-4 bg-slate-900 backdrop:blur-md  w-60  md:w-96  cursor-pointer rounded-lg hover:bg-slate-700"
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="text-xl text-white" />
            <p className="text-sm md:text-lg text-textm font-medium">
              Sign in with Github
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] text-slate-700 rounded-sm w-24"></div>
            <p className="text-sm ">OR</p>
            <div className="h-[1px] text-slate-700 rounded-sm w-24"></div>
          </div>

          <motion.div
            onClick={signinGoogle}
            className="flex items-center justify-center py-2 gap-4 bg-blue-800 backdrop:blur-md  w-60  md:w-96  cursor-pointer rounded-lg hover:bg-blue-700"
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className="text-xl" />
            <p className="text-sm md:text-lg text-textm font-medium">
              Sign in with Google
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
