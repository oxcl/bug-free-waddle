import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCoins } from "./CoinGeckoProvider";
import { formatPrice } from "../api/coingecko";

const tickerItemSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  flexShrink: 0,
  whiteSpace: "nowrap" as const,
};

export default function TickerTape() {
  const { coins } = useCoins();
  const items = coins.length > 0 ? coins : [];
  const doubled = [...items, ...items];

  return (
    <Box sx={{ bgcolor: "#000", borderBottom: "1px solid rgba(255,255,255,0.08)", py: 0.75 }}>
      <Box
        sx={{
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <Box
          className="ticker-scroll"
          sx={{
            display: "flex",
            width: "max-content",
            animation: "ticker-scroll 40s linear infinite",
          }}
        >
          {doubled.map((t, i) => {
            const ch = t.price_change_percentage_24h ?? 0;
            const isUp = ch >= 0;
            return (
              <Box key={`${t.id}-${i}`} sx={tickerItemSx}>
                <Box
                  component="img"
                  src={t.image}
                  alt={t.name}
                  sx={{ width: 16, height: 16, borderRadius: "50%", objectFit: "cover" }}
                />
                <Typography variant="body2" sx={{ color: "#666", fontWeight: 500, fontSize: "0.78rem" }}>{t.symbol.toUpperCase()}/USDT</Typography>
                <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.78rem" }}>{formatPrice(t.current_price)}</Typography>
                <Typography variant="body2" sx={{ color: isUp ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.75rem" }}>{ch >= 0 ? "+" : ""}{ch.toFixed(2)}%</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
