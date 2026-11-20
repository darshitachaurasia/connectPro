import DailyIframe from "@daily-co/daily-js";
import { useEffect, useRef, useState } from "react";

export default function VideoCall({ sessionId }) {
  const containerRef = useRef(null);
  const [roomUrl, setRoomUrl] = useState(null);
  const [error, setError] = useState(null);

  // For testing: directly set a test room URL
  useEffect(() => {
  const randomRoomName = `test-room-${Math.floor(Math.random() * 1000000)}`;
  setRoomUrl(`https://connectpro.daily.co/${randomRoomName}`);
}, []);


  /*
  // Fetch room URL only if sessionId is valid
  useEffect(() => {
    if (!sessionId) {
      setError("Session ID is missing.");
      return;
    }

    async function fetchRoom() {
      try {
        const res = await fetch(`/api/video/get-room/${sessionId}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch room: ${text || res.status}`);
        }
        const data = await res.json();
        if (!data.roomUrl) throw new Error("Room URL not found in response");
        setRoomUrl(data.roomUrl);
        setError(null);
      } catch (err) {
        setError(err.message);
        setRoomUrl(null);
      }
    }
    fetchRoom();
  }, [sessionId]);
  */

  // Initialize Daily iframe when roomUrl is set
  useEffect(() => {
    if (!roomUrl || !containerRef.current) return;

    const callFrame = DailyIframe.createFrame(containerRef.current, {
      showLeaveButton: true,
      iframeStyle: { width: "100%", height: "100%" },
    });

    callFrame.join({ url: roomUrl });

    // Cleanup on component unmount or roomUrl change
    return () => {
      callFrame.destroy();
    };
  }, [roomUrl]);

  return (
    <>
      {error && (
        <div style={{ color: "red", padding: 10 }}>
          Error loading video call: {error}
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "80vh",
          display: error ? "none" : "block",
          backgroundColor: "#000",
        }}
      />
    </>
  );
}
