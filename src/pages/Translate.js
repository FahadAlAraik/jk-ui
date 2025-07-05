import React, { useState, useEffect } from "react";
import ImgUpload from "../ImgUpload";
import TextUpload from "../TextUpload";
import Button from "react-bootstrap/Button";
import Login from "../components/Login";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function Translate(props) {

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
  
    if (!isLoggedIn) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="App">
          {showSelection ? (
            <div className="selection-buttons">
              <Button className="m-2" variant="info" onClick={() => handleSelection(true)}>
                صورة
              </Button>
              <Button className="m-2" variant="info" onClick={() => handleSelection(false)}>
                نص
              </Button>
            </div>
          ) : (
            <>
              {showImgUpload ? (
                <ImgUpload onRestart={handleRestart} />
              ) : (
                <TextUpload onRestart={handleRestart} />
              )}
                <div className="d-flex justify-content-start p-3">
                <Button variant="secondary" onClick={() => window.location.reload()}>
                  ⬅ رجوع
                </Button>
              </div>
            </>
          )}
        </div>
      );
}

export default Translate;