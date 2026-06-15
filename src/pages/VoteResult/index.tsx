import { useEffect, useState } from "react";
import api from "../../service/axios";
import { useParams } from "react-router-dom";
import ResultChart from "../../components/resultChart";
import { VoteResultItem } from "../../types/vote";

interface VoteResult {
  candidateId: number;
  candidateName: string;
  humbnailUrl: string;
  totalScore: number;
}

const VoteResult = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VoteResultItem[]>([]);

  const fetchVoteDetail = async () => {
    setLoading(true);
    const res = await api.get<VoteResultItem[]>(`/vote/result/${id}`);
    const results = res.data;
    console.log(results);
    setResult(results);
  };

  useEffect(() => {
    fetchVoteDetail();
  }, []);
  return (
    <div>
      <ResultChart data={result} />
    </div>
  );
};
export default VoteResult;
