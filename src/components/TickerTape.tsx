import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const tickerData = [
  { symbol: "BTC/USDT", price: "67,432.18", change: "+2.45%" },
  { symbol: "ETH/USDT", price: "3,521.67", change: "+1.82%" },
  { symbol: "SOL/USDT", price: "178.93", change: "+5.67%" },
  { symbol: "BNB/USDT", price: "612.45", change: "+0.93%" },
  { symbol: "XRP/USDT", price: "0.5821", change: "+0.89%" },
  { symbol: "ADA/USDT", price: "0.6234", change: "-1.23%" },
  { symbol: "DOGE/USDT", price: "0.1523", change: "+8.45%" },
  { symbol: "DOT/USDT", price: "8.4521", change: "+3.21%" },
  { symbol: "AVAX/USDT", price: "42.87", change: "-0.54%" },
  { symbol: "LINK/USDT", price: "18.92", change: "+4.12%" },
  { symbol: "MATIC/USDT", price: "0.7123", change: "+1.56%" },
  { symbol: "UNI/USDT", price: "12.34", change: "+2.78%" },
];

const tickerItemSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  flexShrink: 0,
  whiteSpace: "nowrap" as const,
};

export default function TickerTape() {
  const items = [...tickerData, ...tickerData];
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
          {items.map((t, i) => {
            const isUp = t.change.startsWith("+");
            return (
              <Box key={i} sx={tickerItemSx}>
                <Typography variant="body2" sx={{ color: "#666", fontWeight: 500, fontSize: "0.78rem" }}>{t.symbol}</Typography>
                <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.78rem" }}>${t.price}</Typography>
                <Typography variant="body2" sx={{ color: isUp ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.75rem" }}>{t.change}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
