import styles from "./skeletonVote.module.css";

const SkeletonVote = () => (
  <div className={styles.vote}>
    <div className={styles.imageContainer}>
      <div className={styles.skeletonImg} />
      <div className={`${styles.overlay} ${styles.skeletonOverlay}`}>
        <div className={styles.skeletonText} />
        <div className={styles.skeletonTextSmall} />
        <div className={styles.skeletonTextSmall} />
      </div>
    </div>
  </div>
);

export default SkeletonVote;
