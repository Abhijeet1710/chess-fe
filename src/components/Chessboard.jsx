import { MouseEvent, memo, useEffect, useState } from 'react';
import LegalMoveIndicator from './LegalMoveIndicator';
import ChessSquare from './ChessSquare';
import LetterNotation from './LetterNotation';
import NumberNotation from './NumberNotation';
import { drawArrow } from '../utils/canvas';
import useWindowSize from '../hooks/useWindowSize';


import Confetti from 'react-confetti';
// import MoveSound from '/move.wav';
// import CaptureSound from '/capture.wav';

import { useRecoilState } from 'recoil';
import { isBoardFlippedAtom, movesAtom, userSelectedMoveIndexAtom } from '../store';
import { sendEvent } from '../utils/ws';
import { MOVE, MOVE_STATUS } from '../utils/constants';

export function isPromoting(chess, from, to) {
  if (!from) {
    return false;
  }

  const piece = chess.get(from);

  if (piece?.type !== 'p') {
    return false;
  }

  if (piece.color !== chess.turn()) {
    return false;
  }

  if (!['1', '8'].some((it) => to.endsWith(it))) {
    return false;
  }

  return true
}

export const Chessboard = memo(({
  gameId,
  started,
  myColor,
  chess,
  board,
  socket,
  setBoard,
}) => {
  const { height, width } = useWindowSize();

  const [isFlipped, setIsFlipped] = useRecoilState(isBoardFlippedAtom);
  const [userSelectedMoveIndex, setUserSelectedMoveIndex] = useRecoilState(
    userSelectedMoveIndexAtom,
  );
  const [moves, setMoves] = useRecoilState(movesAtom);
  const [lastMove, setLastMove] = useState(
    null,
  );
  const [rightClickedSquares, setRightClickedSquares] = useState([]);
  const [arrowStart, setArrowStart] = useState(null);

  const [from, setFrom] = useState(null);
  const isMyTurn = myColor === chess.turn();
  const [legalMoves, setLegalMoves] = useState([]);

  const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const [canvas, setCanvas] = useState(null);
  const OFFSET = 100;
  const boxSize =
    width > height
      ? Math.floor((height - OFFSET) / 8)
      : Math.floor((width - OFFSET) / 8);
  const [gameOver, setGameOver] = useState(false);
  // const moveAudio = new Audio(MoveSound);
  // const captureAudio = new Audio(CaptureSound);

  const handleMouseDown = (
    e,
    squareRep,
  ) => {
    e.preventDefault();
    if (e.button === 2) {
      setArrowStart(squareRep);
    }
  };

  useEffect(() => {
    if (myColor === 'b') {
      setIsFlipped(true);
    }
  }, [myColor]);

  const clearCanvas = () => {
    setRightClickedSquares([]);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleRightClick = (squareRep) => {
    if (rightClickedSquares.includes(squareRep)) {
      setRightClickedSquares((prev) => prev.filter((sq) => sq !== squareRep));
    } else {
      setRightClickedSquares((prev) => [...prev, squareRep]);
    }
  };

  const handleDrawArrow = (squareRep) => {
    if (arrowStart) {
      const stoppedAtSquare = squareRep;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawArrow({
            ctx,
            start: arrowStart,
            end: stoppedAtSquare,
            isFlipped,
            squareSize: boxSize,
          });
        }
      }
      setArrowStart(null);
    }
  };

  const handleMouseUp = (e, squareRep) => {
    e.preventDefault();
    if (!started) {
      return;
    }
    if (e.button === 2) {
      if (arrowStart === squareRep) {
        handleRightClick(squareRep);
      } else {
        handleDrawArrow(squareRep);
      }
    } else {
      clearCanvas();
    }
  };

  useEffect(() => {
    clearCanvas();
    const lMove = moves.at(-1);
    if (lMove) {
      setLastMove({
        from: lMove.from,
        to: lMove.to,
      });
    } else {
      setLastMove(null);
    }
  }, [moves]);

  useEffect(() => {
    if (userSelectedMoveIndex !== null) {
      const move = moves[userSelectedMoveIndex];
      setLastMove({
        from: move.from,
        to: move.to,
      });
      chess.load(move.after);
      setBoard(chess.board());
      return;
    }
  }, [userSelectedMoveIndex]);

  // useEffect(() => {
  //   if (userSelectedMoveIndex !== null) {
  //     chess.reset();
  //     moves.forEach((move) => {
  //       chess.move({ from: move.from, to: move.to });
  //     });
  //     setBoard(chess.board());
  //     setUserSelectedMoveIndex(null);
  //   } else {
  //     setBoard(chess.board());
  //   }
  // }, [moves]);

  return (
    <>
      {gameOver && <Confetti />}
      <div className='text-white'>{isMyTurn ? "Yout Turn" : "Oppenents Turn"}</div>
      <div className="flex relative">
        <div className="text-white-200 rounded-md overflow-hidden">
          {(isFlipped ? board.slice().reverse() : board).map((row, i) => {
            i = isFlipped ? i + 1 : 8 - i;
            return (
              <div key={i} className="flex relative">
                <NumberNotation
                  isMainBoxColor={isFlipped ? i % 2 !== 0 : i % 2 === 0}
                  label={i.toString()}
                />
                {(isFlipped ? row.slice().reverse() : row).map((square, j) => {
                  j = isFlipped ? 7 - (j % 8) : j % 8;

                  const isMainBoxColor = (i + j) % 2 !== 0;
                  const isPiece = !!square;
                  const squareRepresentation = (String.fromCharCode(97 + j) +
                    '' +
                    i);
                  const isHighlightedSquare =
                    from === squareRepresentation ||
                    squareRepresentation === lastMove?.from ||
                    squareRepresentation === lastMove?.to;
                  const isRightClickedSquare =
                    rightClickedSquares.includes(squareRepresentation);

                  const piece = square && square.type;
                  const isKingInCheckSquare =
                    piece === 'k' &&
                    square?.color === chess.turn() &&
                    chess.inCheck();

                  return (
                    <div
                      onClick={() => {
                        if (!started) {
                          return;
                        }
                        // if (userSelectedMoveIndex !== null) {
                        //   chess.reset();
                        //   moves.forEach((move) => {
                        //     chess.move({ from: move.from, to: move.to });
                        //   });
                        //   setBoard(chess.board());
                        //   setUserSelectedMoveIndex(null);
                        //   return;
                        // }
                        if (!from && square?.color !== chess.turn()) return;
                        if (!isMyTurn) return;
                        if (from != squareRepresentation) {
                          setFrom(squareRepresentation);
                          if (isPiece) {
                            setLegalMoves(
                              chess
                                .moves({
                                  verbose: true,
                                  square: square?.square,
                                })
                                .map((move) => move.to),
                            );
                          }
                        } else {
                          setFrom(null);
                        }
                        if (!isPiece) {
                          setLegalMoves([]);
                        }

                        if (!from) {
                          setFrom(squareRepresentation);
                          setLegalMoves(
                            chess
                              .moves({
                                verbose: true,
                                square: square?.square,
                              })
                              .map((move) => move.to),
                          );
                        } else {
                          try {
                            // let moveResult;
                            if (
                              isPromoting(chess, from, squareRepresentation)
                            ) {
                              sendEvent(socket, MOVE, {from, to: squareRepresentation, promotion: "q", gameId})
                              setFrom(null);
                            } else {
                              sendEvent(socket, MOVE, {from, to: squareRepresentation, gameId})
                            }
                            setFrom(null);

                            // if (moveResult) {
                              // moveAudio.play();

                              // if (moveResult?.captured) {
                                // captureAudio.play();
                              // }
                              // socket.send(
                              //   JSON.stringify({
                              //     type: MOVE,
                              //     payload: {
                              //       gameId,
                              //       move: moveResult,
                              //     },
                              //   }),
                              // );

                              // sendEvent(socket, MOVE, {from, to: squareRepresentation, gameId})
                              // setMoves((prev) => [...prev, moveResult]);
                              setFrom(null);
                              // setLegalMoves([]);
                              // if (moveResult.san.includes('#')) {
                              //   setGameOver(true);
                              // }
                              
                            // }
                          } catch (e) {
                            console.log('e', e);
                          }
                        }
                      }}
                      style={{
                        width: boxSize,
                        height: boxSize,
                      }}
                      key={j}
                      className={`${isRightClickedSquare ? (isMainBoxColor ? 'bg-[#CF664E]' : 'bg-[#E87764]') : isKingInCheckSquare ? 'bg-[#FF6347]' : isHighlightedSquare ? `${isMainBoxColor ? 'bg-[#BBCB45]' : 'bg-[#F4F687]'}` : isMainBoxColor ? 'bg-[#739552]' : 'bg-[#EBEDD0]'} ${''}`}
                      onContextMenu={(e) => {
                        e.preventDefault();
                      }}
                      onMouseDown={(e) => {
                        handleMouseDown(e, squareRepresentation);
                      }}
                      onMouseUp={(e) => {
                        handleMouseUp(e, squareRepresentation);
                      }}
                    >
                      <div className="w-full justify-center flex h-full relative">
                        {square && <ChessSquare square={square} />}
                        {isFlipped
                          ? i === 8 && (
                              <LetterNotation
                                label={labels[j]}
                                isMainBoxColor={j % 2 === 0}
                              />
                            )
                          : i === 1 && (
                              <LetterNotation
                                label={labels[j]}
                                isMainBoxColor={j % 2 !== 0}
                              />
                            )}
                        {!!from &&
                          legalMoves.includes(squareRepresentation) && (
                            <LegalMoveIndicator
                              isMainBoxColor={isMainBoxColor}
                              isPiece={!!square?.type}
                            />
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <canvas
          ref={(ref) => setCanvas(ref)}
          width={boxSize * 8}
          height={boxSize * 8}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onMouseUp={(e) => e.preventDefault()}
        ></canvas>
      </div>
    </>
  );
});
