import styles from "./home.module.css";
import GoogleOAuth from "../../common/googleOAuth";

import { useAuth } from "../../context";

import VoteList from "../../components/voteList";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className={styles.home}>
      <Link to={"/admin"}>Admin</Link>
      <VoteList />
      {!user && <GoogleOAuth />}
    </div>
  );
};

export default Home;
