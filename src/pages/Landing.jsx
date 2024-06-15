import { PlayCard } from "../components/PlayCard";

export const Landing = () => {
  return (
    <div className="pt-40 max-w-full h-screen">
      <div className="flex flex-col md:flex-row md:w-3/4 mx-auto">
        <div className="w-full flex flex-col md:flex-row md:justify-around">
          <div>
            <PlayCard />
          </div>
          <div className="flex justify-self-center">
            <img
              className="h-[500px] rounded-xl hidden md:block"
              src="../src/assets/chessboard.png"
              alt="chess-board"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="mt-8 md:mt-16 bg-[#302f2a] w-[96%] max-w-screen-lg mx-auto px-6 md:px-14 py-14 rounded-2xl md:rounded-[36px]">
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
                href="https://github.com/Abhijeet1710/chess-fe/issues"
                target="_blank"
                className="hover:bg-[#262522] mt-10 text-white rounded-2xl px-4 py-4 border border-slate-400 bg-transparent w-full text-2xl flex gap-10 items-center justify-center"
              >
                <img
                  className="w-16 h-16"
                  src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657100/github-svgrepo-com_uosbko.svg"
                  alt="icon"
                />
                <p className="text-2xl md:text-4xl">Github</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-white mt-24 border-t border-slate-400 py-12">
        <span className="mx-auto text-xl">Made with ❤️ by Abhijeet.</span>
      </div>
    </div>
  );
};
