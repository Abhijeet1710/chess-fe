import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { Chessboard, isPromoting } from "../components/Chessboard";
import {
  BLACK,
  GAME_ADDED,
  GAME_OVER,
  GAME_TIME,
  INIT,
  JOIN_ROOM,
  MOVE_STATUS,
  STARTED,
  USER_TIMEOUT,
  WAITING,
} from "../utils/constants";
import { movesAtom } from "../store";
import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import Waitopponent from "../components/Waitopponent";
import { useSetRecoilState } from "recoil";
import { Button } from "../components/Button";
import { sendEvent } from "../utils/ws";

export default function Game() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const user = useUser();

  const socket = useSocket();

  const [gameMetadata, setGameMetadata] = useState(null);

  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  const [added, setAdded] = useState(false);
  const [started, setStarted] = useState(false);

  const [player1TimeConsumed, setPlayer1TimeConsumed] = useState(0);
  const [player2TimeConsumed, setPlayer2TimeConsumed] = useState(0);

  const setMoves = useSetRecoilState(movesAtom);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (data) => {
      const event = JSON.parse(data.data);
      console.log(`${event.type} : ${JSON.stringify(event.payload)}`);

      switch (event.type) {
        case WAITING:
          setAdded(true);
          break;

        // #####################################

        case STARTED:
          navigate(`/game/${event.payload.gameId}`);
          setStarted(true);
          setGameMetadata({
            myColor: event.payload.message == BLACK ? "b" : "w",
            blackPlayer: event.payload.blackPlayer,
            whitePlayer: event.payload.whitePlayer,
          });
          break;

        // ######################################

        case MOVE_STATUS:
          try {
            const {
              status,
              move,
              player1TimeConsumed,
              player2TimeConsumed,
              fen,
            } = event.payload;

            if (status) {
              if (isPromoting(chess, move.from, move.to)) {
                chess.move({
                  from: move.from,
                  to: move.to,
                  promotion: "q",
                });
              } else {
                chess.move({ from: move.from, to: move.to });
              }
              setChess(chess);
              setBoard(chess.board());
              console.log(chess.board());
            }
            // setPlayer1TimeConsumed(player1TimeConsumed);
            // setPlayer2TimeConsumed(player2TimeConsumed);

            // setMoves((moves) => [...moves, move]);
            // moveAudio.play();
          } catch (err) {
            console.log("error", err);
          }
          break;

        // ######################################

        case GAME_OVER:
          setResult(message.payload.result);
          break;

        // ######################################

        case GAME_ADDED:
          const wonBy =
            message.payload.status === "COMPLETED"
              ? message.payload.result !== "DRAW"
                ? "CheckMate"
                : "Draw"
              : "Timeout";
          setResult({
            result: message.payload.result,
            by: wonBy,
          });
          chess.reset();
          setMoves(() => {
            message.payload.moves.map((curr_move) => {
              chess.move(curr_move);
            });
            return message.payload.moves;
          });
          setGameMetadata({
            blackPlayer: message.payload.blackPlayer,
            whitePlayer: message.payload.whitePlayer,
          });
          break;

        // ######################################

        case USER_TIMEOUT:
          setResult(message.payload.win);
          break;

        // ######################################

        case GAME_TIME:
          setPlayer1TimeConsumed(message.payload.player1Time);
          setPlayer2TimeConsumed(message.payload.player2Time);
          break;

        // ######################################

        default:
          alert(JSON.stringify(event));
          break;
      }
    };

    // if (gameId !== "random") {
    //   socket.send(
    //     JSON.stringify({
    //       type: JOIN_ROOM,
    //       payload: {
    //         gameId,
    //       },
    //     })
    //   );
    // }
  }, [socket, chess]);

  // useEffect(() => {
  //   if (started) {
  //     const interval = setInterval(() => {
  //       if (chess.turn() === "w") {
  //         setPlayer1TimeConsumed((p) => p + 100);
  //       } else {
  //         setPlayer2TimeConsumed((p) => p + 100);
  //       }
  //     }, 100);
  //     return () => clearInterval(interval);
  //   }
  // }, [started, gameMetadata, user]);

  return (
    <div>
      {!started && (
        <div className="">
          {added ? (
            <div className="text-white">
              <Waitopponent />
            </div>
          ) : (
            gameId === "random" && (
              <Button
                onClick={() => {
                  sendEvent(socket, INIT, { userName: user.userName });
                }}
              >
                Play
              </Button>
            )
          )}
        </div>
      )}
      {started && (
        <Chessboard
          gameId={gameId}
          started={started}
          myColor={gameMetadata.myColor}
          chess={chess}
          board={board}
          socket={socket}
          setBoard={setBoard}
        />
      )}
    </div>
  );
}
