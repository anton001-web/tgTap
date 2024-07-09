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
    refCode: string
    setBalance: (addPoints: number, isIncrement: boolean) => void
    setTickets: (ticket: number) => void
    setTasks: (id: number, taskResponse: any) => void
    toaster: (title: string) => void;
}

export const TokenContext = createContext<TokenContextType | null>(null);