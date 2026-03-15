import styles from "./user.module.css";

interface UserInfo {
  photoURL: string;
  displayName: string;
}

interface UserProps {
  user: UserInfo;
}

const User = ({ user: { photoURL, displayName } }: UserProps) => {
  return (
    <div className={styles.profile}>
      <img className={styles.img} src={photoURL} alt={displayName} />
      <span>{displayName}</span>
    </div>
  );
};

export default User;
