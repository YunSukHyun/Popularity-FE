import styles from "./alertModal.module.css";

type AlertModalProps = {
  message: string;
  onClose: () => void;
  buttonText?: string;
};

const AlertModal = ({
  message,
  onClose,
  buttonText = "OK",
}: AlertModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
