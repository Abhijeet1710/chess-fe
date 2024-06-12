import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { Chessboard } from "../components/Chessboard";

export default function Game() {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const { socket, myColor, gameId } = useSocket(setChess, setBoard)

  if(!myColor) return <div>Waiting for an Apponent to Join...</div>

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