import { useEffect, useState } from "react";
import styles from "./adminVoteList.module.css";
import api from "../../service/axios";
import AdminVote from "../adminVote";
import ConfirmModal from "../../common/ConfirmModal";
import AlertModal from "../../common/AlertModal";

interface AdminVoteItem {
  id: number;
  title: string;
  endTime: string;
  participantCount: number;
}

const AdminVoteList = () => {
  const [votes, setVotes] = useState<AdminVoteItem[]>([]);
  const [selectedVoteId, setSelectedVoteId] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const openDeleteModal = (id: number) => {
    setSelectedVoteId(id);
  };

  const closeDeleteModal = () => {
    setSelectedVoteId(null);
  };

  const handleDelete = async () => {
    if (selectedVoteId == null) return;

    try {
      await api.delete(`/vote/delete/${selectedVoteId}`);
      setVotes((prev) => prev.filter((vote) => vote.id !== selectedVoteId));
      setShowAlert(true);
      closeDeleteModal();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await api.get<AdminVoteItem[]>(`/vote/list`);
      setVotes(response.data);
    } catch (error) {
      console.error("Error fetching votes:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);
  return (
    <section className={styles.votes}>
      {votes.map(({ id, title, endTime, participantCount }) => (
        <AdminVote
          key={id}
          id={id}
          title={title}
          endTime={endTime}
          participantCount={participantCount}
          onDelete={openDeleteModal}
        />
      ))}
      {selectedVoteId !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this vote?"
          onConfirm={handleDelete}
          onCancel={closeDeleteModal}
        />
      )}
      {showAlert && (
        <AlertModal
          message="투표가 삭제되었습니다."
          onClose={() => setShowAlert(false)}
        />
      )}
    </section>
  );
};
export default AdminVoteList;
