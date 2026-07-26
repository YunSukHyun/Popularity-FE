import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "./http";

const ongoingVotes = [
  {
    id: 1,
    title: "Star Rail Vote",
    icon: "https://firebasestorage.googleapis.com/v0/b/popularity-measure-creator.firebasestorage.app/o/images%2F%EA%B2%8C%ED%8C%8C%EB%93%9C.webp?alt=media&token=14058e56-2260-4c77-ae3e-7332cc841017",
    endTime: "2026-03-30T12:00:00.000Z",
    participantCount: 123,
  },
  {
    id: 2,
    title: "Genshin Vote",
    icon: "https://firebasestorage.googleapis.com/v0/b/popularity-measure-creator.firebasestorage.app/o/images%2F%EA%B2%8C%ED%8C%8C%EB%93%9C.webp?alt=media&token=14058e56-2260-4c77-ae3e-7332cc841017",
    endTime: "2026-03-25T12:00:00.000Z",
    participantCount: 88,
  },
];

const closedVotes = [
  {
    id: 3,
    title: "Closed Vote",
    icon: "https://firebasestorage.googleapis.com/v0/b/popularity-measure-creator.firebasestorage.app/o/images%2F%EA%B2%BD%EB%A5%98.webp?alt=media&token=882a6454-c554-46b8-83e4-ed23a3c1fc5d",
    endTime: "2026-02-01T12:00:00.000Z",
    participantCount: 201,
  },
];

const voteDetail = {
  id: 1,
  title: "Star Rail Vote",
  background: "https://via.placeholder.com/1200x800",
  endTime: "2026-03-30T12:00:00.000Z",
  voteMethod: "SELECT3",
  candidates: [
    {
      id: 101,
      name: "게파드",
      thumbnail: "https://via.placeholder.com/88x88",
    },
    {
      id: 102,
      name: "브로냐",
      thumbnail: "https://via.placeholder.com/88x88",
    },
    {
      id: 103,
      name: "나찰",
      thumbnail: "https://via.placeholder.com/88x88",
    },
  ],
};

export const handlers = [
  http.get(`${API_BASE_URL}/vote/list`, ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");

    if (type === "closed") {
      return HttpResponse.json(closedVotes);
    }

    return HttpResponse.json(ongoingVotes);
  }),

  http.get(`${API_BASE_URL}/vote/detail/:id`, ({ params }) => {
    return HttpResponse.json({
      ...voteDetail,
      id: Number(params.id),
    });
  }),

  http.post(`${API_BASE_URL}/vote/submit`, async ({ request }) => {
    const body = (await request.json()) as {
      voteId: number;
      candidateIds: number[];
    };

    if (!body.candidateIds?.length) {
      return HttpResponse.json(
        { message: "No candidates selected." },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      message: "Vote submitted successfully.",
    });
  }),
];
