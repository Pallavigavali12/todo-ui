import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onlogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost:3000/api/auth/signin`,
        { username, password }
      );
      if (response.status === 201) {
        console.log(response.data);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.details));
        navigate("/");
      }
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message ||
          "something went wrong! please try after sometime"
      );
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full bg-[#251d45]">
      <div className=" bg-[#a18aff] p-5 w-[500px] h-[500px] flex flex-col justify-center gap-3 rounded-xl ">
        <h3 className="self-center text-xl text-white">Sign In</h3>
        <form className="flex flex-col " onSubmit={onlogin}>
          <input
            type="email"
            placeholder="Username"
            className="p-2 rounded-3xl outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <br></br>
          <input
            type="passsword"
            placeholder="Password"
            className="p-2 rounded-3xl outline-none"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br></br>
          <button
            className="p-2 rounded-3xl bg-[#251d45] text-white "
            type="submit"
          >
            Sign In
          </button>
          <p className="self-center pt-3">
            Don't have an account ?{" "}
            <Link to="/register" className="underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
