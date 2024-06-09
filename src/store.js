import { atom } from "recoil";

export const isBoardFlippedAtom = atom({
    key: "isBoardFlippedAtom",
    default: false,
})

export const movesAtom = atom({
    key: "movesAtom",
    default: []
})

export const userSelectedMoveIndexAtom = atom({
    key: 'userSelectedMoveIndex',
    default: null
});