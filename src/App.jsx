import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "./components/Chessboard";
import { useSocket } from "./hooks/useSocket";

export default function App() {
  const { socket, myColor, gameId } = useSocket()
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  if (!socket || !chess || !board) return <div>Connecting to the backend..</div>;

  if(!myColor) return <div>Waiting for an Apponent...</div>

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
