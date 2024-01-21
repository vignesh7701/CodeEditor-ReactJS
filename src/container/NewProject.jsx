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


const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [isTitle, setIsTitle] = useState("");

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

    return (
      <>
        <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden ">
          <header className="w-full flex items-center justify-between px-12 py-4">
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
                          className="pl-2 py-2 rounded-md bg-transparent text-textm"
                        ></motion.input>
                      </>
                    ) : (
                      <>
                        <motion.p
                          key={"titleLabel"}
                          className="px-3 py-2 text-white text-lg"
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
                          <MdCheck className="text-lg text-textm" />
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
                          <MdEdit className="text-lg text-textm" />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
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
