import React from "react";

const ShowMoves = ({ moves }) => {
  console.log("MOVES", moves);
  return (
    <div className="">
      {moves.map((m, ind) => {
        return (
          <div className={ind == moves.length-1 ? "px-3 py-1 text-white bg-[#302F2A] md:bg-[#292524] rounded" : "px-3 py-1 text-white"} key={ind}>
            <span className="mr-4">{ind + 1}.</span>
            <span className="mr-10">{m.from}</span>
            <span className="mr-10">to</span>
            <span>{m.to}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ShowMoves;
