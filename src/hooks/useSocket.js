import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { BLACK, INIT, MOVE, MOVE_STATUS, STARTED, WS_URL } from "../utils/constants";
import { sendEvent } from "../utils/ws";
import { movesAtom } from "../store";
import { useRecoilState } from "recoil";
import { Chess } from "chess.js";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const user = useUser();

  useEffect(() => {

    if(!user) return;
    
    const ws = new WebSocket(`${WS_URL}`);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [user]);

  return socket;
};
