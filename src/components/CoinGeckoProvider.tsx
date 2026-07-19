import { createContext, useContext } from "react";
import useCoinGecko from "../hooks/useCoinGecko";
import type { CoinGeckoMarket } from "../api/coingecko";

interface CoinGeckoContextValue {
  coins: CoinGeckoMarket[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getCoinBySymbol: (symbol: string) => CoinGeckoMarket | undefined;
  getCoinById: (id: string) => CoinGeckoMarket | undefined;
}

const CoinGeckoContext = createContext<CoinGeckoContextValue>({
  coins: [],
  loading: true,
  error: null,
  refetch: () => {},
  getCoinBySymbol: () => undefined,
  getCoinById: () => undefined,
});

export function CoinGeckoProvider({ children }: { children: React.ReactNode }) {
  const value = useCoinGecko();
  return (
    <CoinGeckoContext.Provider value={value}>
      {children}
    </CoinGeckoContext.Provider>
  );
}

export function useCoins() {
  return useContext(CoinGeckoContext);
}
