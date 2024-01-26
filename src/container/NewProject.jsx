import React, { useEffect } from "react";
import SplitPane from "react-split-pane";
import { FaHtml5, FaCss3, FaJs, FaChevronDown } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import {MdCheck, MdEdit} from "react-icons/md"
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert } from "../components";
import {UserProfile} from "../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [isTitle, setIsTitle] = useState("");
  const [alert, setalert] = useState(true)

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedOutput = `
        <html>
            <head>
             <style>${css}</style>
            </head>
            <body>
            ${html}
            <script>${js} </script>
            
            </body>
        </html>
        
        `;
    setOutput(combinedOutput);
  };

  const saveProgram = async () => {
    const id = `${Date.now()}`
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,

    }

    await setDoc(doc(db, "Projects", id), _doc)
      .then((res) => { setalert(true) })
      .catch((err) => console.log(err));

    setInterval(() => {
      setalert(false)
    },2000);
  }

    return (
      <>
        <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden ">
          <AnimatePresence>
            {alert && <Alert status={"Success"} alertMsg={"Project Saved..."}/>}
          </AnimatePresence>
          <header className="w-full flex items-center justify-between px-2 md:px-12 py-4">
            <div className="flex items-center justify-center gap-2">
              <Link to={"/home/projects"}>
                <img src={Logo} className="w-24 h-auto object-contain" />
              </Link>

              <div className="flex flex-col items-start justify-start">
                <div className="flex items-center justify-center gap-2">
                  <AnimatePresence>
                    {isTitle ? (
                      <>
                        <motion.input
                          key={"Titleinput"}
                          type="text"
                          placeholder="YourTitle"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="pl-2 py-1 rounded-md bg-transparent text-textm border-none"
                        ></motion.input>
                      </>
                    ) : (
                      <>
                        <motion.p
                          key={"titleLabel"}
                          className="px-2 py-1 text-white text-md"
                        >
                          {title}
                        </motion.p>
                      </>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {isTitle ? (
                      <>
                        <motion.div
                          key={"MdCheck"}
                          whileTap={{ scale: 0.9 }}
                          className="cursor-pointer"
                          onClick={() => setIsTitle(false)}
                        >
                          <MdCheck className="text-md text-textm" />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          key={"MdEdit"}
                          whileTap={{ scale: 0.9 }}
                          className="cursor-pointer"
                          onClick={() => setIsTitle(true)}
                        >
                          <MdEdit className="text-md text-textm" />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-center px-2 -mt-1 gap-2">
                  <p className="text-textm text-sm">
                    {user?.displayName
                      ? user?.displayName
                      : `${user?.email.split("@")[0]}`}
                  </p>
                  <motion.p
                    whileTap={{ scale: 0.9 }}
                    className="text-[12px] text-sky-200 bg-secondary rounded-sm px-2 py-[1px] font-medium cursor-pointer"
                  >
                    + Follow
                  </motion.p>
                </div>
              </div>
            </div>

            {user && (
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={saveProgram}
                  whileTap={{ scale: 0.9 }}
                  className="px-3 py-2 bg-textm text-base text-primary font-semibold cursor-pointer rounded-md"
                >
                  Save
                </motion.button>
                <UserProfile />
              </div>
            )}
          </header>
          <div>
            <SplitPane
              split="horizontal"
              minSize={100}
              maxSize={-100}
              defaultSize={"50%"}
            >
              <SplitPane split="vertical" minSize={500}>
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-cyan-500">
                      <FaHtml5 className="text-md text-red-500 " />
                      <p className="text-textm font-medium text-md">HTML</p>
                    </div>

                    <div className="cursor-pointer flex items-center justify-center gap-4 px-3 ">
                      <FcSettings className="text-md text-textm" />
                      <FaChevronDown className="text-md text-textm" />
                    </div>
                  </div>
                  <div></div>
                  <div className="w-full px-2">
                    <CodeMirror
                      value={html}
                      height="600px"
                      extension={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setHtml(value);
                      }}
                      theme={"dark"}
                    ></CodeMirror>
                  </div>
                </div>

                <SplitPane split="vertical" minSize={400}>
                  <div className="w-full h-full flex flex-col items-start justify-start">
                    <div className="w-full flex items-center justify-between">
                      <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-cyan-500">
                        <FaCss3 className="text-md text-blue-600 " />
                        <p className="text-textm font-medium text-md">CSS</p>
                      </div>

                      <div className="cursor-pointer flex items-center justify-center gap-4 px-3 ">
                        <FcSettings className="text-md text-textm" />
                        <FaChevronDown className="text-md text-textm" />
                      </div>
                    </div>
                    <div className="w-full px-2">
                      <CodeMirror
                        value={css}
                        height="600px"
                        extension={[javascript({ jsx: true })]}
                        onChange={(value, viewUpdate) => {
                          setCss(value);
                        }}
                        theme={"dark"}
                      ></CodeMirror>
                    </div>
                  </div>
                  <div className="w-full h-full flex flex-col items-start justify-start">
                    <div className="w-full flex items-center justify-between">
                      <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-cyan-500">
                        <FaJs className="text-md text-yellow-400 " />
                        <p className="text-textm font-medium text-md">JS</p>
                      </div>

                      <div className="cursor-pointer flex items-center justify-center gap-4 px-3 ">
                        <FcSettings className="text-md text-textm" />
                        <FaChevronDown className="text-md text-textm" />
                      </div>
                    </div>
                    <div className="w-full px-2">
                      <CodeMirror
                        value={js}
                        extension={[javascript({ jsx: true })]}
                        height="600px"
                        onChange={(value, viewUpdate) => {
                          setJs(value);
                        }}
                        theme={"dark"}
                      ></CodeMirror>
                    </div>
                  </div>
                </SplitPane>
              </SplitPane>
              <div
                className="bg-white w-full h-full"
                style={{ overflow: "hidden", height: "100%" }}
              >
                <iframe
                  srcDoc={output}
                  title="Result"
                  style={{ border: "none", width: "100%", height: "100%" }}
                />
              </div>
            </SplitPane>
          </div>
        </div>
      </>
    );
};

export default NewProject;
