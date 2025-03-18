import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerUser = async (e) => {
    try {
      e.preventDefault();
      console.log(name, username, password);
      const response = await axios.post(
        `http://localhost:3000/api/auth/signup`,
        { name, username, password }
      );
      if (response.status === 201) {
        toast.success("registered succesfully!");
        setName("");
        setUsername("");
        setPassword("");
        navigate("/login");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "something went wrong! please try after sometime"
      );
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full bg-[#251d45]">
      <div className=" bg-[#a18aff] p-5 w-[500px] h-[500px] flex flex-col justify-center rounded-xl gap-2 ">
        <h3 className="self-center text-xl text-white">Sign Up</h3>
        <form className="flex flex-col" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded-3xl outline-none"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br></br>
          <input
            type="email"
            placeholder="Username"
            className="p-2 rounded-3xl outline-none"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br></br>
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-3xl outline-none"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br></br>
          <button
            className="p-2 rounded-3xl bg-[#251d45] text-white "
            type="submit"
          >
            Sign Up
          </button>
          <p className="self-center pt-3">
            already have an account ?{" "}
            <Link to="/login" className="underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
