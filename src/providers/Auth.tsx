import {createContext} from "react";

interface TokenContextType {
    token: string | undefined;
    tasks: [];
    tickets: number | undefined
    setToken: (token: string) => void;
    setMinesTable: (token: string) => void;
    minesTable: any[]
    profile: {} | any
    referals: {} | any
    tokensBalance: any
    setBalance: (addPoints: number, isIncrement: boolean) => void
    setTickets: (ticket: number) => void
    setTasks: (id: number) => void
    toaster: (title: string) => void;
}

export const TokenContext = createContext<TokenContextType | null>(null);