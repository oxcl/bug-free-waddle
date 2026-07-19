import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchMarkets,
  type CoinGeckoMarket,
} from "../api/coingecko";

interface UseCoinGeckoReturn {
  coins: CoinGeckoMarket[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getCoinBySymbol: (symbol: string) => CoinGeckoMarket | undefined;
  getCoinById: (id: string) => CoinGeckoMarket | undefined;
}

export default function useCoinGecko(): UseCoinGeckoReturn {
  const [coins, setCoins] = useState<CoinGeckoMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMarkets();
      setCoins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 120_000);
    return () => clearInterval(interval);
  }, [load]);

  const bySymbol = useMemo(() => {
    const map = new Map<string, CoinGeckoMarket>();
    for (const c of coins) {
      map.set(c.symbol.toUpperCase(), c);
    }
    return map;
  }, [coins]);

  const byId = useMemo(() => {
    const map = new Map<string, CoinGeckoMarket>();
    for (const c of coins) {
      map.set(c.id, c);
    }
    return map;
  }, [coins]);

  return {
    coins,
    loading,
    error,
    refetch: load,
    getCoinBySymbol: (sym) => bySymbol.get(sym.toUpperCase()),
    getCoinById: (id) => byId.get(id),
  };
}

export function useRatePairs(coins: CoinGeckoMarket[]): Record<string, number> {
  return useMemo(() => {
    const pairs: Record<string, number> = { USDT: 1, USDC: 1 };
    for (const c of coins) {
      const sym = c.symbol.toUpperCase();
      if (!pairs[sym]) {
        pairs[sym] = c.current_price;
      }
    }
    return pairs;
  }, [coins]);
}
