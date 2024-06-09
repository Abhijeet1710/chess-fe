import React, { useEffect, useState } from "react";
import { Chessboard } from "./Chessboard";
import { Chess } from "chess.js";

export default function App() {
  const [chess, setChess] = useState(new Chess())
const [board, setBoard] = useState(chess.board())

useEffect(() => {

}, [])

  return (
    <div>
      <Chessboard
        gameId="ABC"
        started={true}
        myColor="w"
        chess={chess}
        board={board}
        socket=""
        setBoard={setBoard}
      />
    </div>
  );
}
