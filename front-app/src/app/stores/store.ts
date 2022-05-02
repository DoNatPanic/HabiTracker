import { useContext } from "react";
import { createContext } from "react"
import NoteStore from "./noteStore"
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CommonStore from "./commonStore";

interface Store {
    noteStore: NoteStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
}

export const store: Store = {
    noteStore: new NoteStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}