import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom, userNameAtom } from "../store";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const setUser = useSetRecoilState(userAtom);

  async function logInUser() {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: "123ABC",
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Resp", data);

      setUser(data);
      navigate("/game/random");
    }
  }

  return (
    <div className="text-white">
      <div className="min-h-screen bg-brown-600">
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
          <h1 className="text-4xl font-bold mb-8 text-center text-green-500 drop-shadow-lg">
            Enter the Game World
          </h1>
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
            <div className="mb-8 md:mb-0 md:mr-8 justify-center flex flex-col">
              <div className="flex items-center justify-center bg-gray-700 text-white px-4 py-2 rounded-md mb-4 cursor-pointer hover:bg-gray-600 transition-colors duration-300">
                <img src="../src/assets/google.png" alt="" className="w-6 h-6 mr-2" />
                Sign in with Google
              </div>
              <div className="flex items-center justify-center bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-600 transition-colors duration-300">
                <img src="../src/assets/github.png" alt="" className="w-6 h-6 mr-2" />
                Sign in with Github
              </div>
            </div>
            <div className="flex flex-col items-center md:ml-8">
              <div className="flex items-center mb-4">
                <div className="bg-gray-600 h-1 w-12 mr-2"></div>
                <span className="text-gray-400">OR</span>
                <div className="bg-gray-600 h-1 w-12 ml-2"></div>
              </div>
              <input
                type="text"
                placeholder="Username"
                className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4 w-full md:w-64"
                onChange={(event) => {setUserName(event.target.value)}}
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300" onClick={logInUser}>
                Enter as guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
