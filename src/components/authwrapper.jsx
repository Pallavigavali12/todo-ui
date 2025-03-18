import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthWrapper({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return children;
}

export default AuthWrapper;
