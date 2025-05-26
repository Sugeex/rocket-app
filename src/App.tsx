import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import WebApp from "@twa-dev/sdk";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import { useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    WebApp.ready();

    if (WebApp.initDataUnsafe?.user) {
      const tgUser = WebApp.initDataUnsafe.user;
      console.log("In tg", WebApp.initDataUnsafe.user?.username);

       dispatch(setUser({
        id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
        photo_url: tgUser.photo_url,
        isAuthenticated: true
      }));

      navigate('/main');
    } else {
      console.log("not tg");
    }
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;
