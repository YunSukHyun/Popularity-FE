import styles from "./chatCloud.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { IMessage } from "@stomp/stompjs";

import type { ChatCloudMessage } from "../../types/chatCloud";
import { createChatCloudClient } from "../../service/chatCloudClient";

interface ChatCloudProps {
  pageId: string;
  userId: string;
  nickname: string;
}

const CLOUD_LIFETIME = 6000;

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const ChatCloud = ({ pageId, userId, nickname }: ChatCloudProps) => {
  const [input, setInput] = useState("");
  const [clouds, setClouds] = useState<ChatCloudMessage[]>([]);
  const clientRef = useRef(createChatCloudClient());
  const timeoutsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const client = clientRef.current;

    if (!client.active) {
      client.activate();
    }

    const onConnect = () => {
      client.subscribe(`/topic/page/${pageId}`, (message: IMessage) => {
        const body: ChatCloudMessage = JSON.parse(message.body);

        const cloud: ChatCloudMessage = {
          ...body,
          x: randomBetween(8, 72),
          y: randomBetween(15, 70),
        };

        setClouds((prev) => [...prev, cloud]);

        const timeoutId = window.setTimeout(() => {
          setClouds((prev) => prev.filter((item) => item.id !== cloud.id));
          delete timeoutsRef.current[cloud.id];
        }, CLOUD_LIFETIME);

        timeoutsRef.current[cloud.id] = timeoutId;
      });
    };

    client.onConnect = onConnect;

    return () => {
      Object.values(timeoutsRef.current).forEach((id) => clearTimeout(id));
      timeoutsRef.current = {};
      client.deactivate();
    };
  }, [pageId]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const client = clientRef.current;
    if (!client.connected) return;

    client.publish({
      destination: "/pub/cloud/send",
      body: JSON.stringify({
        pageId,
        userId,
        nickname,
        text,
      }),
    });

    setInput("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cloudLayer}>
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className={styles.cloud}
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
            }}
          >
            <span className={styles.nickname}>{cloud.nickname}</span>
            <span className={styles.text}>{cloud.text}</span>
          </div>
        ))}
      </div>

      <div className={styles.inputBar}>
        <input
          className={styles.input}
          value={input}
          maxLength={80}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className={styles.sendButton}
          onClick={sendMessage}
          disabled={!canSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatCloud;
