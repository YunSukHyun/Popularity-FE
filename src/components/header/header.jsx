import styles from "./header.module.css";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const move = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <span
        className={styles.title}
        onClick={() => move("/", { replace: false })}
      >
        인기투표
      </span>
      {user ? (
        <img
          className={styles.profile}
          src={user.picture}
          alt="profile"
          onClick={logout}
        />
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
