import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { Chessboard } from "../components/Chessboard";

export default function Game({userName}) {
  console.log("Username", userName);

  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const { socket, myColor, gameId } = useSocket(setChess, setBoard, userName)

  if(!myColor) return <div>Waiting for an Opponent to Join...</div>

  return (
    <div>
      <Chessboard
        gameId={gameId}
        started={true}
        myColor={myColor}
        chess={chess}
        board={board}
        socket={socket}
        setBoard={setBoard}
      />
    </div>
  );
}