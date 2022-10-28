import { Header } from "../components/Header";

import { useContext, useState } from "react";
import { Login } from "../components/Login";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { Dashboard } from "../components/Dashboard";

export default function Home() {
  const { userAuthenticate } = useContext(AuthContextProvider);

  return <>{userAuthenticate ? <Dashboard /> : <Login />}</>;
}
