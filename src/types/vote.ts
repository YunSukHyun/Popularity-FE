export type VoteMethod = "SELECT1" | "SELECT3" | "SELECT6";

export interface Candidate {
  id: string;
  name: string;
  thumbnailUrl: string;
}

export interface VoteInfo {
  id: string;
  title: string;
  backgroundUrl: string;
  endTime: string;
  voteMethod: VoteMethod;
  candidates: Candidate[];
}

export interface VoteListItem {
  id: string;
  title: string;
  icon: string;
  endTime: string;
  participantCount: number;
}

export interface SelectedCandidate {
  id: string;
  name: string;
  url: string;
}
