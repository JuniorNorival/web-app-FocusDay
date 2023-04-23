import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import SingUp from "./components/SignUp/SignUp.js";
import GlobalStyle from "./styles/GlobalStyles.js";
import Today from "./components/Today/Today.js";
import Header from "./components/Header/Header.js";
import Habits from "./components/Habits/Habits.js";
import UserContext from "./context/UserContext.js";
import { useState } from "react";
import Historic from "./components/Historic/Historic.js";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [habitsToday, setHabitsToday] = useState("");
  const [userData, setUserData] = useState({});
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          progress,
          setProgress,
          habitsToday,
          setHabitsToday,
          userData,
          setUserData,
        }}
      >
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SingUp />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/historico" element={<Historic />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
