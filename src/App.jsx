import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { Loader } from "./components/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { Landing } from "./pages/Landing";
import Game from "./pages/Game";
import { Login } from "./pages/Login";
import { GameHandler } from "./pages/GameHandler";


export default function App() {
  return (
    <div className="min-h-screen bg-stone-800">
      <RecoilRoot>
        <Suspense fallback={<Loader />}>
          <AuthApp />
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

function AuthApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout children={<Landing />} />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/game/:gameId"
          element={<Layout children={<GameHandler />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}