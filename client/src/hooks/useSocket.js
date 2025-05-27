import { useEffect, useState } from "react";
import io from "socket.io-client";

const API_BASE = "http://localhost:5000";

export const useSocket = (onDataResponse, onCalculationResult) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(API_BASE);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      newSocket.emit("join_room", { room: "main" });
    });

    newSocket.on("disconnect", () => setIsConnected(false));
    newSocket.on("data_response", onDataResponse);
    newSocket.on("calculation_result", onCalculationResult);

    return () => newSocket.close();
  }, []);

  return { socket, isConnected };
};
