import { useState, useMemo } from "react";
import { Routes, Route, Link as RouterLink, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LanIcon from "@mui/icons-material/Lan";
import CodeIcon from "@mui/icons-material/Code";
import CloudIcon from "@mui/icons-material/Cloud";
import ShieldIcon from "@mui/icons-material/Shield";
import GavelIcon from "@mui/icons-material/Gavel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from "@mui/icons-material/Build";
import TollIcon from "@mui/icons-material/Toll";
import HandshakeIcon from "@mui/icons-material/Handshake";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import HubIcon from "@mui/icons-material/Hub";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import ApiIcon from "@mui/icons-material/Api";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import GppGoodIcon from "@mui/icons-material/GppGood";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Layout from "./components/Layout";
import MiniChart from "./components/MiniChart";
import PageHeader from "./components/PageHeader";
import CTASection from "./components/CTASection";
import LoginPage from "./pages/LoginPage";

const coins = [
  { name: "Bitcoin", symbol: "BTC", price: 67432.18, change: "+2.45", volume: "28.5B", marketCap: "1.32T" },
  { name: "Ethereum", symbol: "ETH", price: 3521.67, change: "+1.82", volume: "15.2B", marketCap: "423.1B" },
  { name: "Solana", symbol: "SOL", price: 178.93, change: "+5.67", volume: "4.8B", marketCap: "78.3B" },
  { name: "Cardano", symbol: "ADA", price: 0.6234, change: "-1.23", volume: "892M", marketCap: "22.1B" },
  { name: "XRP", symbol: "XRP", price: 0.5821, change: "+0.89", volume: "1.2B", marketCap: "31.7B" },
  { name: "Polkadot", symbol: "DOT", price: 8.4521, change: "+3.21", volume: "567M", marketCap: "11.2B" },
  { name: "Avalanche", symbol: "AVAX", price: 42.87, change: "-0.54", volume: "678M", marketCap: "16.3B" },
  { name: "Chainlink", symbol: "LINK", price: 18.92, change: "+4.12", volume: "1.1B", marketCap: "11.1B" },
  { name: "Dogecoin", symbol: "DOGE", price: 0.1523, change: "+8.45", volume: "2.3B", marketCap: "21.8B" },
  { name: "Polygon", symbol: "MATIC", price: 0.7123, change: "+1.56", volume: "445M", marketCap: "6.6B" },
];

const stats = [
  { value: "$76.2B", label: "24h Volume" },
  { value: "2,400+", label: "Enterprise Clients" },
  { value: "99.99%", label: "Uptime" },
  { value: "$250M", label: "Insurance" },
];

const tradingPairs = [
  { pair: "BTC/USDT", last: "67,432.18", high: "68,120.00", low: "65,890.00", volume: "423.5K", change: "+2.45%", up: true },
  { pair: "ETH/USDT", last: "3,521.67", high: "3,580.00", low: "3,445.21", volume: "1.2M", change: "+1.82%", up: true },
  { pair: "SOL/USDT", last: "178.93", high: "182.50", low: "169.20", volume: "3.8M", change: "+5.67%", up: true },
  { pair: "BNB/USDT", last: "612.45", high: "618.00", low: "605.30", volume: "892K", change: "+0.93%", up: true },
  { pair: "XRP/USDT", last: "0.5821", high: "0.5950", low: "0.5712", volume: "5.6M", change: "+0.89%", up: true },
  { pair: "ADA/USDT", last: "0.6234", high: "0.6420", low: "0.6105", volume: "2.1M", change: "-1.23%", up: false },
];

const ratePairs: Record<string, number> = {
  BTC: 67432.18,
  ETH: 3521.67,
  SOL: 178.93,
  BNB: 612.45,
  XRP: 0.5821,
  ADA: 0.6234,
  DOGE: 0.1523,
  DOT: 8.4521,
  AVAX: 42.87,
  LINK: 18.92,
  MATIC: 0.7123,
  USDT: 1.0,
  USDC: 1.0,
};

function HeroSection() {
  return (
    <Box sx={{ position: "relative", overflow: "hidden", pt: { xs: 8, md: 10 }, pb: { xs: 8, md: 10 }, minHeight: { md: "85vh" }, display: "flex", alignItems: "center" }}>
      {/* Background effects */}
      <Box className="grid-pattern" sx={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      {/* Animated gradient orbs */}
      <Box sx={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "float 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute",
        bottom: "10%",
        right: "10%",
        width: 250,
        height: 250,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "float 10s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box className="animate-slide-left">
              <Box sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                px: 2,
                py: 0.75,
                borderRadius: 100,
                bgcolor: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.15)",
              }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#22c55e", boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)" }} />
                <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                  SYSTEMS OPERATIONAL
                </Typography>
              </Box>

              <Typography variant="h1" sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.8rem", lg: "4.2rem" },
                mb: 2.5,
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}>
                <Box component="span" className="gradient-text" sx={{ display: "block" }}>Crypto Infrastructure</Box>
                <Box component="span" sx={{
                  display: "block",
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  for Enterprise
                </Box>
              </Typography>

              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, mb: 4, maxWidth: 520, fontSize: "1.1rem" }}>
                Institutional-grade trading, custody, and settlement infrastructure. Power your business with the most reliable crypto platform.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 5 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.75,
                    px: 4,
                    fontSize: "1rem",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #fff 0%, #e5e5e5 100%)",
                    color: "#000",
                    "&:hover": {
                      background: "linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 32px rgba(255,255,255,0.15)",
                    },
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  Request a Demo
                </Button>
                <RouterLink to="/resources/documentation" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      py: 1.75,
                      px: 4,
                      fontSize: "1rem",
                      borderColor: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.3)",
                        bgcolor: "rgba(255,255,255,0.03)",
                      },
                    }}
                  >
                    View Documentation
                  </Button>
                </RouterLink>
              </Box>

              {/* Stats with animated borders */}
              <Box sx={{ display: "flex", gap: { xs: 3, md: 5 }, flexWrap: "wrap" }}>
                {stats.slice(0, 3).map((s, i) => (
                  <Box key={i} className="metric-card" sx={{
                    pl: 2,
                    borderLeft: "2px solid",
                    borderColor: i === 0 ? "rgba(59, 130, 246, 0.5)" : i === 1 ? "rgba(139, 92, 246, 0.5)" : "rgba(34, 197, 94, 0.5)",
                  }}>
                    <Typography variant="h5" sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.3rem", md: "1.5rem" },
                      background: i === 0
                        ? "linear-gradient(135deg, #3b82f6, #60a5fa)"
                        : i === 1
                          ? "linear-gradient(135deg, #8b5cf6, #a78bfa)"
                          : "linear-gradient(135deg, #22c55e, #4ade80)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      {s.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", mt: 0.5, fontSize: "0.8rem", fontWeight: 500 }}>{s.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: "relative", display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center" }} className="animate-slide-right">
              {/* Glowing backdrop for image */}
              <Box sx={{
                position: "absolute",
                width: "80%",
                height: "80%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }} />
              <Box component="img"
                src="/coins.jpg"
                alt="Cryptocurrency coins"
                sx={{
                  width: "100%",
                  maxWidth: 480,
                  mx: "auto",
                  display: "block",
                  borderRadius: 4,
                  filter: "brightness(0.95) contrast(1.05)",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(59, 130, 246, 0.1)",
                }}
              />

              {/* Floating price badges */}
              <Box sx={{
                position: "absolute",
                top: "15%",
                right: "5%",
                zIndex: 2,
                bgcolor: "rgba(17, 17, 17, 0.9)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                borderRadius: 2,
                px: 2,
                py: 1,
                animation: "float 5s ease-in-out infinite",
              }}>
                <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 600, fontSize: "0.7rem" }}>BTC +2.45%</Typography>
              </Box>

              <Box sx={{
                position: "absolute",
                bottom: "20%",
                left: "0%",
                zIndex: 2,
                bgcolor: "rgba(17, 17, 17, 0.9)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                borderRadius: 2,
                px: 2,
                py: 1,
                animation: "float 7s ease-in-out infinite reverse",
              }}>
                <Typography variant="caption" sx={{ color: "#60a5fa", fontWeight: 600, fontSize: "0.7rem" }}>ETH +1.82%</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function RateCalculator() {
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USDT");
  const [amount, setAmount] = useState("1");

  const numericAmount = useMemo(() => {
    const parsed = parseFloat(amount);
    return isNaN(parsed) ? 0 : parsed;
  }, [amount]);

  const result = useMemo(() => {
    const fromRate = ratePairs[fromCurrency] ?? 1;
    const toRate = ratePairs[toCurrency] ?? 1;
    return (numericAmount * fromRate) / toRate;
  }, [numericAmount, fromCurrency, toCurrency]);

  const rate = useMemo(() => {
    const fromRate = ratePairs[fromCurrency] ?? 1;
    const toRate = ratePairs[toCurrency] ?? 1;
    return fromRate / toRate;
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const currencyOptions = Object.keys(ratePairs);

  return (
    <Box sx={{ py: { xs: 5, md: 6 }, bgcolor: "#0a0a0a", position: "relative" }}>
      <Box className="dot-grid" sx={{ position: "absolute", inset: 0, opacity: 0.2 }} />
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>Convert Crypto</Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>Real-time exchange rates for any pair</Typography>
        </Box>
        <Card elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth sx={{ "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" }, "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#fff" } }, "& .MuiInputLabel-root": { color: "#666" }, "& .MuiInputLabel-root.Mui-focused": { color: "#fff" }, "& input[type=number]": { MozAppearance: "textfield" }, "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 } }} />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: "#666" }}>From</InputLabel>
              <Select value={fromCurrency} label="From" onChange={(e) => setFromCurrency(e.target.value)} sx={{ color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" } }}>
                {currencyOptions.map((c) => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <IconButton onClick={handleSwap} sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}><SwapVertIcon /></IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField label="Result" value={result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} slotProps={{ input: { readOnly: true } }} fullWidth sx={{ "& .MuiOutlinedInput-root": { color: "#fff", fontWeight: 600, "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }, "& .MuiInputLabel-root": { color: "#666" } }} />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: "#666" }}>To</InputLabel>
              <Select value={toCurrency} label="To" onChange={(e) => setToCurrency(e.target.value)} sx={{ color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" } }}>
                {currencyOptions.map((c) => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
              </Select>
            </FormControl>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: "#666" }}>1 {fromCurrency} = {rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {toCurrency}</Typography>
            <Typography variant="caption" sx={{ color: "#444" }}>Demo rates</Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

function MarketSection() {
  return (
    <Box sx={{ py: { xs: 4, md: 5 }, position: "relative" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>Markets</Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>Real-time prices for top digital assets</Typography>
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["#", "Asset", "Price", "24h", "Volume", "Mkt Cap"].map((h) => (
                  <TableCell key={h} sx={{ color: "#666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.08)", py: 1.5 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((coin, i) => (
                <TableRow key={coin.symbol} className="table-row-hover" sx={{ cursor: "pointer", transition: "background 0.2s", "& td": { borderBottom: "1px solid rgba(255,255,255,0.04)", py: 1.5 } }}>
                  <TableCell sx={{ color: "#666", fontWeight: 500, fontSize: "0.8rem" }}>{i + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: "#222", fontWeight: 700, fontSize: "0.75rem", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>{coin.symbol.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{coin.name}</Typography>
                        <Typography variant="caption" sx={{ color: "#666", fontSize: "0.7rem" }}>{coin.symbol}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>${coin.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      {coin.change.startsWith("+") ? <TrendingUpIcon sx={{ fontSize: 14, color: "#22c55e" }} /> : <TrendingDownIcon sx={{ fontSize: 14, color: "#ef4444" }} />}
                      <Typography sx={{ color: coin.change.startsWith("+") ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.8rem" }}>{coin.change}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "#999", fontSize: "0.8rem" }}>${coin.volume}</TableCell>
                  <TableCell sx={{ color: "#999", fontSize: "0.8rem" }}>${coin.marketCap}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <RouterLink to="/products/spot-trading" style={{ textDecoration: "none" }}>
            <Button variant="outlined" endIcon={<ArrowForwardIcon />} sx={{ px: 4 }}>View All Markets</Button>
          </RouterLink>
        </Box>
      </Container>
    </Box>
  );
}

function TradingPairsSection() {
  return (
    <Box sx={{ py: { xs: 4, md: 5 }, bgcolor: "#0a0a0a" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>Trading Pairs</Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>Deep liquidity and tight spreads</Typography>
        </Box>
        <Grid container spacing={2}>
          {tradingPairs.map((tp) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tp.pair}>
              <Card elevation={0} sx={{ cursor: "pointer", "&:hover": { borderColor: "rgba(255,255,255,0.15)" } }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{tp.pair}</Typography>
                    <Chip label={tp.change} size="small" sx={{ bgcolor: tp.up ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)", color: tp.up ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.7rem", height: 22 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 1.5, fontSize: "1.1rem" }}>${tp.last}</Typography>
                  <MiniChart up={tp.up} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5, pt: 1.5, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <Box><Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem", display: "block" }}>High</Typography><Typography variant="body2" sx={{ color: "#999", fontWeight: 500, fontSize: "0.75rem" }}>${tp.high}</Typography></Box>
                    <Box><Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem", display: "block" }}>Low</Typography><Typography variant="body2" sx={{ color: "#999", fontWeight: 500, fontSize: "0.75rem" }}>${tp.low}</Typography></Box>
                    <Box><Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem", display: "block" }}>Vol</Typography><Typography variant="body2" sx={{ color: "#999", fontWeight: 500, fontSize: "0.75rem" }}>{tp.volume}</Typography></Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function FeaturesSection() {
  const features = [
    { title: "Institutional Custody", desc: "Multi-signature cold storage with $250M insurance coverage. SOC 2 Type II certified.", icon: <SecurityIcon /> },
    { title: "Ultra-Low Latency", desc: "Co-located matching engine with sub-millisecond execution for enterprise operations.", icon: <SpeedIcon /> },
    { title: "Volume-Based Pricing", desc: "Tiered fee structure starting at 0.02% for institutional clients.", icon: <AccountBalanceIcon /> },
    { title: "24/7 Support", desc: "Named account managers and priority support for enterprise clients.", icon: <SupportAgentIcon /> },
  ];
  return (
    <Box sx={{ py: { xs: 5, md: 7 }, position: "relative" }}>
      <Box className="dot-grid" sx={{ position: "absolute", inset: 0, opacity: 0.2 }} />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>Why MATBEA Enterprise</Typography>
          <Typography variant="body2" sx={{ color: "#666", maxWidth: 400 }}>Institutional infrastructure for hedge funds, corporates, and fintech platforms.</Typography>
        </Box>
        <Grid container spacing={2}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: "rgba(255,255,255,0.15)" } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#fff" }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 0.5, fontSize: "0.95rem" }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.7, fontSize: "0.82rem" }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function StatsSection() {
  return (
    <Box sx={{ py: { xs: 5, md: 6 }, borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {stats.map((s, i) => (
            <Grid size={{ xs: 6, md: 3 }} key={i}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#fff", mb: 0.5, fontSize: { xs: "1.6rem", md: "2rem" } }}>{s.value}</Typography>
                <Typography variant="body2" sx={{ color: "#666", fontWeight: 500, fontSize: "0.82rem" }}>{s.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* ==================== PAGE COMPONENTS ==================== */

function SpotTradingPage() {
  return (
    <Box>
      <PageHeader
        title="Spot Trading"
        subtitle="Trade 200+ cryptocurrency pairs with deep liquidity, tight spreads, and institutional-grade execution. Our matching engine processes over 100,000 orders per second."
        badge="Trading"
        variant="trading"
      />

      {/* Live ticker bar */}
      <Box sx={{ bgcolor: "rgba(34, 197, 94, 0.03)", borderBottom: "1px solid rgba(34, 197, 94, 0.1)", py: 1.5, overflow: "hidden" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { pair: "BTC/USDT", price: "67,432.18", change: "+2.45%", up: true },
              { pair: "ETH/USDT", price: "3,521.67", change: "+1.82%", up: true },
              { pair: "SOL/USDT", price: "178.93", change: "+5.67%", up: true },
            ].map((item) => (
              <Box key={item.pair} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: "0.75rem" }}>{item.pair}</Typography>
                <Typography variant="caption" sx={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>${item.price}</Typography>
                <Typography variant="caption" sx={{ color: item.up ? "#4ade80" : "#ef4444", fontWeight: 600, fontSize: "0.75rem" }}>{item.change}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Feature cards with gradient accents */}
        <Grid container spacing={3}>
          {[
            { icon: <SpeedIcon />, title: "Sub-Millisecond Execution", desc: "Co-located matching engine with latencies under 100 microseconds for optimal trade execution.", color: "#3b82f6" },
            { icon: <LanIcon />, title: "Deep Liquidity", desc: "Access aggregated liquidity from 15+ institutional market makers with guaranteed fill rates.", color: "#8b5cf6" },
            { icon: <ShowChartIcon />, title: "Advanced Order Types", desc: "TWAP, VWAP, Iceberg, and custom algorithmic order types for sophisticated trading strategies.", color: "#22c55e" },
            { icon: <HubIcon />, title: "Multi-Venue Routing", desc: "Smart order routing across multiple venues for best price execution and minimal slippage.", color: "#06b6d4" },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} className="feature-card-animated hover-lift" sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${f.color}15 0%, ${f.color}05 100%)`,
                    border: `1px solid ${f.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    color: f.color,
                  }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Trading terminal style table */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Box>
              <Typography variant="h4" sx={{ color: "#fff", mb: 0.5, fontWeight: 700 }}>Supported Pairs</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>200+ trading pairs across major cryptocurrencies and stablecoins</Typography>
            </Box>
            <Chip
              label="LIVE"
              size="small"
              sx={{
                bgcolor: "rgba(34, 197, 94, 0.1)",
                color: "#4ade80",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                fontWeight: 700,
                fontSize: "0.7rem",
                "&::before": {
                  content: '""',
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#22c55e",
                  mr: 0.75,
                  boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)",
                },
              }}
            />
          </Box>

          <TableContainer component={Paper} elevation={0} sx={{
            bgcolor: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 3,
            overflow: "hidden",
            "& .MuiTableCell-root": {
              borderColor: "rgba(255,255,255,0.04)",
            },
          }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
                  {["Pair", "Price", "24h Change", "24h Volume", "Spread"].map((h) => (
                    <TableCell key={h} sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", py: 2 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { pair: "BTC/USDT", price: "67,432.18", change: "+2.45%", vol: "$28.5B", spread: "0.01%", up: true },
                  { pair: "ETH/USDT", price: "3,521.67", change: "+1.82%", vol: "$15.2B", spread: "0.01%", up: true },
                  { pair: "SOL/USDT", price: "178.93", change: "+5.67%", vol: "$4.8B", spread: "0.02%", up: true },
                  { pair: "BNB/USDT", price: "612.45", change: "+0.93%", vol: "$2.1B", spread: "0.02%", up: true },
                  { pair: "XRP/USDT", price: "0.5821", change: "+0.89%", vol: "$1.2B", spread: "0.03%", up: true },
                  { pair: "ADA/USDT", price: "0.6234", change: "-1.23%", vol: "$892M", spread: "0.04%", up: false },
                ].map((row, _i) => (
                  <TableRow
                    key={row.pair}
                    className="table-row-hover"
                    sx={{
                      cursor: "pointer",
                      "& td": { py: 2, transition: "all 0.2s" },
                      "&:hover": { bgcolor: "rgba(59, 130, 246, 0.03)" },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "8px",
                          bgcolor: "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.7)",
                        }}>
                          {row.pair.split("/")[0].charAt(0)}
                        </Box>
                        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{row.pair}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>${row.price}</TableCell>
                    <TableCell>
                      <Box sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        bgcolor: row.up ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                      }}>
                        {row.up ? <TrendingUpIcon sx={{ fontSize: 14, color: "#4ade80" }} /> : <TrendingDownIcon sx={{ fontSize: 14, color: "#f87171" }} />}
                        <Typography sx={{ color: row.up ? "#4ade80" : "#f87171", fontWeight: 700, fontSize: "0.8rem" }}>{row.change}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{row.vol}</TableCell>
                    <TableCell sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>{row.spread}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <CTASection title="Start Trading Today" subtitle="Open an institutional account and access deep liquidity across 200+ pairs." primaryAction={{ label: "Open Account", path: "/products/enterprise" }} secondaryAction={{ label: "View Fees", path: "/compliance/institutional-fees" }} />
    </Box>
  );
}

function OTCDeskPage() {
  return (
    <Box>
      <PageHeader
        title="OTC Desk"
        subtitle="Execute large block trades with zero market impact. Our OTC desk handles trades from $100K to $500M+ with competitive pricing and instant settlement."
        badge="OTC"
        variant="trading"
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Feature cards */}
        <Grid container spacing={3}>
          {[
            { icon: <AccountBalanceIcon />, title: "Zero Slippage", desc: "Execute large orders at a single price with no market impact. Guaranteed execution at quoted price.", color: "#22c55e" },
            { icon: <TollIcon />, title: "Competitive Pricing", desc: "Tight spreads sourced from 20+ institutional liquidity providers with real-time pricing.", color: "#3b82f6" },
            { icon: <PaymentIcon />, title: "Flexible Settlement", desc: "Settle in fiat or crypto with T+0 to T+2 settlement options. Supports USD, EUR, GBP, and 40+ currencies.", color: "#8b5cf6" },
            { icon: <SupportAgentIcon />, title: "Dedicated Trader", desc: "Personal OTC trader available 24/7 for custom execution strategies and market color.", color: "#06b6d4" },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} className="feature-card-animated hover-lift" sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${f.color}15 0%, ${f.color}05 100%)`,
                    border: `1px solid ${f.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    color: f.color,
                  }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* How It Works - Creative step flow */}
        <Box sx={{ mt: 8, position: "relative" }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>How It Works</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Simple 4-step process for institutional OTC trades</Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { step: "01", title: "Request a Quote", desc: "Contact our OTC desk via API, chat, or phone with your desired trade parameters.", color: "#3b82f6" },
              { step: "02", title: "Receive Pricing", desc: "Get a competitive, firm quote within seconds from our aggregated liquidity pool.", color: "#8b5cf6" },
              { step: "03", title: "Confirm & Execute", desc: "Confirm the trade and receive instant execution confirmation with full audit trail.", color: "#22c55e" },
              { step: "04", title: "Settle", desc: "Funds settle instantly to your MATBEA account or external wallet/bank account.", color: "#06b6d4" },
            ].map((s, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Box sx={{
                  p: 3,
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 3,
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.04)",
                    borderColor: `${s.color}30`,
                    transform: "translateY(-4px)",
                  },
                }}>
                  {/* Step number with gradient */}
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${s.color}20 0%, ${s.color}05 100%)`,
                    border: `1px solid ${s.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}>
                    <Typography variant="h6" sx={{
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      {s.step}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{s.desc}</Typography>

                  {/* Connector line for desktop */}
                  {i < 3 && (
                    <Box sx={{
                      display: { xs: "none", md: "block" },
                      position: "absolute",
                      top: "50%",
                      right: -16,
                      width: 32,
                      height: 2,
                      background: `linear-gradient(90deg, ${s.color}40, transparent)`,
                      zIndex: 1,
                    }} />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Minimum Trade Sizes - Visual cards */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Minimum Trade Sizes</Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}>Institutional minimums for OTC execution</Typography>

          <Grid container spacing={2}>
            {[
              { asset: "BTC", min: "1 BTC", usd: "~$67,000", color: "#f59e0b" },
              { asset: "ETH", min: "10 ETH", usd: "~$35,000", color: "#3b82f6" },
              { asset: "SOL", min: "100 SOL", usd: "~$17,000", color: "#8b5cf6" },
              { asset: "Stablecoins", min: "$10,000", usd: "USDT/USDC", color: "#22c55e" },
              { asset: "Fiat", min: "$10,000", usd: "USD/EUR/GBP", color: "#06b6d4" },
              { asset: "Other", min: "Varies", usd: "by asset", color: "#6b7280" },
            ].map((item, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
                <Box sx={{
                  textAlign: "center",
                  p: 2.5,
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.04)",
                    borderColor: `${item.color}30`,
                  },
                }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%)`,
                    border: `1px solid ${item.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1.5,
                  }}>
                    <Typography variant="subtitle2" sx={{
                      fontWeight: 800,
                      color: item.color,
                      fontSize: "0.75rem",
                    }}>
                      {item.asset.substring(0, 3)}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700, mb: 0.5, fontSize: "0.9rem" }}>{item.asset}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: "block" }}>{item.min}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem" }}>{item.usd}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <CTASection title="Request OTC Quote" subtitle="Speak with our trading desk for competitive pricing on large orders." primaryAction={{ label: "Contact Trading Desk", path: "/products/enterprise" }} secondaryAction={{ label: "View Fee Schedule", path: "/compliance/institutional-fees" }} />
    </Box>
  );
}

function CustodyPage() {
  return (
    <Box>
      <PageHeader
        title="Institutional Custody"
        subtitle="Protect your digital assets with our SOC 2 Type II certified custody solution. Multi-signature cold storage backed by $250M insurance coverage."
        badge="Custody"
        variant="security"
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Security feature cards */}
        <Grid container spacing={3}>
          {[
            { icon: <ShieldIcon />, title: "$250M Insurance", desc: "Comprehensive insurance coverage against theft, fraud, and employee dishonesty.", color: "#f59e0b" },
            { icon: <LockIcon />, title: "Multi-Sig Cold Storage", desc: "Air-gapped cold storage with 3-of-5 multi-signature authorization for all withdrawals.", color: "#ef4444" },
            { icon: <VerifiedUserIcon />, title: "SOC 2 Type II", desc: "Audited annually by Big Four firms with full compliance reports available on request.", color: "#22c55e" },
            { icon: <GavelIcon />, title: "Regulatory Compliance", desc: "Licensed custodian in multiple jurisdictions with full segregation of client assets.", color: "#3b82f6" },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} className="feature-card-animated hover-lift" sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${f.color}15 0%, ${f.color}05 100%)`,
                    border: `1px solid ${f.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    color: f.color,
                  }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Security Architecture - Visual layout */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Security Architecture</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Multi-layered defense protecting your digital assets</Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { title: "Key Sharding", desc: "Private keys split into 5 shards across geographically distributed HSMs. No single shard can reconstruct the key.", icon: "01", color: "#f59e0b" },
              { title: "Geographic Distribution", desc: "Vaults located in Zurich, Singapore, and New York with biometric access controls and 24/7 armed security.", icon: "02", color: "#ef4444" },
              { title: "Audit Trail", desc: "Every action logged immutably with timestamp and actor identity. Full audit reports available via API.", icon: "03", color: "#3b82f6" },
              { title: "Withdrawal Controls", desc: "Configurable withdrawal limits, whitelisted addresses, and time-locked transactions for enhanced security.", icon: "04", color: "#8b5cf6" },
            ].map((item, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Box sx={{
                  p: 3,
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.04)",
                    borderColor: `${item.color}30`,
                    "& .security-number": {
                      opacity: 0.15,
                    },
                  },
                }}>
                  {/* Background number */}
                  <Typography
                    className="security-number"
                    sx={{
                      position: "absolute",
                      top: -20,
                      right: -10,
                      fontSize: "8rem",
                      fontWeight: 900,
                      color: item.color,
                      opacity: 0.05,
                      lineHeight: 1,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                    }}
                  >
                    {item.icon}
                  </Typography>

                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}05 100%)`,
                      border: `1px solid ${item.color}30`,
                      mb: 2,
                    }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: item.color, fontSize: "0.7rem" }}>{item.icon}</Typography>
                    </Box>

                    <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Supported Assets */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 3, fontWeight: 700 }}>Supported Assets</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOT", "AVAX", "LINK", "MATIC", "USDT", "USDC", "DAI", "AND 150+ MORE"].map((asset, i) => (
              <Chip
                key={asset}
                label={asset}
                sx={{
                  bgcolor: i === 13 ? "rgba(59, 130, 246, 0.1)" : "rgba(255,255,255,0.04)",
                  color: i === 13 ? "#60a5fa" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${i === 13 ? "rgba(59, 130, 246, 0.2)" : "rgba(255,255,255,0.08)"}`,
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
      <CTASection title="Secure Your Assets" subtitle="Get a custom custody solution tailored to your organization's needs." primaryAction={{ label: "Contact Sales", path: "/products/enterprise" }} secondaryAction={{ label: "View Security", path: "/resources/security" }} />
    </Box>
  );
}

function SettlementPage() {
  return (
    <Box>
      <PageHeader title="Settlement" subtitle="Experience T+0 instant settlement with our proprietary settlement infrastructure. Reduce counterparty risk and free up capital with real-time gross settlement." badge="Settlement" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            { icon: <SpeedIcon />, title: "T+0 Settlement", desc: "All trades settle instantly on-chain or within our internal ledger. No waiting for batch processing." },
            { icon: <SecurityIcon />, title: "Atomic Settlement", desc: "Delivery-versus-payment atomic swaps eliminate counterparty risk for all transactions." },
            { icon: <AccountBalanceWalletIcon />, title: "Multi-Currency", desc: "Settle in 40+ fiat currencies and all supported cryptocurrencies with competitive FX rates." },
            { icon: <TimelineIcon />, title: "Real-Time Reporting", desc: "Track settlement status in real-time with comprehensive reporting and reconciliation tools." },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#fff" }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Settlement Options</Typography>
          <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "transparent" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Method", "Settlement Time", "Supported Currencies", "Fee"].map((h) => (
                    <TableCell key={h} sx={{ color: "#666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { method: "Internal Ledger", time: "Instant", currencies: "All", fee: "Free" },
                  { method: "On-Chain (BTC)", time: "~10 min", currencies: "BTC", fee: "Network fee" },
                  { method: "On-Chain (ETH)", time: "~15 sec", currencies: "ETH, ERC-20", fee: "Gas fee" },
                  { method: "On-Chain (SOL)", time: "~2 sec", currencies: "SOL, SPL", fee: "$0.00025" },
                  { method: "Wire Transfer", time: "Same day", currencies: "USD, EUR, GBP", fee: "$25" },
                  { method: "SWIFT", time: "1-2 days", currencies: "40+ fiat", fee: "$45" },
                ].map((row) => (
                  <TableRow key={row.method} sx={{ "& td": { borderBottom: "1px solid rgba(255,255,255,0.04)" } }}>
                    <TableCell sx={{ color: "#fff", fontWeight: 600 }}>{row.method}</TableCell>
                    <TableCell sx={{ color: "#22c55e" }}>{row.time}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.currencies}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <CTASection title="Optimize Your Settlement" subtitle="Reduce settlement risk and free up capital with instant settlement." primaryAction={{ label: "Get Started", path: "/products/enterprise" }} secondaryAction={{ label: "View API Docs", path: "/resources/api-reference" }} />
    </Box>
  );
}

function APIAccessPage() {
  return (
    <Box>
      <PageHeader title="API Access" subtitle="Build powerful trading applications with our REST and WebSocket APIs. Full access to market data, trading, and account management endpoints." badge="API" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            { icon: <ApiIcon />, title: "REST API", desc: "Complete REST API with 500+ endpoints for trading, account management, and market data retrieval." },
            { icon: <LanIcon />, title: "WebSocket Streams", desc: "Real-time market data and order updates via persistent WebSocket connections with <10ms latency." },
            { icon: <CodeIcon />, title: "FIX Protocol", desc: "Industry-standard FIX 4.4 protocol support for high-frequency trading and legacy system integration." },
            { icon: <BuildIcon />, title: "SDKs & Libraries", desc: "Official client libraries in Python, JavaScript, Go, Java, and Rust with comprehensive documentation." },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#fff" }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>API Rate Limits</Typography>
          <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "transparent" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Tier", "REST Requests", "WebSocket Connections", "Orders/sec"].map((h) => (
                    <TableCell key={h} sx={{ color: "#666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { tier: "Standard", rest: "1,200/min", ws: "10", orders: "10" },
                  { tier: "Professional", rest: "12,000/min", ws: "50", orders: "100" },
                  { tier: "Enterprise", rest: "120,000/min", ws: "200", orders: "1,000" },
                  { tier: "Market Maker", rest: "600,000/min", ws: "500", orders: "10,000" },
                ].map((row) => (
                  <TableRow key={row.tier} sx={{ "& td": { borderBottom: "1px solid rgba(255,255,255,0.04)" } }}>
                    <TableCell sx={{ color: "#fff", fontWeight: 600 }}>{row.tier}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.rest}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.ws}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ mt: 4, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>Code Example</Typography>
          <Box component="pre" sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 1.5, p: 2.5, overflow: "auto", color: "#999", fontFamily: "monospace", fontSize: "0.82rem", lineHeight: 1.8 }}>
{`import MATBEA from '@matbea/sdk';

const client = new MATBEA({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
});

// Get market data
const ticker = await client.market.ticker('BTC-USDT');
console.log(ticker.price); // 67432.18

// Place a limit order
const order = await client.trade.order({
  symbol: 'BTC-USDT',
  side: 'buy',
  type: 'limit',
  price: 67000,
  quantity: 0.5,
});
console.log(order.id); // "ord_abc123"`}
          </Box>
        </Box>
      </Container>
      <CTASection title="Start Building" subtitle="Get your API keys and start integrating with MATBEA today." primaryAction={{ label: "View API Reference", path: "/resources/api-reference" }} secondaryAction={{ label: "Get API Keys", path: "/products/enterprise" }} />
    </Box>
  );
}

function EnterprisePage() {
  return (
    <Box>
      <PageHeader
        title="Enterprise Solutions"
        subtitle="Custom-built crypto infrastructure for institutions. From dedicated infrastructure to custom integrations, we build solutions that scale with your business."
        badge="Enterprise"
        variant="enterprise"
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Feature cards */}
        <Grid container spacing={3}>
          {[
            { icon: <BusinessCenterIcon />, title: "Dedicated Infrastructure", desc: "Isolated matching engine, custody, and network infrastructure for maximum performance and security.", color: "#8b5cf6" },
            { icon: <AccountTreeIcon />, title: "Custom Integrations", desc: "Tailored API integrations with your existing OMS, EMS, and accounting systems.", color: "#3b82f6" },
            { icon: <WorkIcon />, title: "White Label Solutions", desc: "Launch your own branded crypto exchange with our turnkey white-label platform.", color: "#22c55e" },
            { icon: <SupportAgentIcon />, title: "Priority Support", desc: "Dedicated account team with 24/7 support and guaranteed response times under 15 minutes.", color: "#06b6d4" },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} className="feature-card-animated hover-lift" sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${f.color}15 0%, ${f.color}05 100%)`,
                    border: `1px solid ${f.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    color: f.color,
                  }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Enterprise Plans - Enhanced pricing */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Enterprise Plans</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Scalable pricing for teams of all sizes</Typography>
          </Box>

          <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
            {[
              { name: "Professional", price: "$2,500", period: "/month", features: ["Up to 50 API keys", "100K trades/month", "Standard custody", "Email support", "Basic reporting"], popular: false, color: "#6b7280" },
              { name: "Enterprise", price: "$10,000", period: "/month", features: ["Unlimited API keys", "Unlimited trades", "Institutional custody", "24/7 priority support", "Custom integrations", "Dedicated account manager"], popular: true, color: "#8b5cf6" },
              { name: "Custom", price: "Contact Us", period: "", features: ["Dedicated infrastructure", "White-label options", "Custom SLA", "On-site support", "Regulatory assistance", "Custom fee structure"], popular: false, color: "#3b82f6" },
            ].map((plan, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Card
                  elevation={0}
                  className={plan.popular ? "pricing-popular" : ""}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: plan.popular ? "0 20px 60px rgba(139, 92, 246, 0.15)" : "0 12px 40px rgba(0,0,0,0.3)",
                    },
                  }}
                >
                  {plan.popular && (
                    <Box sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                    }} />
                  )}

                  <CardContent sx={{ p: 3.5, flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Plan header */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        <Box sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "10px",
                          background: `linear-gradient(135deg, ${plan.color}20 0%, ${plan.color}05 100%)`,
                          border: `1px solid ${plan.color}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: plan.color, fontSize: "0.7rem" }}>
                            {i === 0 ? "PRO" : i === 1 ? "ENT" : "CUS"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700 }}>{plan.name}</Typography>
                          {plan.popular && (
                            <Chip
                              label="Most Popular"
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                bgcolor: "rgba(139, 92, 246, 0.15)",
                                color: "#a78bfa",
                                border: "1px solid rgba(139, 92, 246, 0.25)",
                              }}
                            />
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                        <Typography variant="h3" sx={{ color: "#fff", fontWeight: 800, fontSize: "2rem" }}>{plan.price}</Typography>
                        {plan.period && (
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>{plan.period}</Typography>
                        )}
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2.5 }} />

                    {/* Features list */}
                    <Box sx={{ flex: 1 }}>
                      {plan.features.map((f, j) => (
                        <Box key={j} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                          <Box sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            bgcolor: "rgba(34, 197, 94, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            <CheckCircleOutlinedIcon sx={{ fontSize: 14, color: "#4ade80" }} />
                          </Box>
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>{f}</Typography>
                        </Box>
                      ))}
                    </Box>

                    <Button
                      variant={plan.popular ? "contained" : "outlined"}
                      fullWidth
                      sx={{
                        mt: 3,
                        py: 1.5,
                        fontWeight: 700,
                        ...(plan.popular ? {
                          background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                          color: "#fff",
                          "&:hover": {
                            background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
                          },
                        } : {
                          borderColor: "rgba(255,255,255,0.15)",
                          color: "#fff",
                          "&:hover": {
                            borderColor: "rgba(255,255,255,0.3)",
                            bgcolor: "rgba(255,255,255,0.03)",
                          },
                        }),
                      }}
                    >
                      {i === 2 ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <CTASection title="Discuss Your Needs" subtitle="Our enterprise team will design a custom solution for your organization." primaryAction={{ label: "Contact Sales", path: "/partners" }} secondaryAction={{ label: "View Case Studies", path: "/solutions/case-studies" }} />
    </Box>
  );
}

function SolutionsPage() {
  return (
    <Box>
      <PageHeader title="Solutions" subtitle="End-to-end crypto infrastructure solutions designed for institutional investors, corporates, and fintech platforms." badge="Solutions" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            { icon: <TrendingUpOutlinedIcon />, title: "Asset Managers", desc: "Portfolio management, rebalancing tools, and institutional custody for digital asset funds." },
            { icon: <AccountBalanceIcon />, title: "Banks & Fintech", desc: "White-label crypto services, API integrations, and regulatory-compliant infrastructure." },
            { icon: <HandshakeIcon />, title: "Market Makers", desc: "Co-located infrastructure, competitive fee tiers, and high-frequency trading support." },
            { icon: <BusinessCenterIcon />, title: "Corporates", desc: "Treasury management, crypto payroll, and corporate-grade security for business operations." },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: "rgba(255,255,255,0.15)" }, cursor: "pointer" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#fff" }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <CTASection title="Find Your Solution" subtitle="Let our team design a custom infrastructure package for your use case." primaryAction={{ label: "Contact Sales", path: "/products/enterprise" }} secondaryAction={{ label: "View Case Studies", path: "/solutions/case-studies" }} />
    </Box>
  );
}

function CaseStudiesPage() {
  return (
    <Box>
      <PageHeader title="Case Studies" subtitle="See how leading institutions use MATBEA Enterprise to power their crypto operations." badge="Case Studies" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            { company: "Vertex Capital", type: "Hedge Fund", result: "3x Improvement", desc: "Vertex Capital reduced execution costs by 65% and improved fill rates to 99.7% using MATBEA's OTC desk and algorithmic trading APIs.", metrics: ["$2.3B monthly volume", "65% cost reduction", "99.7% fill rate"] },
            { company: "NovaPay", type: "Fintech", result: "10x Scale", desc: "NovaPay integrated MATBEA's custody and settlement APIs to launch crypto payments for 2M+ users across 40 countries.", metrics: ["2M+ users", "40 countries", "99.99% uptime"] },
            { company: "Atlas Digital", type: "Market Maker", result: "50% Latency Cut", desc: "Atlas Digital co-located with MATBEA's matching engine, achieving sub-millisecond execution and processing 50K orders/second.", metrics: ["50K orders/sec", "<100μs latency", "$50B+ monthly volume"] },
            { company: "Meridian Bank", type: "Banking", result: "Full Compliance", desc: "Meridian Bank launched crypto custody services for HNW clients using MATBEA's regulated custody infrastructure.", metrics: ["$500M AUC", "Full regulatory approval", "Zero security incidents"] },
          ].map((study, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: "rgba(255,255,255,0.15)" }, cursor: "pointer" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>{study.company}</Typography>
                      <Typography variant="caption" sx={{ color: "#666" }}>{study.type}</Typography>
                    </Box>
                    <Chip label={study.result} size="small" sx={{ bgcolor: "rgba(34, 197, 94, 0.1)", color: "#22c55e", fontWeight: 600 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.7, mb: 2 }}>{study.desc}</Typography>
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {study.metrics.map((m, j) => (
                      <Typography key={j} variant="caption" sx={{ color: "#666", bgcolor: "rgba(255,255,255,0.05)", px: 1.5, py: 0.5, borderRadius: 1 }}>{m}</Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <CTASection title="Write Your Success Story" subtitle="Join 2,400+ enterprises transforming their crypto operations with MATBEA." primaryAction={{ label: "Contact Sales", path: "/products/enterprise" }} secondaryAction={{ label: "View Solutions", path: "/solutions" }} />
    </Box>
  );
}

function InstitutionalFeesPage() {
  return (
    <Box>
      <PageHeader title="Institutional Fees" subtitle="Transparent, volume-based pricing designed for institutional traders. Lower fees as your volume grows." badge="Fees" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Trading Fee Tiers</Typography>
          <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Tier", "30-Day Volume", "Maker Fee", "Taker Fee", "OTC Fee"].map((h) => (
                    <TableCell key={h} sx={{ color: "#666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { tier: "Standard", volume: "< $1M", maker: "0.10%", taker: "0.15%", otc: "0.10%" },
                  { tier: "Gold", volume: "$1M - $10M", maker: "0.08%", taker: "0.12%", otc: "0.08%" },
                  { tier: "Platinum", volume: "$10M - $50M", maker: "0.05%", taker: "0.08%", otc: "0.05%" },
                  { tier: "Diamond", volume: "$50M - $200M", maker: "0.03%", taker: "0.05%", otc: "0.03%" },
                  { tier: "Custom", volume: "> $200M", maker: "0.02%", taker: "0.03%", otc: "0.02%" },
                ].map((row) => (
                  <TableRow key={row.tier} className="table-row-hover" sx={{ "& td": { borderBottom: "1px solid rgba(255,255,255,0.04)" } }}>
                    <TableCell sx={{ color: "#fff", fontWeight: 600 }}>{row.tier}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.volume}</TableCell>
                    <TableCell sx={{ color: "#22c55e" }}>{row.maker}</TableCell>
                    <TableCell sx={{ color: "#f59e0b" }}>{row.taker}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.otc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: 3 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>Custody Fees</Typography>
              {[
                { asset: "BTC/ETH", fee: "0.50% annual" },
                { asset: "Other crypto", fee: "1.00% annual" },
                { asset: "Stablecoins", fee: "0.25% annual" },
                { asset: "Minimum", fee: "$10,000/year" },
              ].map((item, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <Typography variant="body2" sx={{ color: "#999" }}>{item.asset}</Typography>
                  <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>{item.fee}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: 3 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>Withdrawal Fees</Typography>
              {[
                { asset: "BTC", fee: "0.0005 BTC" },
                { asset: "ETH", fee: "0.005 ETH" },
                { asset: "SOL", fee: "0.01 SOL" },
                { asset: "Wire (USD)", fee: "$25" },
              ].map((item, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <Typography variant="body2" sx={{ color: "#999" }}>{item.asset}</Typography>
                  <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>{item.fee}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CTASection title="Volume Discounts Available" subtitle="Contact our sales team for custom pricing on high-volume trading." primaryAction={{ label: "Contact Sales", path: "/products/enterprise" }} secondaryAction={{ label: "Open Account", path: "/products/spot-trading" }} />
    </Box>
  );
}

function PartnersPage() {
  return (
    <Box>
      <PageHeader title="Partners" subtitle="Join our ecosystem of technology partners, liquidity providers, and institutional collaborators building the future of digital finance." badge="Partners" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            { icon: <HandshakeIcon />, title: "Technology Partners", desc: "Integrate with leading fintech platforms, OMS/EMS providers, and custody solutions." },
            { icon: <TrendingUpOutlinedIcon />, title: "Liquidity Providers", desc: "Access our network of 20+ institutional market makers for deep, aggregated liquidity." },
            { icon: <AccountBalanceIcon />, title: "Institutional Partners", desc: "Co-create products and services for the institutional digital asset ecosystem." },
            { icon: <CloudIcon />, title: "Cloud & Infrastructure", desc: "Leverage our partnerships with AWS, Google Cloud, and Azure for resilient infrastructure." },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: "rgba(255,255,255,0.15)" } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#fff" }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Partner Benefits</Typography>
          <Grid container spacing={2}>
            {[
              "Revenue sharing on referred clients",
              "Co-marketing and brand exposure",
              "Early access to new features",
              "Dedicated partner support",
              "Joint product development",
              "Industry event sponsorship",
            ].map((benefit, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CheckCircleOutlinedIcon sx={{ color: "#22c55e", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>{benefit}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <CTASection title="Become a Partner" subtitle="Join our growing ecosystem and build the future of digital finance together." primaryAction={{ label: "Apply Now", path: "/products/enterprise" }} secondaryAction={{ label: "Learn More", path: "/solutions" }} />
    </Box>
  );
}

function DocumentationPage() {
  return (
    <Box>
      <PageHeader title="Documentation" subtitle="Comprehensive guides, tutorials, and reference materials to help you integrate with MATBEA Enterprise." badge="Resources" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            { icon: <MenuBookIcon />, title: "Getting Started", desc: "Step-by-step guide to setting up your account, generating API keys, and making your first trade." },
            { icon: <CodeIcon />, title: "API Reference", desc: "Complete reference for all REST and WebSocket endpoints with request/response examples." },
            { icon: <DescriptionIcon />, title: "Guides & Tutorials", desc: "In-depth guides on trading strategies, custody setup, compliance, and more." },
            { icon: <SecurityIcon />, title: "Security Best Practices", desc: "Recommendations for securing your API keys, accounts, and operational workflows." },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: "rgba(255,255,255,0.15)" }, cursor: "pointer" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#fff" }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Quick Start</Typography>
          <Box component="pre" sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 1.5, p: 2.5, overflow: "auto", color: "#999", fontFamily: "monospace", fontSize: "0.82rem", lineHeight: 1.8 }}>
{`# Install the SDK
npm install @matbea/sdk

# Or using yarn
yarn add @matbea/sdk

# Set your API keys
export MATBEA_API_KEY="your-api-key"
export MATBEA_API_SECRET="your-api-secret"

# Run the quick start script
npx @matbea/quickstart`}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function APIReferencePage() {
  return (
    <Box>
      <PageHeader title="API Reference" subtitle="Complete reference for all MATBEA Enterprise API endpoints. REST and WebSocket documentation with interactive examples." badge="API" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            { title: "Authentication", desc: "API key management, HMAC signing, and session tokens.", methods: ["POST /auth/token", "POST /auth/revoke"] },
            { title: "Market Data", desc: "Real-time and historical market data endpoints.", methods: ["GET /markets/ticker", "GET /markets/depth", "GET /markets/trades"] },
            { title: "Trading", desc: "Order management, execution, and position tracking.", methods: ["POST /orders", "DELETE /orders/{id}", "GET /orders"] },
            { title: "Account", desc: "Balance, portfolio, and account management.", methods: ["GET /account/balances", "GET /account/portfolio", "GET /account/history"] },
            { title: "Custody", desc: "Wallet management and withdrawal operations.", methods: ["POST /custody/withdraw", "GET /custody/deposits", "GET /custody/address"] },
            { title: "WebSocket", desc: "Real-time data streams for market data and orders.", methods: ["wss://stream.matbea.com/ticker", "wss://stream.matbea.com/orders"] },
          ].map((section, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>{section.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>{section.desc}</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    {section.methods.map((method, j) => (
                      <Box key={j} sx={{ bgcolor: "rgba(255,255,255,0.03)", px: 1.5, py: 0.75, borderRadius: 1, fontFamily: "monospace", fontSize: "0.78rem", color: "#999" }}>
                        {method}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function StatusPage() {
  const services = [
    { name: "REST API", status: "Operational", uptime: "99.99%", color: "#22c55e" },
    { name: "WebSocket API", status: "Operational", uptime: "99.99%", color: "#22c55e" },
    { name: "Trading Engine", status: "Operational", uptime: "99.99%", color: "#22c55e" },
    { name: "Custody System", status: "Operational", uptime: "100%", color: "#22c55e" },
    { name: "OTC Desk", status: "Operational", uptime: "99.98%", color: "#22c55e" },
    { name: "Fiat On-Ramp", status: "Degraded Performance", uptime: "99.85%", color: "#f59e0b" },
    { name: "Mobile App", status: "Operational", uptime: "99.97%", color: "#22c55e" },
    { name: "Web Dashboard", status: "Operational", uptime: "99.99%", color: "#22c55e" },
  ];

  return (
    <Box>
      <PageHeader
        title="System Status"
        subtitle="Real-time status of all MATBEA Enterprise services and infrastructure."
        badge="Status"
        variant="trading"
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Overall status banner */}
        <Box sx={{
          mb: 4,
          p: 3,
          bgcolor: "rgba(34, 197, 94, 0.05)",
          border: "1px solid rgba(34, 197, 94, 0.15)",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            bgcolor: "rgba(34, 197, 94, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#22c55e",
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
            }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: "#4ade80", fontWeight: 700 }}>All Systems Operational</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Last updated: 2 minutes ago</Typography>
          </Box>
        </Box>

        {/* Services list */}
        <Box sx={{
          bgcolor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 3,
          overflow: "hidden",
        }}>
          {services.map((service, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 2.5,
                borderBottom: i < services.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: service.color,
                  boxShadow: `0 0 10px ${service.color}50`,
                  position: "relative",
                }}>
                  {service.color === "#f59e0b" && (
                    <Box sx={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: `${service.color}30`,
                      animation: "ripple 2s ease-out infinite",
                    }} />
                  )}
                </Box>
                <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>{service.name}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Chip
                  label={service.status}
                  size="small"
                  sx={{
                    bgcolor: `${service.color}15`,
                    color: service.color,
                    border: `1px solid ${service.color}25`,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>
                  {service.uptime}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* 90-Day Uptime History */}
        <Box sx={{ mt: 6, p: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>90-Day Uptime History</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: 2, bgcolor: "#22c55e" }} />
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>99.95%+</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: 2, bgcolor: "#f59e0b" }} />
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>99.9%+</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: 2, bgcolor: "#ef4444" }} />
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>&lt;99.9%</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {Array.from({ length: 90 }, (_, i) => {
              const uptime = i === 47 ? 99.85 : 99.95 + Math.random() * 0.05;
              return (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: uptime >= 99.95 ? "#22c55e" : uptime >= 99.9 ? "#f59e0b" : "#ef4444",
                    opacity: 0.7,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 1,
                      transform: "scaleY(1.3)",
                    },
                  }}
                  title={`Day ${90 - i}: ${uptime.toFixed(2)}%`}
                />
              );
            })}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5 }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>90 days ago</Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>Today</Typography>
          </Box>
        </Box>

        {/* Stats cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[
            { value: "99.99%", label: "Overall Uptime (30d)", color: "#22c55e" },
            { value: "0", label: "Major Incidents (30d)", color: "#3b82f6" },
            { value: "< 50ms", label: "Avg Response Time", color: "#8b5cf6" },
          ].map((stat, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Box sx={{
                p: 3,
                textAlign: "center",
                bgcolor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderColor: `${stat.color}30`,
                },
              }}>
                <Typography variant="h3" sx={{
                  fontWeight: 800,
                  mb: 0.5,
                  fontSize: "2rem",
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function SecurityPage() {
  return (
    <Box>
      <PageHeader
        title="Security"
        subtitle="MATBEA Enterprise employs military-grade security measures to protect your assets and data. Our security infrastructure is audited by leading firms."
        badge="Security"
        variant="security"
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3}>
          {[
            { icon: <ShieldIcon />, title: "Cold Storage", desc: "95% of client assets stored in air-gapped cold wallets with multi-signature authorization.", color: "#f59e0b" },
            { icon: <SecurityIcon />, title: "SOC 2 Type II", desc: "Annual audits by Deloitte with full reports available under NDA.", color: "#22c55e" },
            { icon: <LockIcon />, title: "Encryption", desc: "AES-256 encryption at rest, TLS 1.3 in transit. All keys managed via HSMs.", color: "#3b82f6" },
            { icon: <VerifiedUserIcon />, title: "Bug Bounty", desc: "Active bug bounty program with rewards up to $100,000 for critical vulnerabilities.", color: "#8b5cf6" },
            { icon: <HealthAndSafetyIcon />, title: "Insurance", desc: "$250M insurance policy covering theft, fraud, and employee dishonesty.", color: "#ef4444" },
            { icon: <GavelIcon />, title: "Compliance", desc: "Licensed in 15+ jurisdictions with full AML/KYC and regulatory compliance.", color: "#06b6d4" },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card elevation={0} className="feature-card-animated hover-lift" sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${f.color}15 0%, ${f.color}05 100%)`,
                    border: `1px solid ${f.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    color: f.color,
                  }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Security Certifications */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Security Certifications</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Industry-leading compliance and security standards</Typography>
          </Box>

          <Grid container spacing={2}>
            {[
              { name: "SOC 2 Type II", color: "#22c55e" },
              { name: "ISO 27001", color: "#3b82f6" },
              { name: "PCI DSS Level 1", color: "#8b5cf6" },
              { name: "GDPR Compliant", color: "#06b6d4" },
              { name: "CCSS Level III", color: "#f59e0b" },
              { name: "NIST Framework", color: "#ef4444" },
            ].map((cert, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
                <Box sx={{
                  textAlign: "center",
                  p: 2.5,
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.04)",
                    borderColor: `${cert.color}30`,
                    transform: "translateY(-4px)",
                  },
                }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${cert.color}15 0%, ${cert.color}05 100%)`,
                    border: `1px solid ${cert.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1.5,
                  }}>
                    <GppGoodIcon sx={{ color: cert.color, fontSize: 24 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>{cert.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <CTASection title="Report a Vulnerability" subtitle="Help us keep the platform secure. Report security issues through our bug bounty program." primaryAction={{ label: "Bug Bounty Program", path: "/resources/bug-bounty" }} secondaryAction={{ label: "Contact Security", path: "/products/enterprise" }} />
    </Box>
  );
}

function BugBountyPage() {
  return (
    <Box>
      <PageHeader title="Bug Bounty Program" subtitle="Help us identify and fix security vulnerabilities. Earn rewards up to $100,000 for critical findings." badge="Security" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Reward Tiers</Typography>
          <Grid container spacing={2}>
            {[
              { severity: "Critical", reward: "$50,000 - $100,000", desc: "Remote code execution, authentication bypass, fund theft", color: "#ef4444" },
              { severity: "High", reward: "$10,000 - $50,000", desc: "Privilege escalation, significant data exposure, DoS on critical systems", color: "#f59e0b" },
              { severity: "Medium", reward: "$2,000 - $10,000", desc: "Limited data exposure, CSRF on sensitive endpoints, XSS with impact", color: "#22d3ee" },
              { severity: "Low", reward: "$500 - $2,000", desc: "Information disclosure, minor CSRF, non-sensitive data exposure", color: "#22c55e" },
            ].map((tier, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Card elevation={0} sx={{ borderLeft: `3px solid ${tier.color}` }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="h6" sx={{ color: tier.color, fontWeight: 700 }}>{tier.severity}</Typography>
                      <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>{tier.reward}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#666" }}>{tier.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Scope</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ color: "#22c55e", mb: 1 }}>In Scope</Typography>
              {["*.matbea.com", "API endpoints (REST & WebSocket)", "Mobile applications (iOS & Android)", "Custody infrastructure", "Authentication systems"].map((item, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <CheckCircleOutlinedIcon sx={{ color: "#22c55e", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>{item}</Typography>
                </Box>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ color: "#ef4444", mb: 1 }}>Out of Scope</Typography>
              {["Third-party services", "Social engineering", "Physical attacks", "Denial of service attacks", "Issues already reported"].map((item, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography sx={{ color: "#ef4444", fontSize: 18, fontWeight: 700 }}>×</Typography>
                  <Typography variant="body2" sx={{ color: "#999" }}>{item}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>Submission Guidelines</Typography>
          <Box component="ol" sx={{ color: "#999", pl: 3, "& li": { mb: 1, lineHeight: 1.7 } }}>
            <li>Report vulnerabilities via email to security@matbea.com</li>
            <li>Include detailed reproduction steps and proof of concept</li>
            <li>Allow 90 days for resolution before public disclosure</li>
            <li>Do not access or modify data belonging to other users</li>
            <li>Submit only one vulnerability per report</li>
            <li>Provide your contact information for follow-up</li>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function TermsPage() {
  return (
    <Box>
      <PageHeader title="Terms of Service" subtitle="Please read these terms carefully before using MATBEA Enterprise services." badge="Legal" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>Last updated: January 15, 2026</Typography>
          {[
            { title: "1. Acceptance of Terms", content: "By accessing or using MATBEA Enterprise services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services." },
            { title: "2. Eligibility", content: "MATBEA Enterprise services are available only to institutional investors, accredited investors, and qualified purchasers as defined by applicable securities laws. You must be at least 18 years old and have the legal capacity to enter into binding agreements." },
            { title: "3. Account Registration", content: "To use our services, you must complete the institutional onboarding process, including KYC/KYB verification, and execute all required agreements. You are responsible for maintaining the confidentiality of your account credentials." },
            { title: "4. Services", content: "MATBEA Enterprise provides institutional-grade cryptocurrency trading, custody, and settlement services. We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice." },
            { title: "5. Fees", content: "Trading fees, custody fees, and other charges are set forth in our Fee Schedule, which is incorporated by reference into these Terms. We reserve the right to modify fees with 30 days' notice." },
            { title: "6. Risk Disclosure", content: "Cryptocurrency investments carry significant risk, including but not limited to market volatility, regulatory changes, and technology failures. You acknowledge and accept these risks." },
            { title: "7. Limitation of Liability", content: "MATBEA Enterprise shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues." },
            { title: "8. Governing Law", content: "These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions." },
          ].map((section, i) => (
            <Box key={i} sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>{section.title}</Typography>
              <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>{section.content}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function PrivacyPage() {
  return (
    <Box>
      <PageHeader title="Privacy Policy" subtitle="How MATBEA Enterprise collects, uses, and protects your personal information." badge="Legal" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>Last updated: January 15, 2026</Typography>
          {[
            { title: "1. Information We Collect", content: "We collect personal information you provide during account registration (name, email, organization details), verification documents (government ID, proof of address), and usage data (IP address, device information, trading activity)." },
            { title: "2. How We Use Your Information", content: "We use your information to provide and improve our services, comply with legal obligations, prevent fraud, communicate with you, and analyze usage patterns to enhance our platform." },
            { title: "3. Information Sharing", content: "We do not sell your personal information. We may share data with service providers, regulators, law enforcement, and as required by law. We may share aggregated, non-identifiable data for research purposes." },
            { title: "4. Data Security", content: "We implement industry-standard security measures including encryption, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure." },
            { title: "5. Data Retention", content: "We retain your information for as long as your account is active or as needed to provide services. We may retain certain information as required by law or for legitimate business purposes." },
            { title: "6. Your Rights", content: "Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data. Contact our Data Protection Officer at dpo@matbea.com to exercise these rights." },
            { title: "7. International Transfers", content: "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers." },
            { title: "8. Contact Us", content: "For privacy-related inquiries, contact our Data Protection Officer at dpo@matbea.com or write to: MATBEA Enterprise, Attn: Privacy Office, 100 Wall Street, Suite 2400, New York, NY 10005." },
          ].map((section, i) => (
            <Box key={i} sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>{section.title}</Typography>
              <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>{section.content}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function AMLKYCPage() {
  return (
    <Box>
      <PageHeader title="AML/KYC Policy" subtitle="MATBEA Enterprise is committed to preventing money laundering and terrorist financing through rigorous compliance procedures." badge="Legal" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            { icon: <VisibilityIcon />, title: "Transaction Monitoring", desc: "Real-time monitoring of all transactions using advanced analytics and rule-based systems to detect suspicious activity." },
            { icon: <VerifiedUserIcon />, title: "Customer Due Diligence", desc: "Comprehensive KYC/KYB verification for all institutional clients, including beneficial ownership and source of funds." },
            { icon: <AssignmentIcon />, title: "Record Keeping", desc: "Maintenance of all transaction records and customer identification documents for a minimum of 5 years." },
            { icon: <SupportAgentIcon />, title: "Compliance Team", desc: "Dedicated compliance officers trained in AML regulations across all operating jurisdictions." },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#fff" }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Required Documentation</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>For Entities</Typography>
              {["Certificate of Incorporation", "Articles of Organization", "Board Resolution", "Beneficial Ownership Declaration", "Source of Funds Evidence", "Audited Financial Statements"].map((doc, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <CheckCircleOutlinedIcon sx={{ color: "#22c55e", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>{doc}</Typography>
                </Box>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>For Individuals</Typography>
              {["Government-issued photo ID", "Proof of address (utility bill)", "Selfie verification", "Source of funds declaration", "Professional references"].map((doc, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <CheckCircleOutlinedIcon sx={{ color: "#22c55e", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>{doc}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <CTASection title="Start Verification" subtitle="Begin the institutional onboarding process to access MATBEA Enterprise services." primaryAction={{ label: "Begin KYC Process", path: "/products/enterprise" }} secondaryAction={{ label: "Contact Compliance", path: "/partners" }} />
    </Box>
  );
}

function CookiePolicyPage() {
  return (
    <Box>
      <PageHeader title="Cookie Policy" subtitle="How MATBEA Enterprise uses cookies and similar technologies on our website." badge="Legal" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>Last updated: January 15, 2026</Typography>
          {[
            { title: "1. What Are Cookies", content: "Cookies are small text files placed on your device when you visit our website. They help us recognize your browser and remember certain information." },
            { title: "2. Types of Cookies We Use", content: "Essential cookies (required for site functionality), Analytics cookies (help us understand usage patterns), Preference cookies (remember your settings), and Marketing cookies (used for advertising)." },
            { title: "3. Essential Cookies", content: "These cookies are necessary for the website to function properly. They enable core features like security, network management, and account access. You cannot opt out of these cookies." },
            { title: "4. Analytics Cookies", content: "We use Google Analytics and similar tools to collect information about how visitors use our site. This data is aggregated and anonymous, helping us improve our services." },
            { title: "5. Managing Cookies", content: "You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. However, disabling essential cookies may affect site functionality." },
            { title: "6. Third-Party Cookies", content: "Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Please refer to the third party's privacy policy for more information." },
            { title: "7. Updates to This Policy", content: "We may update this Cookie Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated effective date." },
          ].map((section, i) => (
            <Box key={i} sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>{section.title}</Typography>
              <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>{section.content}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ==================== MAIN APP ==================== */

function HomePage() {
  return (
    <>
      <HeroSection />
      <RateCalculator />
      <MarketSection />
      <TradingPairsSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection title="Ready to Scale Your Crypto Operations?" subtitle="Join 2,400+ enterprises using MATBEA for institutional trading, custody, and settlement." primaryAction={{ label: "Schedule a Demo", path: "/products/enterprise" }} secondaryAction={{ label: "View API Docs", path: "/resources/documentation" }} />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products/spot-trading" element={<SpotTradingPage />} />
        <Route path="products/otc-desk" element={<OTCDeskPage />} />
        <Route path="products/custody" element={<CustodyPage />} />
        <Route path="products/settlement" element={<SettlementPage />} />
        <Route path="products/api-access" element={<APIAccessPage />} />
        <Route path="products/enterprise" element={<EnterprisePage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="solutions/case-studies" element={<CaseStudiesPage />} />
        <Route path="compliance/institutional-fees" element={<InstitutionalFeesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="resources/documentation" element={<DocumentationPage />} />
        <Route path="resources/api-reference" element={<APIReferencePage />} />
        <Route path="resources/status" element={<StatusPage />} />
        <Route path="resources/security" element={<SecurityPage />} />
        <Route path="resources/bug-bounty" element={<BugBountyPage />} />
        <Route path="legal/terms" element={<TermsPage />} />
        <Route path="legal/privacy" element={<PrivacyPage />} />
        <Route path="legal/aml-kyc" element={<AMLKYCPage />} />
        <Route path="legal/cookies" element={<CookiePolicyPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
