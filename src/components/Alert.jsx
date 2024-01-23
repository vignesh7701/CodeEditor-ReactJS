import React from 'react'
import { motion } from "framer-motion"
import { slideUpOut } from '../animations'

const Alert = (status,alertMsg) => {
  return (
    <motion.div {...slideUpOut} className="fixed top-12 right-12 z-10">
      {status === "Success" && (
        <div className="px-2 py-1 rounded-md bg-emerald-300 shadow-md shadow-sky-400">
          <p className="text-sm text-primary">{alertMsg}</p>
        </div>
      )}

      {status === "Warning" && (
        <div className="px-2 py-1 rounded-md bg-yellow-200 shadow-md shadow-sky-400">
          <p className="text-sm text-primary">{alertMsg}</p>
        </div>
      )}

      {status === "Danger" && (
        <div className="px-2 py-1 rounded-md bg-red-400 shadow-md shadow-sky-400">
          <p className="text-sm text-primary">{alertMsg}</p>
        </div>
      )}
    </motion.div>
  );
}

export default Alert