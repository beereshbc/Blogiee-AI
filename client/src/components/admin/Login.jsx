import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setToken, token, axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });
      if (data.success) {
        console.log(data);

        toast.success("Logged in!");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["authorization"] = data.token;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="border p-6 shadow w-full max-w-sm rounded-xl shadow-primary/10  ">
          <div className="flex flex-col text-gray-600">
            <div className=" font-semibold text-center">
              <p className="text-2xl">
                <span className="text-primary font-semibold">Admin</span> Login
              </p>
              <p className="font-light">
                Enter your credentials to access the admin panel
              </p>
            </div>
            <form
              onSubmit={submitHandler}
              className="flex gap-4 flex-col"
              action=""
            >
              <label htmlFor="">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none border-b-2 mb-2"
                type="text"
                value={email}
                placeholder="Enter your email"
              />

              <label htmlFor="">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none border-b-2 mb-2"
                type="text"
                value={password}
                placeholder="Enter your password"
              />

              <button className="bg-primary py-1.5 px-6 rounded-lg text-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
