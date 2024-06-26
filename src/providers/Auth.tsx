import {createContext} from "react";

interface TokenContextType {
    token: string | undefined;
    setToken: (token: string) => void;
}

export const TokenContext = createContext<TokenContextType | null>(null);