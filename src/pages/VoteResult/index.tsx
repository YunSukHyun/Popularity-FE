import { useEffect, useState } from "react";
import api from "../../service/axios";
import { useParams } from "react-router-dom";

interface VoteResult {
  candidateId: number;
  candidateName: string;
  humbnailUrl: string;
  totalScore: number;
}

const VoteResult = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const fetchVoteDetail = async () => {
    setLoading(true);
    const res = await api.get(`/vote/result/${id}`);
    const results = res.data;
    console.log(results);
  };

  useEffect(() => {
    fetchVoteDetail();
  }, []);
  return <div>VoteResult</div>;
};
export default VoteResult;
