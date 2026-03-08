import styles from "./googleOAuthIcon.module.css";

const GoogleOAuthIcon = () => {
  const googleLogin = () => {
    const width = 500;
    const height = 600;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;

    window.open(
      `${import.meta.env.VITE_BASE_URL}/auth/login/google`,
      "",
      windowFeatures
    );
  };

  return (
    <div className={styles.outline} onClick={googleLogin}>
      <img className={styles.google} src="image/Google.png" alt="google" />
    </div>
  );
};
export default GoogleOAuthIcon;
