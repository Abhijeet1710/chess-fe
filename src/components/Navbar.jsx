import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export default function Navbar() {
  // const { data: sessionData } = useSession();
  const navigate = useNavigate();
  console.log("in Navbar");

  return (
    <div className="bg-[#302f2a] supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 backdrop-blur text-white">
      <nav className="mx-auto w-3/4 flex h-24 items-center justify-between px-4">
        <div>
          <img
            className="w-8 h-8 mt-[-5px]"
            src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713654408/chess-svgrepo-com_m9g5p1.svg"
          />
          <h1 className="text-2xl">Chess.com</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-xl"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}
