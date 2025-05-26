import s from "./MainPage.module.scss"
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const MainPage = () => {
    const user = useSelector((state: RootState)=> state.user)

    return (
        <div className={s.mainPageContainer}>
            <div>
                <h1>Привет, {user.first_name}</h1>
            </div>
        </div>
    )
}

export default MainPage;