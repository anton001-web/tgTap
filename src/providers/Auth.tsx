import {createContext} from "react";

interface TokenContextType {
    token: string | undefined;
    tasks: [];
    setToken: (token: string) => void;
    setMinesTable: (token: string) => void;
    minesTable: any[]
    profile: {} | any
    referals: {} | any
}

export const TokenContext = createContext<TokenContextType | null>(null);