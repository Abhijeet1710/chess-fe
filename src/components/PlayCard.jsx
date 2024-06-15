import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shardcn/card";
import chessIcon from "../../public/chess.png";
import computerIcon from "../../public/computer.png";
import lightningIcon from "../../public/lightning-bolt.png";
import friendIcon from "../../public/friendship.png";
import tournamentIcon from "../../public/trophy.png";
import variantsIcon from "../../public/strategy.png";
import GameModeComponent from "./GameModeComponent";
import { Button } from "./Button";

export function PlayCard() {
  const navigate = useNavigate()

  const gameModeData = [
    {
      icon: (
        <img
          src={lightningIcon}
          className="inline-block mt-1 h-7 w-7"
          alt="online"
        />
      ),
      title: "Play Online",
      description: "Play vs a Person of Similar Skill",
      onClick: () => {
        navigate("/game/random");
      },
      disabled: false,
    },
    // {
    //   icon: (
    //     <img
    //       src={computerIcon}
    //       className="inline-block mt-1 h-7 w-7"
    //       alt="computer"
    //     />
    //   ),
    //   title: 'Computer',
    //   description: 'Challenge a bot from easy to master',
    //   disabled: true,
    // },
    // {
    //   icon: (
    //     <img
    //       src={friendIcon}
    //       className="inline-block mt-1 h-7 w-7"
    //       alt="friend"
    //     />
    //   ),
    //   title: 'Play a Friend',
    //   description: 'Invite a Friend to a game of Chess',
    //   disabled: true,
    // },
    // {
    //   icon: (
    //     <img
    //       src={tournamentIcon}
    //       className="inline-block mt-1 h-7 w-7"
    //       alt="tournament"
    //     />
    //   ),
    //   title: 'Tournaments',
    //   description: 'Join an Arena where anyone can Win',
    //   disabled: true,
    // },
    // {
    //   icon: (
    //     <img
    //       src={variantsIcon}
    //       className="inline-block mt-1 h-7 w-7"
    //       alt="variants"
    //     />
    //   ),
    //   title: 'Chess Variants',
    //   description: 'Find Fun New ways to play chess',
    //   disabled: true,
    // },
  ];

  return (
    <div>
      <div className="text-white">
        <span className="text-6xl font-bold">Your Ultimate</span>
        <br></br>
        <span className="text-9xl font-bold">Chess</span>
        <br></br>
        <span className="text-6xl font-bold">Destination</span> <br></br>
        <div className="mt-6">
          <span className="text-lg">
            Chess.100x is your premier destination for <br></br> mastering the
            timeless game of chess. <br></br> Whether you're a beginner looking
            to learn the basics or an <br></br> experienced player aiming to
            sharpen your skills.
          </span>
        </div>
      </div>
      <button
      onClick={() => navigate("/login")} 
      className="px-8 py-4 text-2xl bg-green-500 text-white font-bold mt-6 text-black rounded-2xl w-full text-3xl flex gap-10 items-center justify-center opacity-90 transition hover:opacity-100">
        <img
          className="w-16 h-16"
          src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713650980/chess-solid-svgrepo-com_qbosf3.svg"
          alt="icon"
        />
        <p className="text-4xl">Play Online</p>
      </button>

      <div>
        {/* <div className="mt-32 bg-[#262522] w-[96%] max-w-screen-lg mx-auto px-14 py-14 rounded-[36px]">
          <div className="lg:grid grid-cols-[45%,1fr] gap-28">
            <div className="rounded-xl">
              <img
                src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657312/undraw_questions_re_1fy7_kqjpu3.svg"
                alt="chess-board"
              />
            </div>
            <div className="mt-16 lg:mt-0">
              <h1 className="text-6xl text-white font-bold text-left mt-[-10px]">
                Found an Issue!
              </h1>
              <p className="text-xl mt-6 text-white">
                Please create an issue in our github website below. You are also
                invited to contribute on the project.
              </p>
              <a
                href="https://github.com/code100x/chess/issues"
                target="_blank"
                className="mt-10 text-white rounded-2xl px-4 py-4 border border-slate-400 bg-transparent w-full text-2xl flex gap-10 items-center justify-center"
              >
                <img
                  className="w-16 h-16"
                  src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657100/github-svgrepo-com_uosbko.svg"
                  alt="icon"
                />
                <p className="text-4xl">Github</p>
              </a>
            </div>
          </div>
        </div> */}


      </div>
    </div>
  );
}
