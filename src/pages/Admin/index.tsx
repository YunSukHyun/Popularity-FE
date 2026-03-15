import styles from "./admin.module.css";
import TabNavigation from "../../components/tabNavigation/tabNavigation";

const Admin = () => {
  return (
    <div className={styles.adminContainer}>
      {/* <img
        className={styles.bg}
        src="https://preview.redd.it/honkai-star-rail-login-screen-wallpaper-v0-zf4z6utfezua1.png?auto=webp&s=b4466a91cfbf432791142fdb589af8dccd53afb4"
        alt="bg"
      /> */}
      <TabNavigation />
    </div>
  );
};
export default Admin;
