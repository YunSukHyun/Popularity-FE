import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompclient: Client | null = null;

export const createChatCloudClient = () => {
  if (stompclient) return stompclient;

  stompclient = new Client({
    webSocketFactory: () =>
      new SockJS(`${import.meta.env.VITE_BASE_URL}/ws-chat-cloud`),
    reconnectDelay: 3000,

    debug: (str) => {
      console.log("[STOMP]", str);
    },

    onConnect: () => {
      console.log("STOMP connected");
    },

    onStompError: (frame) => {
      console.error("Broker error:", frame.headers["message"], frame.body);
    },

    onWebSocketError: (event) => {
      console.error("WebSocket error:", event);
    },

    onDisconnect: () => {
      console.log("STOMP disconnected");
    },
  });

  return stompclient;
};
