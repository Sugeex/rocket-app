import s from "./AuthorizationPage.module.scss";
import TelegramLoginButton from "../../components/TelegramLoginButton";
import Rocket from "../../assets/rocketW.png"

const AuthorizationPage = () => {
  return (
    <div className={s.authorizationPageContainer}>
      <h1>ROCKET APP</h1>
      <div className={s.titleAuth}>
      
      <img width={"350px"} src={Rocket} alt="Rocket" />
      </div>
      <div className={s.welcomeContainer}>
        <div className={s.welcomeText}>
          <h2>Добро пожаловать</h2>
          <p>Для продолжения вам необходимо авторизоваться через телеграмм</p>
        </div>
        <TelegramLoginButton />
        {/* <button className={s.authorizationBtn} onClick={() => WebApp.showAlert('tg working')}>Войти с помощью Telegram</button> */}
      </div>
    </div>
  );
};

export default AuthorizationPage;
