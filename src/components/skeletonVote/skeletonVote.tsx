import styles from "./skeletonVote.module.css";

const SkeletonVote = () => (
  <div className={styles.vote}>
    <div className={styles.imageContainer}>
      <div className={styles.skeletonImg} />
    </div>
  </div>
);

export default SkeletonVote;
