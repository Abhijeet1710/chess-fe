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
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "../components/Button";
import { sendEvent } from "../utils/ws";
import ShowMoves from "../components/ShowMoves";

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

  const [movesToShow, setMovesToShow] = useState([])

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
              success,
              move,
              player1TimeConsumed,
              player2TimeConsumed,
              fen,
            } = event.payload;

            if (success) {
              if (isPromoting(chess, move.from, move.to)) {
                chess.move({
                  from: move.from,
                  to: move.to,
                  promotion: "q",
                });
                setMovesToShow([...movesToShow, {
                  from: move.from,
                  to: move.to,
                  promotion: "q",
                }])

              } else {
                // setMovesToShow([...movesToShow, { from: move.from, to: move.to }])
                movesToShow.push({ from: move.from, to: move.to })
                chess.move({ from: move.from, to: move.to });
              }
              setChess(chess);
              setBoard(chess.board());
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
    <div className="md:px-40 flex flex-col md:flex-row md:gap-24">
      <div>
        {!started && (
          <div className="pt-40 flex justify-center align-middle">
            {added ? (
              <div className="text-white">
                <Waitopponent />
              </div>
            ) : (
              gameId === "random" && (
                <div
                  className="font-bold text-white text-4xl bg-green-500 px-24 py-8 rounded cursor-pointer"
                  onClick={() => {
                    console.log("UserName", user.userName);
                    sendEvent(socket, INIT, { userName: user.userName });
                  }}
                >
                  Play
                </div>
              )
            )}
          </div>
        )}
        {started && (
          <Chessboard
            gameId={gameId}
            started={started}
            myColor={gameMetadata.myColor}
            players={gameMetadata}
            chess={chess}
            board={board}
            socket={socket}
            setBoard={setBoard}
          />
        )}
      </div>
      <div className="px-6 md:bg-[#302F2A] md:px-2 text-white">
        <h1 className="my-3">Moves</h1>
        <ShowMoves moves={movesToShow}/>
      </div>
    </div>
  );
}
