import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import ImgUpload from "./ImgUpload";
import TextUpload from "./TextUpload";
import Button from "react-bootstrap/Button";
import Login from "./components/Login";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Home from "./pages/Home";
import Demo from "./pages/Demo"
import Contact from "./pages/Contact";
import Translate from "./pages/Translate";


function App() {
  const [showImgUpload, setShowImgUpload] = useState(true);
  const [showSelection, setShowSelection] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // true
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    const controller = new AbortController();

    const checkAuth = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/validate`, {
          withCredentials: true,
          signal: controller.signal,
        });
        setIsLoggedIn(true);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setIsLoggedIn(false); // true
        }
      } finally {
        setLoading(false); // 👈 Stop loading after auth check finishes
      }
    };

    checkAuth();

    return () => controller.abort();
  }, []);

  const handleSelection = (isImage) => {
    setShowImgUpload(isImage);
    setShowSelection(false);
  };

  const handleRestart = () => {
    setShowSelection(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#000",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" variant="light" style={{ width: "4rem", height: "4rem" }} />
      </div>
    );
  }

  // if (!isLoggedIn) {
    
  //   return <Login onLoginSuccess={handleLoginSuccess} />;
  // }

  return (
    <Router>
    <AppNavbar />
    <Routes>
      {/*<Route path="/" element={isLoggedIn ? <Home /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />} /> */}
      <Route path="/" element= {<Home/>}/>
      <Route path="/demo" element={<Demo />} />
      <Route path="/translate" element={<Translate />} />
      {/*<Route path="/about" element={<About />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  </Router>
    // <div className="App">
    //   {showSelection ? (
    //     <div className="selection-buttons">
    //       <Button className="m-2" variant="info" onClick={() => handleSelection(true)}>
    //         صورة
    //       </Button>
    //       <Button className="m-2" variant="info" onClick={() => handleSelection(false)}>
    //         نص
    //       </Button>
    //     </div>
    //   ) : showImgUpload ? (
    //     <ImgUpload onRestart={handleRestart} />
    //   ) : (
    //     <TextUpload onRestart={handleRestart} />
    //   )}
    // </div>
  );
}

export default App;
