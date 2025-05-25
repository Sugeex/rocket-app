import { Route, Routes } from "react-router-dom";
import "./App.scss";
import WebApp from "@twa-dev/sdk";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    WebApp.ready();

    if (WebApp.initDataUnsafe?.user) {
      console.log("In tg", WebApp.initDataUnsafe.user?.username);
    } else {
      console.log("not tg");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
    </Routes>
  );
}

export default App;
