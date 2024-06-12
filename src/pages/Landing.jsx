import { PlayCard } from "../components/PlayCard";

export const Landing = () => {
  return (
    <div className="max-w-full h-screen">
      <div className="flex flex-col md:flex-row w-full md:w-3/4 max-w-screen-lg mx-auto gap-x-4 p-4">
        <div>
          <img
            className="rounded-md md:h-4/6 hidden md:block"
            src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713647295/standardboard.1d6f9426_asqzum.png"
            alt="chess-board"
          />
        </div>
        <div>
          <PlayCard />
        </div>
      </div>
    </div>
  );
};
