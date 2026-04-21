import styles from "./selected.module.css";
import CharacterCard from "../characterCard";
import { SelectedCandidate, VoteMethod } from "../../types/vote";
import api from "../../service/axios";
import { Dispatch, SetStateAction, useState } from "react";
import ConfirmModal from "../../common/ConfirmModal";
import AlertModal from "../../common/AlertModal";

interface SelectedProps {
  voteId: string;
  voteMethod: VoteMethod;
  selection: SelectedCandidate[];
  setSelection: Dispatch<SetStateAction<SelectedCandidate[]>>;
}

const scoreGroups = [
  { className: styles.score3, range: [0, 1] },
  { className: styles.score2, range: [1, 3] },
  { className: styles.score1, range: [3, 6] },
];

const Selected = ({
  voteId,
  voteMethod,
  selection,
  setSelection,
}: SelectedProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const openConfirmModal = () => {
    setShowConfirm(true);
  };

  const closeConfirmModal = () => {
    setShowConfirm(false);
  };

  const openAlertModal = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const closeAlertModal = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const handleSubmit = async () => {
    closeConfirmModal();

    try {
      const formData = {
        voteId,
        candidateIds: selection.map((candidate) => candidate.id),
      };
      await api.post(`/vote/submit`, formData);
      openAlertModal("성공적으로 투표하였습니다.");
    } catch (error) {
      console.error("Fail to submit vote: ", error);
      openAlertModal("투표에 실패하였습니다.");
    }
  };

  return (
    <>
      <section className={styles.selected}>
        <div className={styles.afterSelect}>나의 선택</div>
        <div className={styles.toServer}>
          {scoreGroups.map(({ className, range }) => (
            <div className={className} key={className}>
              {selection.slice(range[0], range[1]).map((char) => (
                <CharacterCard
                  key={char.id}
                  id={char.id}
                  voteMethod={voteMethod}
                  name={char.name}
                  url={char.url}
                  selection={selection}
                  setSelection={setSelection}
                />
              ))}
            </div>
          ))}
        </div>
        {Number(voteMethod[6]) === selection.length && (
          <button className={styles.submitBtn} onClick={openConfirmModal}>
            제출
          </button>
        )}
      </section>
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to submit this vote?"
          onConfirm={handleSubmit}
          onCancel={closeConfirmModal}
        />
      )}

      {showAlert && (
        <AlertModal message={alertMessage} onClose={closeAlertModal} />
      )}
    </>
  );
};

export default Selected;
