export type VoteMethod = "SELECT1" | "SELECT2" | "SELECT3";

export interface Candidate {
  id: number;
  name: string;
  thumbnail: string;
}

export interface VoteInfo {
  id: number;
  title: string;
  background: string;
  endTime: string;
  voteMethod: VoteMethod;
  candidates: Candidate[];
}

export interface VoteListItem {
  id: number;
  title: string;
  icon: string;
  endTime: string;
  participantCount: number;
}

export interface SelectedCandidate {
  id: number;
  name: string;
  url: string;
}
