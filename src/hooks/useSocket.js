import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { BLACK, INIT, MOVE, MOVE_STATUS, STARTED } from "../utils/constants";
import { sendEvent } from "../utils/ws";
import { movesAtom } from "../store";
import { useRecoilState } from "recoil";
import { Chess } from "chess.js";

const WS_URL = "ws://localhost:8080";

const user = {
  userName: "Abhijeet",
  token: "1234kkiioo",
};

export const useSocket = (setChess, setBoard, userName) => {
  const [socket, setSocket] = useState(null);
  const [gameDetails, setGameDetails] = useState(null)
  const [moves, setMoves] = useRecoilState(movesAtom);

  // const user = useUser();

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}`);

    ws.onmessage = (data) => {
      console.log(data);
      const event = JSON.parse(data.data)
      console.log(event);
      console.log(`${event.type} : ${JSON.stringify(event.payload)}`);

      if(event.type == STARTED) {
        setGameDetails({myColor: event.payload.message, gameId: event.payload.gameId})
      } else if(event.type == MOVE_STATUS) {
        console.log("INSSS");
        const chess = new Chess(event.payload.fen)
        setChess(chess)
        setBoard(chess.board())
      }
    };

    ws.onopen = () => {
      setSocket(ws);

      sendEvent(ws, INIT, {userName} )
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
