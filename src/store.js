import { atom, selector } from "recoil";
import { BACKEND_URL } from "./utils/constants";

export const isBoardFlippedAtom = atom({
  key: "isBoardFlippedAtom",
  default: false,
});

export const movesAtom = atom({
  key: "movesAtom",
  default: [],
});

export const userSelectedMoveIndexAtom = atom({
  key: "userSelectedMoveIndex",
  default: null,
});

export const userNameAtom = atom({
  key: "userNameAtom",
  default: "",
});


export const userAtom = atom({
  key: "user",
  default: selector({
    key: "user/default",
    get: async ({get}) => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (e) {
        console.error(e);
      }

      return null;
    },
  }),
  // default: {
  //   id: 12345,
  //   userName: "Abhijeet",
  // },
});
