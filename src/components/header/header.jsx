import styles from "./header.module.css";
import { useAuth } from "../../context";
import Icon from "../icon/icon";
import GoogleOAuthIcon from "../../common/googleOAuthIcon";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const move = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Icon size={"32px"} handleClick={() => move("/", { replace: false })}>
        home
      </Icon>
      <span className={styles.title}>인기투표</span>
      {user ? (
        <img
          className={styles.profile}
          src={user.picture}
          alt="profile"
          onClick={logout}
        />
      ) : (
        <GoogleOAuthIcon />
      )}
    </header>
  );
};

export default Header;
