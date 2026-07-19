import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { orderBook } from "../data";
import { useCoins } from "../components/CoinGeckoProvider";
import { formatPrice, formatCompact } from "../api/coingecko";

function OrderBookPanel() {
  const maxTotal = Math.max(...orderBook.asks.map((o) => o.amount), ...orderBook.bids.map((o) => o.amount));

  return (
    <Card elevation={0} sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#f1f5f9", fontWeight: 700, mb: 1.5, fontSize: "0.85rem" }}>Order Book</Typography>

        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, px: 0.5 }}>
          <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.65rem", textTransform: "uppercase" }}>Price (USDT)</Typography>
          <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.65rem", textTransform: "uppercase" }}>Amount (BTC)</Typography>
        </Box>

        {/* Asks (reversed so lowest ask is at bottom) */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 1 }}>
          {[...orderBook.asks].reverse().map((ask, i) => (
            <Box key={`ask-${i}`} sx={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5, px: 0.5, borderRadius: "4px" }}>
              <Box sx={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${(ask.amount / maxTotal) * 100}%`, bgcolor: "rgba(239, 68, 68, 0.06)", borderRadius: "4px" }} />
              <Typography variant="body2" sx={{ color: "#ef4444", fontWeight: 500, fontSize: "0.78rem", zIndex: 1 }}>{ask.price.toLocaleString()}</Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.78rem", zIndex: 1 }}>{ask.amount.toFixed(3)}</Typography>
            </Box>
          ))}
        </Box>

        {/* Spread */}
        <Box sx={{ display: "flex", justifyContent: "center", py: 1, bgcolor: "rgba(255,255,255,0.02)", borderRadius: "6px", mb: 1 }}>
          <Typography variant="body2" sx={{ color: "#f1f5f9", fontWeight: 700, fontSize: "0.9rem" }}>$67,432.18</Typography>
          <Chip label="Spread 0.01%" size="small" sx={{ ml: 1, bgcolor: "rgba(99, 102, 241, 0.08)", color: "#818cf8", fontSize: "0.6rem", height: 20, fontWeight: 600 }} />
        </Box>

        {/* Bids */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {orderBook.bids.map((bid, i) => (
            <Box key={`bid-${i}`} sx={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5, px: 0.5, borderRadius: "4px" }}>
              <Box sx={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${(bid.amount / maxTotal) * 100}%`, bgcolor: "rgba(16, 185, 129, 0.06)", borderRadius: "4px" }} />
              <Typography variant="body2" sx={{ color: "#10b981", fontWeight: 500, fontSize: "0.78rem", zIndex: 1 }}>{bid.price.toLocaleString()}</Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.78rem", zIndex: 1 }}>{bid.amount.toFixed(3)}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function TradeForm() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState("limit");
  const [price, setPrice] = useState("67432.18");
  const [amount, setAmount] = useState("");
  const total = price && amount ? (parseFloat(price) * parseFloat(amount)).toFixed(2) : "0.00";

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      color: "#f1f5f9",
      fontSize: "0.85rem",
      "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
      "&:hover fieldset": { borderColor: "rgba(99, 102, 241, 0.3)" },
      "&.Mui-focused fieldset": { borderColor: "#6366f1" },
    },
    "& .MuiInputLabel-root": { color: "#64748b", fontSize: "0.8rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#818cf8" },
  };

  return (
    <Card elevation={0} sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button
            fullWidth
            variant={side === "buy" ? "contained" : "text"}
            onClick={() => setSide("buy")}
            sx={{
              bgcolor: side === "buy" ? "rgba(16, 185, 129, 0.15)" : "transparent",
              color: side === "buy" ? "#10b981" : "#64748b",
              border: side === "buy" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(255,255,255,0.06)",
              fontWeight: 600,
              py: 1,
              "&:hover": { bgcolor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)" },
            }}
          >
            Buy
          </Button>
          <Button
            fullWidth
            variant={side === "sell" ? "contained" : "text"}
            onClick={() => setSide("sell")}
            sx={{
              bgcolor: side === "sell" ? "rgba(239, 68, 68, 0.15)" : "transparent",
              color: side === "sell" ? "#ef4444" : "#64748b",
              border: side === "sell" ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(255,255,255,0.06)",
              fontWeight: 600,
              py: 1,
              "&:hover": { bgcolor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.3)" },
            }}
          >
            Sell
          </Button>
        </Box>

        <ToggleButtonGroup value={orderType} exclusive fullWidth size="small" onChange={(_, v) => v && setOrderType(v)} sx={{ mb: 2, "& .MuiToggleButton-root": { color: "#64748b", borderColor: "rgba(255,255,255,0.06)", textTransform: "none", fontWeight: 600, fontSize: "0.75rem", py: 0.8, "&.Mui-selected": { bgcolor: "rgba(99, 102, 241, 0.12)", color: "#818cf8" } } }}>
          <ToggleButton value="limit">Limit</ToggleButton>
          <ToggleButton value="market">Market</ToggleButton>
          <ToggleButton value="stop">Stop-Limit</ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {orderType !== "market" && (
            <TextField label="Price (USDT)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth size="small" sx={inputSx} />
          )}
          <TextField label="Amount (BTC)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth size="small" sx={inputSx} />

          {/* Quick Amount Buttons */}
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {["25%", "50%", "75%", "100%"].map((pct) => (
              <Button key={pct} variant="text" size="small" sx={{ flex: 1, color: "#475569", fontSize: "0.7rem", minWidth: 0, py: 0.5, "&:hover": { color: "#818cf8", bgcolor: "rgba(99, 102, 241, 0.06)" } }}>
                {pct}
              </Button>
            ))}
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

          {/* Summary */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.8rem" }}>Total</Typography>
            <Typography variant="body2" sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.85rem" }}>${Number(total).toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.8rem" }}>Available</Typography>
            <Typography variant="body2" sx={{ color: "#f1f5f9", fontSize: "0.85rem" }}>{side === "buy" ? "$42,850.00" : "1.245 BTC"}</Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              py: 1.3,
              fontWeight: 700,
              bgcolor: side === "buy" ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)",
              "&:hover": { bgcolor: side === "buy" ? "rgba(16, 185, 129, 1)" : "rgba(239, 68, 68, 1)" },
            }}
          >
            {side === "buy" ? "Buy BTC" : "Sell BTC"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function PriceChartArea() {
  const { coins: cgCoins, loading } = useCoins();
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const selectedSymbol = selectedPair.split("/")[0];
  const coin = cgCoins.find((c) => c.symbol.toUpperCase() === selectedSymbol) || cgCoins[0];

  return (
    <Card elevation={0}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <Select
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                sx={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 600, "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.08)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99, 102, 241, 0.3)" } }}
              >
                {cgCoins.filter((c) => !["usdt","usdc"].includes(c.symbol.toLowerCase())).slice(0, 10).map((c) => (
                  <MenuItem key={c.id} value={`${c.symbol.toUpperCase()}/USDT`}>{c.symbol.toUpperCase()}/USDT</MenuItem>
                ))}
              </Select>
            </FormControl>
            {loading ? <CircularProgress size={20} /> : <Typography variant="h5" sx={{ color: "#f1f5f9", fontWeight: 700 }}>{coin ? formatPrice(coin.current_price) : "--"}</Typography>}
            {coin && (
              <Chip
                icon={(coin.price_change_percentage_24h ?? 0) >= 0 ? <TrendingUpIcon sx={{ fontSize: "12px !important" }} /> : <TrendingDownIcon sx={{ fontSize: "12px !important" }} />}
                label={`${(coin.price_change_percentage_24h ?? 0) >= 0 ? "+" : ""}${(coin.price_change_percentage_24h ?? 0).toFixed(2)}%`}
                size="small"
                sx={{
                  bgcolor: (coin.price_change_percentage_24h ?? 0) >= 0 ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                  color: (coin.price_change_percentage_24h ?? 0) >= 0 ? "#10b981" : "#ef4444",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  "& .MuiChip-icon": { color: (coin.price_change_percentage_24h ?? 0) >= 0 ? "#10b981 !important" : "#ef4444 !important" },
                }}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {["1H", "4H", "1D", "1W", "1M"].map((t) => (
              <Chip key={t} label={t} size="small" sx={{ bgcolor: t === "1D" ? "rgba(99, 102, 241, 0.12)" : "transparent", color: t === "1D" ? "#818cf8" : "#475569", fontWeight: 600, fontSize: "0.65rem", height: 22, border: t === "1D" ? "1px solid rgba(99, 102, 241, 0.2)" : "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }} />
            ))}
          </Box>
        </Box>

        {/* Chart placeholder - candlestick-style visualization */}
        <Box sx={{ height: 300, borderRadius: 2, bgcolor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <svg viewBox="0 0 800 300" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="candleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            ))}
            {/* Candlesticks */}
            {Array.from({ length: 40 }).map((_, i) => {
              const x = 20 + i * 19;
              const isUp = Math.random() > 0.4;
              const base = 80 + Math.sin(i * 0.3) * 60 + Math.random() * 40;
              const high = base - 10 - Math.random() * 20;
              const low = base + 30 + Math.random() * 20;
              const open = isUp ? base + 15 : base;
              const close = isUp ? base : base + 15;
              return (
                <g key={i}>
                  <line x1={x} y1={high} x2={x} y2={low} stroke={isUp ? "#10b981" : "#ef4444"} strokeWidth="1" />
                  <rect x={x - 5} y={open} width="10" height={Math.abs(close - open) || 2} fill={isUp ? "#10b981" : "#ef4444"} rx="1" />
                </g>
              );
            })}
            {/* Current price line */}
            <line x1="0" y1="100" x2="800" y2="100" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <circle cx="800" cy="100" r="4" fill="#6366f1" />
          </svg>
        </Box>

        {/* Market Stats */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {coin && [
            { label: "24h High", value: formatPrice(coin.high_24h) },
            { label: "24h Low", value: formatPrice(coin.low_24h) },
            { label: "24h Volume", value: `$${formatCompact(coin.total_volume)}` },
            { label: "Market Cap", value: `$${formatCompact(coin.market_cap)}` },
          ].map((stat) => (
            <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
              <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.65rem", textTransform: "uppercase" }}>{stat.label}</Typography>
              <Typography variant="body2" sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.85rem" }}>{stat.value}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default function TradingPage() {
  return (
    <Box>
      <Grid container spacing={2}>
        {/* Order Book */}
        <Grid size={{ xs: 12, md: 3 }}>
          <OrderBookPanel />
        </Grid>

        {/* Chart + Trade */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PriceChartArea />
        </Grid>

        {/* Trade Form */}
        <Grid size={{ xs: 12, md: 3 }}>
          <TradeForm />
        </Grid>
      </Grid>
    </Box>
  );
}
