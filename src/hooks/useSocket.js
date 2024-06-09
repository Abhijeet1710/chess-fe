import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { BLACK, INIT, MOVE, STARTED } from "../utils/constants";
import { sendEvent } from "../utils/ws";

const WS_URL = "ws://localhost:8080";

const user = {
  userName: "Abhijeet",
  token: "1234kkiioo",
};

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [gameDetails, setGameDetails] = useState(null)
  // const user = useUser();

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}`);

    ws.onmessage = (data) => {
      const event = JSON.parse(data.data)
      console.log(`${event.type} : ${JSON.stringify(event.payload)}`);

      if(event.type == STARTED) {
        setGameDetails({myColor: event.payload.message, gameId: event.payload.gameId})
      }
    };

    ws.onopen = () => {
      setSocket(ws);

      sendEvent(ws, INIT, {userName: user.userName} )
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [user]);

  return !gameDetails ? {} : {gameId: gameDetails.gameId, myColor: gameDetails.myColor == BLACK ? "b" : "w", socket};
};
