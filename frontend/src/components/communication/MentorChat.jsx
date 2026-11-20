import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:4000", { transports: ["websocket"] });

export default function MentorChat() {
  const { receiverId, receiverRole } = useParams();

  // ✅ Pull current logged-in user info from storage (after login)
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser?._id;
  const role = currentUser?.role;

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (!userId) return;
    socket.emit("join", { userId });

    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [userId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      senderId: userId,
      receiverId,
      senderRole: role,
      receiverRole,
      text: message
    });
    setMessage("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{
        marginBottom: "1rem", height: "300px", overflowY: "auto",
        border: "1px solid #ccc", padding: "0.5rem"
      }}>
        {chat.map((msg, i) => (
          <p key={i} style={{ margin: 0 }}>
            <strong>{msg.senderRole}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type..."
        style={{ padding: "0.5rem", width: "70%" }}
      />
      <button onClick={sendMessage} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
        Send
      </button>
    </div>
  );
}
