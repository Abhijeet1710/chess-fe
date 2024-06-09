export const ChessSquare = ({
  square,
}) => {
  return (
    <div className="h-full justify-center flex flex-col ">
      {square ? (
        <img
          className="w-14"
          src={`/${square?.color === 'b' ? `b${square.type}` : `w${square.type}`}.png`}
          />
      ) : null}
    </div>
  );
};

export default ChessSquare;

