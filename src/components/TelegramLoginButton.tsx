import { useEffect } from "react";
import { BASE_URL } from "../static/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const TelegramLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const styles = {
    container: {
      display: "flex",
      padding: "10px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5dc00",
      fontSize: "large",
      color: "#c29366",
    },
  };

  useEffect(() => {
    const params = getQueryParams();
    if (params.id) {
      handleTelegramAuth(params);
    } else if (params.tgAuthResult) {
      const data = JSON.parse(atob(params.tgAuthResult)); // Расшифровка base64
      handleTelegramAuth(data);
    }
  }, []);

  const getQueryParams = () => {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  };

  //   // Отправка данных Telegram на сервер
  const handleTelegramAuth = async (data: any) => {
    console.log("userData", data);
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const response = await axios.post(`${BASE_URL}/auth`, data);

        if (response.status === 200) {
          const token = response.headers["authorization"];
          if (token) {
            localStorage.setItem("token", token);

            dispatch(setUser({
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              username: data.username,
              photo_url: data.photo_url,
              isAuthenticated: true
            }));


            console.log("Logged in via Telegram");
            // setTimeout(() => navigate("/", { replace: true }), 500);
            navigate("/main", { replace: true });
            setTimeout(() => window.location.reload(), 100);


            return;
          } else {
            console.error("Token not received");
            return;
          }
        }
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts} failed:`, error);

        if (attempts >= maxAttempts) {
            console.error("Telegram login failed after multiple attempts")
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempts)); // Увеличиваем задержку между попытками
        }
      }
    }
  };


  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://telegram.org/js/telegram-widget.js?22`;
    script.async = true;
    script.setAttribute("data-telegram-login", "rockett_Appbot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", `https://sugeex.github.io/rocket-app`);
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-userpic", "false");

    const container = document.getElementById("telegram-login-container");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, []);

  const handleTelegramLogin = () => {
    if ((window as any).Telegram?.Login) {
      (window as any).Telegram.Login.auth(
        { bot_id: "7420086897", request_access: true },
        (data: any) => {
          if (!data) {
            console.error("Telegram login failed");
            return;
          }
          handleTelegramAuth(data);
        }
      );
    } else {
      console.error("Telegram API не загружен");
    }
  };


  return (
    <div className="flex  justify-center items-center">
      <div id="telegram-login-container"></div>



   <button
         id="telegram-login-container"
         style={styles.container}
         onClick={handleTelegramLogin}
       >
         Войти с помошью Telegram
       </button>
    </div>
  );
};

export default TelegramLoginButton;