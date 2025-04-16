import styles from "./home.module.css";
import GoogleOAuth from "../../common/googleOAuth";

import { useAuth } from "../../context";

import VoteList from "../../components/voteList/voteList";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className={styles.home}>
      {/* <div className={styles.img}>
        <img
          className={styles.priconne}
          src="image/link_img/priconne.png"
          alt="priconne"
        />

        <img
          className={styles.genshin}
          src="image/link_img/genshin.png"
          alt="genshin"
        />

        <Link to="/starrail">
          <img
            className={styles.starrail}
            src="image/link_img/starrail.png"
            alt="starrail"
          />
        </Link>
      </div> */}

      {!user && <GoogleOAuth />}
      {/* <Link to={"/admin"}>Admin</Link> */}
      <VoteList />
    </div>
  );
};

export default Home;
