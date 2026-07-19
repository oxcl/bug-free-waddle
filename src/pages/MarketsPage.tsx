import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { coins } from "../data";
import { useKyc } from "../components/KycContext";

function MiniChart({ up }: { up: boolean }) {
  const points = up
    ? "0,30 8,25 16,28 24,18 32,22 40,12 48,16 56,8 64,12 72,5 80,8"
    : "0,8 8,12 16,10 24,20 32,16 40,25 48,22 56,28 64,24 72,28 80,30";
  const color = up ? "#22c55e" : "#ef4444";
  return (
    <svg width="100%" height="30" viewBox="0 0 80 30" style={{ display: "block" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MarketsPage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["BTC", "ETH", "SOL"]));
  const [sortBy, setSortBy] = useState<string>("marketCap");
  const { openKyc } = useKyc();

  const filteredCoins = useMemo(() => {
    let result = coins.filter(
      (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "price") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "change") result.sort((a, b) => b.change - a.change);
    else result.sort((a, b) => parseFloat(b.marketCap) - parseFloat(a.marketCap));
    return result;
  }, [search, sortBy]);

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  return (
    <Box>
      {/* Search & Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          placeholder="Search markets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            flex: 1,
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              color: "#ffffff",
              fontSize: "0.85rem",
              background: "rgba(255, 255, 255, 0.03)",
              "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
              "&.Mui-focused fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
            },
          }}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#666666", fontSize: 20 }} /></InputAdornment> } }}
        />
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {[
            { key: "marketCap", label: "Market Cap" },
            { key: "price", label: "Price" },
            { key: "change", label: "Change" },
          ].map((s) => (
            <Chip
              key={s.key}
              label={s.label}
              size="small"
              onClick={() => setSortBy(s.key)}
              sx={{
                bgcolor: sortBy === s.key ? "rgba(255, 255, 255, 0.08)" : "transparent",
                color: sortBy === s.key ? "#ffffff" : "#666666",
                fontWeight: 600,
                fontSize: "0.75rem",
                border: sortBy === s.key ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Market Table */}
      <Card
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "16px",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                {["", "#", "Asset", "Price", "24h Change", "7d Chart", "Volume", "Market Cap", "Action"].map((h) => (
                  <TableCell key={h} sx={{ color: "#666666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 1.5 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCoins.map((coin, i) => (
                <TableRow key={coin.symbol} sx={{ cursor: "pointer", "&:hover": { bgcolor: "rgba(255,255,255,0.03)" }, "& td": { borderBottom: "1px solid rgba(255,255,255,0.03)", py: 2 } }}>
                  <TableCell sx={{ width: 40 }}>
                    <Box onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.symbol); }} sx={{ cursor: "pointer", color: favorites.has(coin.symbol) ? "#f59e0b" : "#666666" }}>
                      {favorites.has(coin.symbol) ? <StarIcon sx={{ fontSize: 18 }} /> : <StarBorderIcon sx={{ fontSize: 18 }} />}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "#666666", fontWeight: 500, fontSize: "0.85rem" }}>{i + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 36, height: 36, background: coin.gradient, fontWeight: 700, fontSize: "0.8rem", color: "#fff" }}>
                        {coin.symbol.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 600, fontSize: "0.85rem" }}>{coin.name}</Typography>
                        <Typography variant="caption" sx={{ color: "#666666", fontSize: "0.7rem" }}>{coin.symbol}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>${coin.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      {coin.change >= 0 ? <TrendingUpIcon sx={{ fontSize: 16, color: "#22c55e" }} /> : <TrendingDownIcon sx={{ fontSize: 16, color: "#ef4444" }} />}
                      <Typography sx={{ color: coin.change >= 0 ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.85rem" }}>{coin.change >= 0 ? "+" : ""}{coin.change}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: 120 }}>
                    <MiniChart up={coin.change >= 0} />
                  </TableCell>
                  <TableCell sx={{ color: "#cccccc", fontSize: "0.85rem" }}>${coin.volume}</TableCell>
                  <TableCell sx={{ color: "#cccccc", fontSize: "0.85rem" }}>${coin.marketCap}</TableCell>
                  <TableCell>
                    <Chip
                      label="Trade"
                      size="small"
                      onClick={openKyc}
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.06)",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        height: 26,
                        cursor: "pointer",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
