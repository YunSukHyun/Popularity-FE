import styles from "./skeletonChar.module.css";

const SkeletonChar = () => {
  return (
    <div className={styles.imgBox}>
      <div className={styles.skeletonCard} />
      <div className={styles.skeletonText} />
    </div>
  );
};
export default SkeletonChar;
