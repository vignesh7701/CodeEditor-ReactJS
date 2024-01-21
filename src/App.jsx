import React, { useEffect,useState } from "react";
import { Navigate, Route,Routes, useNavigate } from "react-router-dom";
import { Home, NewProject } from "./container";
import { auth } from "./config/firebase.config";
import Loader from "./components/Loader";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config/firebase.config";
const App = () => {

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
  
    const unsubscribe = auth.onAuthStateChanged((userCred) => { 
      if (userCred) { 
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).
          then(() => {
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
            
        })
      }
      else {
        navigate("home/auth", { replace: true });
      }
      setInterval(() => {
        setisLoading(false)
      }, 2000);
    })
    return () => unsubscribe();
  },[])
  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center  overflow-hidden">
          <Loader />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start  overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProject" element={<NewProject />} />
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
