import styles from "./header.module.css";
import { useAuth } from "../../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const move = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

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
