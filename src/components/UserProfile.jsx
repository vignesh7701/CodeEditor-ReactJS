import React, {useState} from "react";
import { motion,AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Menus, signOutAction } from "../utils/support";
import { slideUpOut } from "../animations";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state) => state.user?.user);
  const [isMenu, setisMenu] = useState(false)

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-7 h-7 md:w-12 md:h-10 flex items-center justify-center overflow-hidden rounded-lg cursor-pointer bg-sky-600">
        {user?.photoURL ? (
          <>
            <motion.img
              whleHover={{ scale: 1.2 }}
              src={user?.photoURL}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <>
            <p className="text-lg text-textm font-semibold capitalize">
              {user?.email[0]}
            </p>
          </>
        )}
      </div>

      <motion.div onClick={() => setisMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="p-1 md:p-2  rounded-md flex items-center justify-center bg-secondary cursor-pointer"
      >
       { isMenu ?
        <FaChevronUp className="text-textm text-sm" /> :
        <FaChevronDown className="text-textm text-sm" /> }
      </motion.div>

      <AnimatePresence>
        {isMenu && (<motion.div {...slideUpOut} className="rounded-lg absolute bg-secondary top-16 right-0 px-4 py-3 shadow-sm z-10 flex flex-col items-start justify-start gap-4 min-w-[230px]">
          {Menus &&
            Menus.map((menu) => (
              <Link
                to={menu.uri}
                key={menu.id}
                className="text-textm text-md hover:bg-secondary px-2 py-1 w-full rounded-md"
              >
                {menu.name}
              </Link>
            ))}

          <motion.p
            onClick={signOutAction}
            whileTap={{ scale: 0.9 }}
            className="rounded-lg  text-md cursor-pointer bg-secondary  px-2 py-3  shadow-sm z-10 flex flex-col items-start justify-start gap-4 min-w-[230px] text-primaryText"
          >
            Sign Out
          </motion.p>
        </motion.div>)}
   </AnimatePresence>
    </div>
  );
};

export default UserProfile;
