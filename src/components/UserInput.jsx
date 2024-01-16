import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

const UserInput = ({ label, placeHolder, isPwd,  Icon, setState,setEmailState
}) => {
  const [value, setValue] = useState("");
  const [show, setshow] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleTextChange = (e) => {
    setValue(e.target.value);
    setState(e.target.value);

    if (placeHolder === "Email") {
      const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const status = emailRegular.test(value);
        setEmailValid(status)
        setEmailState(status)
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-900 font-medium">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-2 py-1 bg-slate-400  ${
          !emailValid &&
          placeHolder === "Email" &&
          value.length > 0 &&
          "border-2 border-red-600"
        }`}
      >
        <Icon className="text-black text-lg" />
        <input
          type={isPwd && show ? "password" : "text"}
          placeholder={placeHolder}
          className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-secondary text-sm md:text-md placeholder:text-slate-900"
          Value={value}
          onChange={handleTextChange}
        />
        {isPwd && (
          <motion.div
            onClick={() => setshow(!show)}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            {show ? (
              <FaEye className="text-black " />
            ) : (
              <FaEyeSlash className="text-black " />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserInput;
