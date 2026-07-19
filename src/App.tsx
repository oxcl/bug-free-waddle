import { useState, useMemo } from "react";
import { Routes, Route, Link as RouterLink, Navigate, Outlet } from "react-router-dom";
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
import StarIcon from "@mui/icons-material/Star";
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
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Layout from "./components/Layout";
import MiniChart from "./components/MiniChart";
import PageHeader from "./components/PageHeader";
import CTASection from "./components/CTASection";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import TradingPage from "./pages/TradingPage";
import WalletsPage from "./pages/WalletsPage";
import OrdersPage from "./pages/OrdersPage";
import MarketsPage from "./pages/MarketsPage";
import HistoryPage from "./pages/HistoryPage";

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
        {/* Feature strip */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 0,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.06)",
          bgcolor: "rgba(255,255,255,0.02)",
          overflow: "hidden",
        }}>
          {[
            { icon: <SpeedIcon />, title: "Sub-Millisecond Execution", desc: "Co-located matching engine with latencies under 100 microseconds.", color: "#3b82f6" },
            { icon: <LanIcon />, title: "Deep Liquidity", desc: "Aggregated liquidity from 15+ institutional market makers.", color: "#8b5cf6" },
            { icon: <ShowChartIcon />, title: "Advanced Order Types", desc: "TWAP, VWAP, Iceberg, and custom algorithmic order types.", color: "#22c55e" },
            { icon: <HubIcon />, title: "Multi-Venue Routing", desc: "Smart order routing across multiple venues for best execution.", color: "#06b6d4" },
          ].map((f, i) => (
            <Box key={i} sx={{
              p: 3,
              position: "relative",
              borderRight: { xs: "none", md: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" },
              borderBottom: { xs: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none", sm: "none", md: "none" },
              transition: "all 0.3s ease",
              "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${f.color}, transparent)`,
                opacity: 0.6,
              },
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <Box sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: `linear-gradient(135deg, ${f.color}18 0%, ${f.color}08 100%)`,
                  border: `1px solid ${f.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.color,
                  fontSize: "1rem",
                }}>{f.icon}</Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff", fontSize: "0.85rem" }}>{f.title}</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontSize: "0.78rem" }}>{f.desc}</Typography>
            </Box>
          ))}
        </Box>

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
        {/* Feature strip */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 0,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.06)",
          bgcolor: "rgba(255,255,255,0.02)",
          overflow: "hidden",
        }}>
          {[
            { icon: <AccountBalanceIcon />, title: "Zero Slippage", desc: "Execute large orders at a single price with no market impact.", color: "#22c55e" },
            { icon: <TollIcon />, title: "Competitive Pricing", desc: "Tight spreads from 20+ institutional liquidity providers.", color: "#3b82f6" },
            { icon: <PaymentIcon />, title: "Flexible Settlement", desc: "Settle in fiat or crypto with T+0 to T+2 options.", color: "#8b5cf6" },
            { icon: <SupportAgentIcon />, title: "Dedicated Trader", desc: "Personal OTC trader available 24/7 for custom execution.", color: "#06b6d4" },
          ].map((f, i) => (
            <Box key={i} sx={{
              p: 3,
              position: "relative",
              borderRight: { xs: "none", md: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" },
              borderBottom: { xs: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none", sm: "none", md: "none" },
              transition: "all 0.3s ease",
              "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${f.color}, transparent)`,
                opacity: 0.6,
              },
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <Box sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: `linear-gradient(135deg, ${f.color}18 0%, ${f.color}08 100%)`,
                  border: `1px solid ${f.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.color,
                  fontSize: "1rem",
                }}>{f.icon}</Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff", fontSize: "0.85rem" }}>{f.title}</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontSize: "0.78rem" }}>{f.desc}</Typography>
            </Box>
          ))}
        </Box>

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
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

        {/* Settlement Feature Cards */}
        <Grid container spacing={3}>
          {[
            { icon: <SpeedIcon />, title: "T+0 Settlement", desc: "All trades settle instantly on-chain or within our internal ledger. No waiting for batch processing or end-of-day cycles. Every transaction is final and confirmed within seconds.", color: "#22c55e" },
            { icon: <SecurityIcon />, title: "Atomic Settlement", desc: "Delivery-versus-payment atomic swaps eliminate counterparty risk for all transactions. Both legs of a trade settle simultaneously or not at all — zero partial fills.", color: "#3b82f6" },
            { icon: <AccountBalanceWalletIcon />, title: "Multi-Currency", desc: "Settle in 40+ fiat currencies and all supported cryptocurrencies with competitive FX rates. Cross-currency netting reduces unnecessary conversions and saves on fees.", color: "#8b5cf6" },
            { icon: <TimelineIcon />, title: "Real-Time Reporting", desc: "Track settlement status in real-time with comprehensive reporting and reconciliation tools. Instant dashboards show pending, settled, and failed transactions.", color: "#f59e0b" },
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

        {/* Settlement Flow */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Settlement Flow</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>End-to-end transaction lifecycle from execution to confirmation</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 0, alignItems: "stretch" }}>
            {[
              { step: "01", title: "Trade Execution", desc: "Orders matched by our low-latency matching engine with sub-millisecond precision.", color: "#22c55e" },
              { step: "02", title: "Trade Matching", desc: "Counterparty details verified, trade terms locked, and both parties notified instantly.", color: "#3b82f6" },
              { step: "03", title: "Netting", desc: "Cross-trade and cross-currency netting reduces the number and value of settlements.", color: "#8b5cf6" },
              { step: "04", title: "Settlement Instruction", desc: "Automated settlement instructions generated and dispatched to custodians and banks.", color: "#f59e0b" },
              { step: "05", title: "Fund Transfer", desc: "Atomic fund transfer executed — assets move simultaneously across both legs.", color: "#ef4444" },
              { step: "06", title: "Confirmation", desc: "Both parties receive real-time confirmation with full audit trail and receipts.", color: "#06b6d4" },
            ].map((s, i) => (
              <Box key={i} sx={{ flex: 1, position: "relative" }}>
                <Box sx={{
                  bgcolor: "#111",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: i === 0 ? "12px 0 0 12px" : i === 5 ? "0 12px 12px 0" : 0,
                  p: { xs: 2.5, md: 3 },
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.03)",
                    borderColor: `${s.color}40`,
                  },
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${s.color}20 0%, ${s.color}08 100%)`,
                      border: `1px solid ${s.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1.5,
                    }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: s.color, fontSize: "0.7rem" }}>{s.step}</Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff", fontSize: "0.85rem" }}>{s.title}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.6, fontSize: "0.8rem" }}>{s.desc}</Typography>
                </Box>
                {i < 5 && (
                  <Box sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    right: -10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    color: "rgba(255,255,255,0.2)",
                    fontSize: "0.9rem",
                  }}>
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Settlement SLAs */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Settlement SLAs</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Guaranteed uptime and settlement times for every method</Typography>
          </Box>

          <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 2, md: 3 } }}>
            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "transparent" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {["Settlement Method", "Typical Time", "SLA Uptime", "Status"].map((h) => (
                      <TableCell key={h} sx={{ color: "#666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { method: "Internal Ledger", time: "Instant", sla: "99.99%", color: "#22c55e" },
                    { method: "On-Chain BTC", time: "~10 min", sla: "99.95%", color: "#f7931a" },
                    { method: "On-Chain ETH", time: "~15 sec", sla: "99.99%", color: "#627eea" },
                    { method: "On-Chain SOL", time: "~2 sec", sla: "99.99%", color: "#9945ff" },
                    { method: "Wire Transfer", time: "Same day", sla: "99.9%", color: "#3b82f6" },
                    { method: "SWIFT", time: "1-2 days", sla: "99.5%", color: "#06b6d4" },
                  ].map((row) => (
                    <TableRow key={row.method} sx={{ "& td": { borderBottom: "1px solid rgba(255,255,255,0.04)" } }}>
                      <TableCell sx={{ color: "#fff", fontWeight: 600 }}>{row.method}</TableCell>
                      <TableCell sx={{ color: "#22c55e" }}>{row.time}</TableCell>
                      <TableCell sx={{ color: row.color, fontWeight: 700 }}>{row.sla}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#22c55e" }} />
                          <Typography variant="caption" sx={{ color: "#22c55e" }}>Operational</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        {/* Reconciliation & Reporting */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Reconciliation & Reporting</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Automated tools to keep your books perfectly in sync</Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { icon: <TimelineIcon />, title: "Real-Time Position Tracking", desc: "Monitor your positions across all accounts and currencies in real-time. Instant visibility into balances, pending settlements, and available capital.", color: "#22c55e" },
              { icon: <AccountTreeIcon />, title: "Automated Reconciliation", desc: "System auto-reconciles every settlement against your internal records. Discrepancies flagged instantly with full drill-down capability.", color: "#3b82f6" },
              { icon: <DescriptionIcon />, title: "Exportable Reports", desc: "Generate detailed settlement reports in CSV, PDF, or via API. Schedule recurring reports delivered to your team automatically.", color: "#8b5cf6" },
              { icon: <AccountBalanceWalletIcon />, title: "Multi-Currency Support", desc: "Full reconciliation across 40+ fiat currencies and all crypto assets. Automatic FX rate application with historical rate lookup.", color: "#f59e0b" },
              { icon: <SecurityIcon />, title: "Audit Trail", desc: "Immutable audit trail for every settlement event. Full compliance-ready logs with timestamps, actors, and transaction hashes.", color: "#ef4444" },
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
        </Box>

        {/* Settlement Options Table */}
        <Box sx={{ mt: 8, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Settlement Options</Typography>
          <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "transparent" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Method", "Settlement Time", "Supported Currencies", "Fee", "Min. Amount"].map((h) => (
                    <TableCell key={h} sx={{ color: "#666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { method: "Internal Ledger", time: "Instant", currencies: "All", fee: "Free", min: "No minimum" },
                  { method: "On-Chain (BTC)", time: "~10 min", currencies: "BTC", fee: "Network fee", min: "0.001 BTC" },
                  { method: "On-Chain (ETH)", time: "~15 sec", currencies: "ETH, ERC-20", fee: "Gas fee", min: "0.01 ETH" },
                  { method: "On-Chain (SOL)", time: "~2 sec", currencies: "SOL, SPL", fee: "$0.00025", min: "0.1 SOL" },
                  { method: "Wire Transfer (USD)", time: "Same day", currencies: "USD", fee: "$25", min: "$10,000" },
                  { method: "Wire Transfer (EUR)", time: "Same day", currencies: "EUR", fee: "€20", min: "€10,000" },
                  { method: "SWIFT", time: "1-2 days", currencies: "40+ fiat", fee: "$45", min: "$25,000" },
                  { method: "SEPA", time: "Same day", currencies: "EUR", fee: "€1", min: "€100" },
                  { method: "FPS (GBP)", time: "Instant", currencies: "GBP", fee: "Free", min: "No minimum" },
                ].map((row) => (
                  <TableRow key={row.method} sx={{ "& td": { borderBottom: "1px solid rgba(255,255,255,0.04)" } }}>
                    <TableCell sx={{ color: "#fff", fontWeight: 600 }}>{row.method}</TableCell>
                    <TableCell sx={{ color: "#22c55e" }}>{row.time}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.currencies}</TableCell>
                    <TableCell sx={{ color: "#999" }}>{row.fee}</TableCell>
                    <TableCell sx={{ color: "rgba(255,255,255,0.4)" }}>{row.min}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Capital Efficiency */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Capital Efficiency</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>How T+0 settlement transforms your capital utilization</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{
                bgcolor: "#111",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 2,
                p: 4,
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": { borderColor: "#22c55e40" },
              }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "#22c55e", mr: 1 }}>T+0</Typography>
                  <Box sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}>
                    <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 600 }}>MATBEA</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>Settlement happens instantly. Capital is freed the moment a trade executes, enabling faster redeployment into new opportunities.</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#22c55e" }} />
                  <Typography variant="caption" sx={{ color: "#22c55e" }}>Zero settlement delay</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{
                bgcolor: "#111",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 2,
                p: 4,
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": { borderColor: "rgba(255,255,255,0.15)" },
              }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "#666", mr: 1 }}>T+2</Typography>
                  <Box sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <Typography variant="caption" sx={{ color: "#666", fontWeight: 600 }}>TRADITIONAL</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>Capital locked for 2 business days after each trade. Your funds sit idle while counterparty risk accumulates during the settlement window.</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="caption" sx={{ color: "#666" }}>2-day capital lock-up</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{
                bgcolor: "linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(59,130,246,0.05) 100%)",
                border: "1px solid rgba(34,197,94,0.15)",
                borderRadius: 2,
                p: 4,
                height: "100%",
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 3 }}>Key Benefits</Typography>
                {[
                  { metric: "40%", label: "More capital available for trading with T+0 vs T+2" },
                  { metric: "$2.4B+", label: "Daily capital freed across our enterprise client base" },
                  { metric: "100%", label: "Counterparty risk elimination via atomic settlement" },
                  { metric: "3x", label: "Faster capital turnover compared to traditional settlement" },
                ].map((b, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, mb: i < 3 ? 2 : 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#22c55e", minWidth: 64 }}>{b.metric}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.5, fontSize: "0.8rem" }}>{b.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

      </Container>
      <CTASection title="Optimize Your Settlement" subtitle="Reduce settlement risk and free up capital with instant settlement." primaryAction={{ label: "Get Started", path: "/products/enterprise" }} secondaryAction={{ label: "View API Docs", path: "/resources/api-reference" }} />
    </Box>
  );
}

function APIAccessPage() {
  const [activeCodeTab, setActiveCodeTab] = useState(0);

  const codeExamples = [
    { label: "Python SDK", lang: "python", code: `import matbea

client = matbea.Client(
    api_key="your-api-key",
    api_secret="your-api-secret",
)

# Place a limit order
order = client.trade.create_order(
    symbol="BTC-USDT",
    side="buy",
    type="limit",
    price=67000,
    quantity=0.5,
    time_in_force="GTC",
)
print(f"Order placed: {order.id}")  # "ord_abc123"

# Get open orders
orders = client.trade.get_open_orders(symbol="BTC-USDT")
for o in orders:
    print(f"{o.side} {o.quantity} @ {o.price} — {o.status}")` },
    { label: "JavaScript (WebSocket)", lang: "javascript", code: `import { MATBEA } from '@matbea/sdk';

const ws = new MATBEA.WebSocket({
  apiKey: 'your-api-key',
});

// Subscribe to ticker stream
ws.subscribe('ticker', { symbol: 'BTC-USDT' });

ws.on('ticker', (data) => {
  console.log(\`\${data.symbol}: \${data.price}\`);
  // "BTC-USDT: 67432.18"
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err.message);
});

ws.connect();` },
    { label: "cURL", lang: "bash", code: `curl -X GET "https://api.matbea.com/v3/account/balance" \\
  -H "X-MATBEA-APIKEY: your-api-key" \\
  -H "X-MATBEA-SIGNATURE: HMAC-SHA256-signature" \\
  -H "X-MATBEA-TIMESTAMP: 1698765432"

# Response
{
  "balances": [
    { "asset": "BTC", "available": "1.234", "locked": "0.100" },
    { "asset": "USDT", "available": "85420.50", "locked": "0.00" }
  ],
  "total_usd_value": "167432.18"
}` },
    { label: "Go", lang: "go", code: `package main

import (
    "context"
    "fmt"
    matbea "github.com/matbea/go-sdk"
)

func main() {
    client := matbea.NewClient("your-api-key", "your-api-secret")

    // Stream market data
    stream, err := client.Market.SubscribeTrades(context.Background(), "BTC-USDT")
    if err != nil {
        panic(err)
    }

    for trade := range stream.Ch() {
        fmt.Printf("Trade: %s %s @ %s\\n", trade.Side, trade.Quantity, trade.Price)
    }
}` },
  ];

  return (
    <Box>
      <PageHeader title="API Access" subtitle="Build powerful trading applications with our REST and WebSocket APIs. Full access to market data, trading, and account management endpoints." badge="API" />
      <Container maxWidth="lg" sx={{ py: 4 }}>

        {/* Core API Features */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>Core API Features</Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 4 }}>Everything you need to build institutional-grade trading applications</Typography>
        </Box>
        <Grid container spacing={3}>
          {[
            { icon: <ApiIcon />, title: "REST API", desc: "Complete REST API with 500+ endpoints for trading, account management, and market data retrieval.", color: "#3b82f6", sub: ["JSON request/response with camelCase keys", "OAuth 2.0 and API key authentication", "Versioned endpoints (/v3/)", "Idempotency keys for safe retries", "Pagination with cursor-based navigation", "Real-time and historical data endpoints"] },
            { icon: <LanIcon />, title: "WebSocket Streams", desc: "Real-time market data and order updates via persistent WebSocket connections with <10ms latency.", color: "#8b5cf6", sub: ["Binary and JSON message formats", "Heartbeat and auto-reconnect", "Channel subscription management", "Snapshot + delta update model", "Per-connection rate limiting", "Authenticated user data streams"] },
            { icon: <CodeIcon />, title: "FIX Protocol", desc: "Industry-standard FIX 4.4 protocol support for high-frequency trading and legacy system integration.", color: "#22c55e", sub: ["FIX 4.4 and FIX 5.0 SP2 support", "Custom tag extensions", "Session-level and application-level heartbeats", "Market data incremental refresh", "Order management (New, Amend, Cancel)", "Co-location available for sub-microsecond latency"] },
            { icon: <BuildIcon />, title: "SDKs & Libraries", desc: "Official client libraries in Python, JavaScript, Go, Java, and Rust with comprehensive documentation.", color: "#06b6d4", sub: ["Type-safe interfaces and full IDE support", "Automatic request signing and retry logic", "Built-in rate limit management", "WebSocket abstraction layer", "Comprehensive error handling", "Async/await and callback patterns"] },
          ].map((f, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card elevation={0} sx={{ height: "100%", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s ease", "&:hover": { borderColor: `${f.color}30`, boxShadow: `0 8px 32px ${f.color}10` } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", background: `linear-gradient(135deg, ${f.color}15 0%, ${f.color}05 100%)`, border: `1px solid ${f.color}20`, display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: f.color }}>{f.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>{f.desc}</Typography>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                    {f.sub.map((s, j) => (
                      <Box component="li" key={j} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.75, color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", lineHeight: 1.5 }}>
                        <CheckCircleOutlinedIcon sx={{ fontSize: 14, color: f.color, mt: 0.25, flexShrink: 0 }} />
                        {s}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* WebSocket Streams Section */}
        <Box sx={{ mt: 8, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <LanIcon sx={{ color: "#8b5cf6" }} />
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>WebSocket Streams</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 3, maxWidth: 700 }}>Subscribe to real-time data channels. All streams support binary (protobuf) and JSON formats with automatic reconnection and sequence gap detection.</Typography>
          <Grid container spacing={2.5}>
            {[
              { name: "Ticker Stream", desc: "Real-time price updates aggregated across all pairs. Updates every 100ms with best bid/ask, last price, 24h volume, and price change.", latency: "~5ms", color: "#3b82f6" },
              { name: "Order Book Stream", desc: "Level 2 market depth with full order book snapshots and incremental updates. Supports configurable depth levels (5, 10, 20, 50).", latency: "~3ms", color: "#8b5cf6" },
              { name: "Trade Stream", desc: "Every executed trade on the exchange with price, quantity, side, and timestamp. Includes aggregated and individual trade feeds.", latency: "~2ms", color: "#22c55e" },
              { name: "User Data Stream", desc: "Authenticated stream for order updates, balance changes, position updates, liquidation events, and margin calls delivered in real-time.", latency: "~1ms", color: "#06b6d4" },
            ].map((s, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Box sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 1.5, p: 2.5, height: "100%", transition: "all 0.2s", "&:hover": { borderColor: `${s.color}30` } }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700 }}>{s.name}</Typography>
                    <Chip label={s.latency} size="small" sx={{ height: 20, fontSize: "0.65rem", fontWeight: 600, bgcolor: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", lineHeight: 1.6 }}>{s.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, bgcolor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 1.5, p: 2.5 }}>
            <Typography variant="caption" sx={{ color: "#8b5cf6", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", mb: 1.5, display: "block" }}>WebSocket Subscription Example</Typography>
            <Box component="pre" sx={{ m: 0, overflow: "auto", color: "#999", fontFamily: "monospace", fontSize: "0.8rem", lineHeight: 1.8 }}>
{`{
  "op": "subscribe",
  "channels": [
    { "name": "ticker",  "symbols": ["BTC-USDT", "ETH-USDT"] },
    { "name": "depth20", "symbols": ["BTC-USDT"] },
    { "name": "trades",  "symbols": ["BTC-USDT"] }
  ]
}`}
            </Box>
          </Box>
        </Box>

        {/* Code Examples Section */}
        <Box sx={{ mt: 6, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <CodeIcon sx={{ color: "#22c55e" }} />
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>Code Examples</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, mb: 2.5, flexWrap: "wrap" }}>
            {codeExamples.map((ex, i) => (
              <Chip key={i} label={ex.label} onClick={() => setActiveCodeTab(i)} sx={{ cursor: "pointer", bgcolor: activeCodeTab === i ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)", color: activeCodeTab === i ? "#fff" : "rgba(255,255,255,0.5)", border: activeCodeTab === i ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.06)", fontWeight: 600, fontSize: "0.75rem", transition: "all 0.2s", "&:hover": { bgcolor: "rgba(255,255,255,0.08)" } }} />
            ))}
          </Box>
          <Box component="pre" sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 1.5, p: 2.5, overflow: "auto", color: "#999", fontFamily: "monospace", fontSize: "0.8rem", lineHeight: 1.8, maxHeight: 420 }}>
            {codeExamples[activeCodeTab].code}
          </Box>
        </Box>

        {/* SDK Features Section */}
        <Box sx={{ mt: 6, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <BuildIcon sx={{ color: "#06b6d4" }} />
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>SDK Features</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}>Every official SDK ships with these capabilities out of the box — no extra configuration needed.</Typography>
          <Grid container spacing={2}>
            {[
              { icon: <LanIcon />, title: "Auto-Reconnection", desc: "WebSocket connections automatically reconnect with exponential backoff and resume from last sequence number — zero data loss." },
              { icon: <SpeedIcon />, title: "Rate Limit Handling", desc: "Built-in token bucket rate limiter respects per-endpoint limits. Queues requests and retries with backoff on 429 responses." },
              { icon: <SecurityIcon />, title: "Request Signing", desc: "HMAC-SHA256 signature generation for every authenticated request. Clock drift detection and timestamp synchronization included." },
              { icon: <HealthAndSafetyIcon />, title: "Error Handling", desc: "Typed exception hierarchy with error codes, human-readable messages, and retryable vs. non-retryable classification." },
              { icon: <DescriptionIcon />, title: "Logging", desc: "Configurable structured logging with request/response payloads, timing metrics, and correlation IDs for distributed tracing." },
            ].map((f, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", bgcolor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 1.5, p: 2, height: "100%" }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#06b6d4", flexShrink: 0 }}>{f.icon}</Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700, mb: 0.25, fontSize: "0.82rem" }}>{f.title}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", lineHeight: 1.55 }}>{f.desc}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Integration Guides Section */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <MenuBookIcon sx={{ color: "#f59e0b" }} />
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>Integration Guides</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}>Step-by-step walkthroughs for common integration patterns</Typography>
          <Grid container spacing={2}>
            {[
              { title: "Quick Start", time: "5 min", desc: "Get your first API call working. Generate keys, authenticate, and fetch market data.", icon: <SpeedIcon />, color: "#22c55e" },
              { title: "Trading Bot Guide", time: "30 min", desc: "Build an automated trading bot using WebSocket streams and the order management API.", icon: <TimelineIcon />, color: "#3b82f6" },
              { title: "Custody Integration", time: "1 hour", desc: "Hot/cold wallet architecture with MPC signing and multi-signature withdrawal policies.", icon: <LockIcon />, color: "#8b5cf6" },
              { title: "OTC Desk API", time: "20 min", desc: "Request RFQ quotes, execute block trades, and settle OTC transactions programmatically.", icon: <HandshakeIcon />, color: "#f59e0b" },
              { title: "Webhook Configuration", time: "10 min", desc: "Configure HTTP webhooks for order fills, deposit confirmations, and compliance alerts.", icon: <CloudIcon />, color: "#06b6d4" },
            ].map((g, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.25s ease", cursor: "pointer", "&:hover": { borderColor: `${g.color}30`, transform: "translateY(-2px)", boxShadow: `0 8px 24px ${g.color}10` } }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: `${g.color}12`, border: `1px solid ${g.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: g.color }}>{g.icon}</Box>
                      <Chip label={g.time} size="small" sx={{ height: 20, fontSize: "0.65rem", fontWeight: 600, bgcolor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}>{g.title}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", lineHeight: 1.6 }}>{g.desc}</Typography>
                    <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 0.5, color: g.color, fontSize: "0.75rem", fontWeight: 600 }}>
                      Read guide <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Rate Limits Table */}
        <Box sx={{ mt: 6, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <SpeedIcon sx={{ color: "#f59e0b" }} />
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>API Rate Limits</Typography>
          </Box>
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

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Solution categories with detailed breakdowns */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Institutional Solutions</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 600, mx: "auto" }}>Tailored infrastructure for every type of institutional crypto participant</Typography>
          </Box>

          {/* Asset Managers Solution */}
          <Box sx={{ mb: 6 }}>
            <Card elevation={0} sx={{ overflow: "visible", "&:hover": { borderColor: "rgba(139, 92, 246, 0.3)" } }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={4} sx={{ alignItems: "center" }}>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%)", border: "1px solid rgba(139, 92, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}>
                        <TrendingUpOutlinedIcon />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>Asset Managers</Typography>
                        <Chip label="Portfolio Infrastructure" size="small" sx={{ bgcolor: "rgba(139, 92, 246, 0.1)", color: "#a78bfa", fontSize: "0.65rem", height: 20 }} />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, mb: 3 }}>
                      Manage digital asset portfolios with institutional-grade tools. Our platform provides comprehensive portfolio management, automated rebalancing, and deep liquidity access for fund managers overseeing crypto allocations.
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { title: "Portfolio Analytics", desc: "Real-time P&L, risk metrics, and attribution analysis across all holdings." },
                        { title: "Automated Rebalancing", desc: "Set target allocations and execute rebalancing with minimal slippage." },
                        { title: "Multi-Custodian Support", desc: "Aggregate positions across multiple custody providers in one view." },
                        { title: "Investor Reporting", desc: "Automated NAV calculations and investor report generation." },
                      ].map((feature, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                          <Box sx={{ display: "flex", gap: 1.5 }}>
                            <CheckCircleOutlinedIcon sx={{ color: "#8b5cf6", fontSize: 18, mt: 0.25 }} />
                            <Box>
                              <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{feature.title}</Typography>
                              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>{feature.desc}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ p: 3, bgcolor: "rgba(139, 92, 246, 0.03)", border: "1px solid rgba(139, 92, 246, 0.1)", borderRadius: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: "#a78bfa", mb: 2, fontWeight: 600 }}>Key Metrics</Typography>
                      {[
                        { label: "AUM Supported", value: "$12B+" },
                        { label: "Fund Types", value: "Hedge, Venture, Index" },
                        { label: "Avg. Slippage", value: "<0.05%" },
                        { label: "Reporting", value: "Real-time + Custom" },
                      ].map((metric, i) => (
                        <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: i < 3 ? "1px solid rgba(139, 92, 246, 0.08)" : "none" }}>
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>{metric.label}</Typography>
                          <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>{metric.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>

          {/* Banks & Fintech Solution */}
          <Box sx={{ mb: 6 }}>
            <Card elevation={0} sx={{ overflow: "visible", "&:hover": { borderColor: "rgba(59, 130, 246, 0.3)" } }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={4} sx={{ alignItems: "center" }}>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)", border: "1px solid rgba(59, 130, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6" }}>
                        <AccountBalanceIcon />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>Banks & Fintech</Typography>
                        <Chip label="White-Label Ready" size="small" sx={{ bgcolor: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", fontSize: "0.65rem", height: 20 }} />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, mb: 3 }}>
                      Launch crypto services under your brand with our white-label platform. From trading to custody to payments, we provide the infrastructure while you own the customer relationship.
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { title: "White-Label Exchange", desc: "Fully branded trading platform with your domain, logo, and UI customizations." },
                        { title: "Banking Integration", desc: "SEPA, SWIFT, and local payment rail integrations for fiat on/off-ramps." },
                        { title: "Regulatory Framework", desc: "Pre-built compliance modules for major jurisdictions (MiCA, MAS, FCA)." },
                        { title: "Revenue Sharing", desc: "Flexible revenue models including licensing, transaction fees, or hybrid." },
                      ].map((feature, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                          <Box sx={{ display: "flex", gap: 1.5 }}>
                            <CheckCircleOutlinedIcon sx={{ color: "#3b82f6", fontSize: 18, mt: 0.25 }} />
                            <Box>
                              <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{feature.title}</Typography>
                              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>{feature.desc}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ p: 3, bgcolor: "rgba(59, 130, 246, 0.03)", border: "1px solid rgba(59, 130, 246, 0.1)", borderRadius: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: "#60a5fa", mb: 2, fontWeight: 600 }}>Deployment Options</Typography>
                      {[
                        { label: "Time to Market", value: "4-8 weeks" },
                        { label: "Customization", value: "Full UI/UX Control" },
                        { label: "Supported Chains", value: "15+ L1/L2" },
                        { label: "SLA Guarantee", value: "99.99% Uptime" },
                      ].map((metric, i) => (
                        <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: i < 3 ? "1px solid rgba(59, 130, 246, 0.08)" : "none" }}>
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>{metric.label}</Typography>
                          <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>{metric.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>

          {/* Market Makers Solution */}
          <Box sx={{ mb: 6 }}>
            <Card elevation={0} sx={{ overflow: "visible", "&:hover": { borderColor: "rgba(34, 197, 94, 0.3)" } }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={4} sx={{ alignItems: "center" }}>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)", border: "1px solid rgba(34, 197, 94, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e" }}>
                        <HandshakeIcon />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>Market Makers</Typography>
                        <Chip label="HFT Infrastructure" size="small" sx={{ bgcolor: "rgba(34, 197, 94, 0.1)", color: "#4ade80", fontSize: "0.65rem", height: 20 }} />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, mb: 3 }}>
                      Access co-located infrastructure with sub-millisecond latency for high-frequency market making. Our platform supports custom fee tiers, bulk order management, and advanced risk controls.
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { title: "Co-Location", desc: "Deploy servers in the same data center as our matching engine for minimal latency." },
                        { title: "Custom Fee Tiers", desc: "Negotiate maker rebates based on volume and liquidity provision metrics." },
                        { title: "Bulk Order API", desc: "Submit, modify, and cancel thousands of orders per second via dedicated endpoints." },
                        { title: "Risk Management", desc: "Real-time position limits, max order size controls, and circuit breakers." },
                      ].map((feature, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                          <Box sx={{ display: "flex", gap: 1.5 }}>
                            <CheckCircleOutlinedIcon sx={{ color: "#22c55e", fontSize: 18, mt: 0.25 }} />
                            <Box>
                              <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{feature.title}</Typography>
                              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>{feature.desc}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ p: 3, bgcolor: "rgba(34, 197, 94, 0.03)", border: "1px solid rgba(34, 197, 94, 0.1)", borderRadius: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: "#4ade80", mb: 2, fontWeight: 600 }}>Performance Specs</Typography>
                      {[
                        { label: "Matching Engine", value: "<100μs" },
                        { label: "Order Throughput", value: "100K+/sec" },
                        { label: "Market Data Feed", value: "<1ms" },
                        { label: "Rebate Tiers", value: "Up to 0.02%" },
                      ].map((metric, i) => (
                        <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: i < 3 ? "1px solid rgba(34, 197, 94, 0.08)" : "none" }}>
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>{metric.label}</Typography>
                          <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>{metric.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>

          {/* Corporates Solution */}
          <Box sx={{ mb: 6 }}>
            <Card elevation={0} sx={{ overflow: "visible", "&:hover": { borderColor: "rgba(6, 182, 212, 0.3)" } }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={4} sx={{ alignItems: "center" }}>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)", border: "1px solid rgba(6, 182, 212, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#06b6d4" }}>
                        <BusinessCenterIcon />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>Corporates</Typography>
                        <Chip label="Treasury & Operations" size="small" sx={{ bgcolor: "rgba(6, 182, 212, 0.1)", color: "#22d3ee", fontSize: "0.65rem", height: 20 }} />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, mb: 3 }}>
                      Manage corporate crypto treasury with enterprise-grade security and controls. From payroll to vendor payments, handle all crypto operations with proper accounting and compliance workflows.
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { title: "Treasury Management", desc: "Multi-sig wallets with approval workflows for corporate fund movements." },
                        { title: "Crypto Payroll", desc: "Pay employees and contractors in crypto with automatic tax withholding." },
                        { title: "Vendor Payments", desc: "Stream AP/AR with crypto payment rails and automatic reconciliation." },
                        { title: "Accounting Integration", desc: "Sync with QuickBooks, Xero, and Sage for automated bookkeeping." },
                      ].map((feature, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                          <Box sx={{ display: "flex", gap: 1.5 }}>
                            <CheckCircleOutlinedIcon sx={{ color: "#06b6d4", fontSize: 18, mt: 0.25 }} />
                            <Box>
                              <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{feature.title}</Typography>
                              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>{feature.desc}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ p: 3, bgcolor: "rgba(6, 182, 212, 0.03)", border: "1px solid rgba(6, 182, 212, 0.1)", borderRadius: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: "#22d3ee", mb: 2, fontWeight: 600 }}>Enterprise Features</Typography>
                      {[
                        { label: "Approval Workflows", value: "Multi-level" },
                        { label: "Accounting Sync", value: "Real-time" },
                        { label: "Tax Reporting", value: "Automated" },
                        { label: "Support", value: "24/7 Dedicated" },
                      ].map((metric, i) => (
                        <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: i < 3 ? "1px solid rgba(6, 182, 212, 0.08)" : "none" }}>
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>{metric.label}</Typography>
                          <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>{metric.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* How It Works - Implementation Process */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Implementation Process</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>From onboarding to production in weeks, not months</Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { step: "01", title: "Discovery & Planning", desc: "Our solutions team works with you to understand your requirements, compliance needs, and technical constraints. We design a custom implementation plan.", duration: "1-2 weeks", color: "#3b82f6" },
              { step: "02", title: "Integration & Setup", desc: "Dedicated engineers help integrate our APIs with your existing systems. We provide sandbox environments and comprehensive testing support.", duration: "2-4 weeks", color: "#8b5cf6" },
              { step: "03", title: "Compliance Review", desc: "Our compliance team reviews your implementation to ensure regulatory adherence across all relevant jurisdictions.", duration: "1-2 weeks", color: "#22c55e" },
              { step: "04", title: "Go Live & Support", desc: "Phased production rollout with dedicated support. Your account manager ensures smooth operations from day one.", duration: "Ongoing", color: "#06b6d4" },
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
                    <Typography variant="h6" sx={{ fontWeight: 800, color: s.color }}>{s.step}</Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>{s.desc}</Typography>
                  <Chip label={s.duration} size="small" sx={{ bgcolor: `${s.color}15`, color: s.color, fontSize: "0.7rem", height: 22 }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Integration Architecture */}
        <Box sx={{ mb: 8, p: { xs: 3, md: 4 }, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Integration Architecture</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Flexible integration options for any technical environment</Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { title: "REST API", desc: "Standard HTTP endpoints for most integrations. JSON payloads, OAuth 2.0 authentication.", icon: <CodeIcon />, color: "#3b82f6" },
              { title: "WebSocket", desc: "Real-time streaming for market data, order updates, and portfolio changes.", icon: <LanIcon />, color: "#8b5cf6" },
              { title: "FIX Protocol", desc: "Industry-standard FIX 4.4 for high-frequency trading and legacy system integration.", icon: <ApiIcon />, color: "#22c55e" },
              { title: "SDKs", desc: "Official client libraries for Python, JavaScript, Go, Java, and Rust.", icon: <BuildIcon />, color: "#06b6d4" },
            ].map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Box sx={{
                  p: 3,
                  textAlign: "center",
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
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%)`,
                    border: `1px solid ${item.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    color: item.color,
                  }}>{item.icon}</Box>
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose MATBEA */}
        <Box>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Why Institutions Choose MATBEA</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>The advantages that set our enterprise solutions apart</Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { title: "Speed to Market", value: "4-8 Weeks", desc: "Deploy crypto services faster than building in-house. Our modular architecture enables rapid customization." },
              { title: "Total Cost", value: "60% Lower", desc: "Avoid the $10M+ investment of building institutional crypto infrastructure from scratch." },
              { title: "Compliance", value: "15+ Jurisdictions", desc: "Pre-built regulatory frameworks for major markets. We handle compliance so you can focus on growth." },
              { title: "Support", value: "24/7 Dedicated", desc: "Named account managers, priority support channels, and guaranteed SLAs for enterprise clients." },
            ].map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Box sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.04)",
                    transform: "translateY(-4px)",
                  },
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 0.5, fontSize: "1.5rem" }}>{item.value}</Typography>
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <CTASection title="Find Your Solution" subtitle="Let our team design a custom infrastructure package for your use case." primaryAction={{ label: "Contact Sales", path: "/products/enterprise" }} secondaryAction={{ label: "View Case Studies", path: "/solutions/case-studies" }} />
    </Box>
  );
}

function CaseStudiesPage() {
  const caseStudies = [
    {
      company: "Vertex Capital",
      type: "Hedge Fund",
      color: "#8b5cf6",
      result: "3x Improvement",
      services: ["OTC Trading", "Algorithmic APIs", "Custody", "Portfolio Analytics"],
      metrics: [
        { label: "Monthly Volume", value: "$2.3B" },
        { label: "Cost Reduction", value: "65%" },
        { label: "Fill Rate", value: "99.7%" },
        { label: "Execution Speed", value: "<50ms" },
        { label: "Assets Under Mgmt", value: "$8.5B" },
        { label: "Pair Coverage", value: "120+" },
      ],
      paragraphs: [
        "Vertex Capital, a $8.5B multi-strategy hedge fund, was struggling with fragmented liquidity across multiple exchanges and OTC desks. Their manual execution workflow resulted in significant slippage on large-block trades, costing the fund millions in unnecessary basis points each quarter. After evaluating several institutional platforms, Vertex chose MATBEA Enterprise for its unified liquidity pool and algorithmic execution capabilities.",
        "Within the first quarter of deployment, Vertex integrated MATBEA's Smart Order Router and TWAP/VWAP algorithms directly into their existing OMS. The fund's traders could now execute block trades of up to $50M with minimal market impact. MATBEA's custody infrastructure provided segregated cold storage for the fund's $8.5B AUM, with real-time position reporting that integrated seamlessly into their risk management dashboards.",
        "The results exceeded expectations: execution costs dropped by 65%, fill rates improved to 99.7%, and the fund was able to launch three new crypto-focused strategies that were previously impossible due to infrastructure limitations. Vertex now processes over $2.3B in monthly volume through MATBEA and has expanded its crypto allocation from 5% to 18% of total AUM.",
      ],
      quote: { text: "MATBEA transformed our crypto trading from a bottleneck into a competitive advantage. The execution quality rivals what we see in traditional equities.", author: "David Chen", title: "CIO, Vertex Capital" },
    },
    {
      company: "NovaPay",
      type: "Fintech",
      color: "#3b82f6",
      result: "10x Scale",
      services: ["Custody API", "Settlement Engine", "Compliance Suite", "White-Label"],
      metrics: [
        { label: "Active Users", value: "2M+" },
        { label: "Countries Served", value: "40" },
        { label: "Uptime", value: "99.99%" },
        { label: "Settlement Time", value: "<2 sec" },
        { label: "Daily Transactions", value: "500K+" },
        { label: "Fiat Currencies", value: "25" },
      ],
      paragraphs: [
        "NovaPay, a Series C fintech startup valued at $1.2B, needed to add cryptocurrency payment capabilities to its existing money transfer platform serving 2M+ users across 40 countries. The company required a custody solution that could handle micro-transactions at scale while meeting regulatory requirements in every jurisdiction they operated in — from the EU's MiCA framework to Singapore's MAS guidelines.",
        "MATBEA provided NovaPay with a white-label custody and settlement infrastructure that was deployed under NovaPay's brand in just six weeks. The integration involved MATBEA's REST APIs for real-time balance queries, webhook-based settlement notifications, and a compliance engine that automatically screens transactions against sanctions lists and AML databases for each applicable jurisdiction.",
        "Since launching crypto payments, NovaPay has processed over $1.8B in cryptocurrency transactions with zero security incidents. The crypto payment feature has become their fastest-growing product line, contributing 23% of total revenue within the first year. Transaction settlement times dropped from 3-5 days (traditional banking) to under 2 seconds for crypto rails, dramatically improving the user experience.",
      ],
      quote: { text: "We went from concept to production in six weeks. MATBEA's compliance engine alone would have taken us a year to build internally.", author: "Sarah Kim", title: "CTO, NovaPay" },
    },
    {
      company: "Atlas Digital",
      type: "Market Maker",
      color: "#22c55e",
      result: "50% Latency Cut",
      services: ["Co-Location", "Matching Engine", "Risk Controls", "Fee Customization"],
      metrics: [
        { label: "Orders/Second", value: "50K+" },
        { label: "Latency", value: "<100μs" },
        { label: "Monthly Volume", value: "$50B+" },
        { label: "Pairs Active", value: "200+" },
        { label: "Rebate Tier", value: "0.02%" },
        { label: "Uptime SLA", value: "99.999%" },
      ],
      paragraphs: [
        "Atlas Digital, one of the top 10 crypto market makers globally, was losing ground to competitors due to latency limitations at their previous exchange infrastructure provider. In market making, every microsecond counts — Atlas estimated they were losing $2-3M monthly from adverse selection caused by slower execution relative to rival firms. They needed co-located infrastructure with a matching engine that could keep pace with their custom HFT strategies.",
        "Atlas partnered with MATBEA to deploy co-located servers in MATBEA's matching engine data centers in Tokyo and London. MATBEA's custom fee tier program gave Atlas competitive maker rebates, while the dedicated Bulk Order API allowed them to submit, modify, and cancel thousands of orders per second. Real-time risk controls with configurable position limits and circuit breakers gave Atlas the safety guardrails needed for aggressive quoting strategies.",
        "The impact was immediate: Atlas's effective latency dropped from 200μs to under 100μs, and their order throughput increased to 50K+ orders per second. Monthly volume grew from $20B to over $50B as Atlas expanded market making to 200+ trading pairs. The firm estimates the improved execution quality added $15M in annual revenue through tighter spreads and higher rebates.",
      ],
      quote: { text: "Sub-100 microsecond latency with 50K orders per second — MATBEA is the only platform that could match our infrastructure requirements at scale.", author: "Marcus Webb", title: "Head of Trading, Atlas Digital" },
    },
    {
      company: "Meridian Bank",
      type: "Banking",
      color: "#f59e0b",
      result: "Full Compliance",
      services: ["Regulated Custody", "AML/KYC", "Reporting", "Client Portal"],
      metrics: [
        { label: "Assets Under Custody", value: "$500M" },
        { label: "HNW Clients", value: "1,200+" },
        { label: "Security Incidents", value: "Zero" },
        { label: "Audit Score", value: "100%" },
        { label: "Jurisdictions", value: "12" },
        { label: "Insurance Coverage", value: "$250M" },
      ],
      paragraphs: [
        "Meridian Bank, a Tier 1 European bank with $45B in AUM, wanted to offer cryptocurrency custody services to its high-net-worth client base but faced significant regulatory and technical hurdles. The bank needed a custody solution that met SOC 2 Type II, ISO 27001, and qualified custodian standards while integrating with their existing wealth management platform used by 1,200+ HNW clients across 12 European jurisdictions.",
        "MATBEA's regulated custody infrastructure provided Meridian with multi-signature cold storage, MPC-based key management, and $250M in insurance coverage. The integration connected MATBEA's custody APIs directly into Meridian's client portal, giving relationship managers real-time portfolio views that included both traditional assets and crypto holdings. MATBEA's compliance engine handled automated AML/KYC screening for every transaction, with full audit trails for regulatory reporting.",
        "Meridian launched its crypto custody service in Q2 2024 and has since attracted $500M in assets under custody from HNW clients. The bank achieved a 100% score in its first regulatory audit, with zero security incidents since launch. The service has become a key differentiator in Meridian's wealth management offering, with 35% of new HNW client acquisitions citing crypto custody as a primary reason for choosing the bank.",
      ],
      quote: { text: "MATBEA gave us institutional-grade crypto custody without compromising our regulatory standards. Our clients trust us with their digital assets because of the infrastructure behind it.", author: "Elena Rossi", title: "Head of Digital Assets, Meridian Bank" },
    },
  ];

  const aggregateStats = [
    { label: "Total Volume Processed", value: "$52.8B+", icon: <TrendingUpOutlinedIcon sx={{ fontSize: 28 }} /> },
    { label: "Enterprise Clients", value: "2,400+", icon: <BusinessCenterIcon sx={{ fontSize: 28 }} /> },
    { label: "Average Uptime", value: "99.997%", icon: <SpeedIcon sx={{ fontSize: 28 }} /> },
    { label: "Countries Served", value: "80+", icon: <CloudIcon sx={{ fontSize: 28 }} /> },
  ];

  const industries = [
    { icon: <TrendingUpOutlinedIcon />, title: "Hedge Funds", desc: "Multi-strategy execution, portfolio analytics, and prime brokerage services for fund managers.", color: "#8b5cf6", count: "340+" },
    { icon: <AccountBalanceIcon />, title: "Banks & Financial Institutions", desc: "Regulated custody, white-label platforms, and compliance infrastructure for banking clients.", color: "#3b82f6", count: "85+" },
    { icon: <PaymentIcon />, title: "Fintech & Payments", desc: "Crypto rails, settlement APIs, and white-label solutions for payment companies.", color: "#22c55e", count: "420+" },
    { icon: <HandshakeIcon />, title: "Market Makers", desc: "Co-located infrastructure, custom fee tiers, and HFT-optimized APIs for liquidity providers.", color: "#f59e0b", count: "120+" },
    { icon: <BusinessCenterIcon />, title: "Corporates", desc: "Treasury management, crypto payroll, and corporate-grade custody for enterprise treasuries.", color: "#ef4444", count: "600+" },
    { icon: <HubIcon />, title: "Gaming & Metaverse", desc: "In-game economies, NFT infrastructure, and virtual asset custody for gaming studios.", color: "#06b6d4", count: "180+" },
    { icon: <ApiIcon />, title: "DeFi Protocols", desc: "Institutional liquidity, oracle integration, and compliant DeFi access for protocol treasuries.", color: "#a78bfa", count: "655+" },
  ];

  const testimonials = [
    { text: "The execution quality and liquidity depth at MATBEA is unmatched. We consolidated three exchange relationships into one.", author: "James Park", title: "Portfolio Manager, Sumitomo Capital", color: "#8b5cf6" },
    { text: "Compliance was our biggest concern. MATBEA's regulatory framework let us launch in 12 countries simultaneously.", author: "Anna Müller", title: "Chief Compliance Officer, Deutsche Digital", color: "#3b82f6" },
    { text: "Our settlement times went from days to seconds. MATBEA's infrastructure is a generation ahead of what we had before.", author: "Raj Patel", title: "CEO, FinVolve Technologies", color: "#22c55e" },
    { text: "We evaluated every major institutional platform. MATBEA was the only one that could handle our volume and latency requirements.", author: "Lisa Nakamura", title: "Head of Trading, Sakura Markets", color: "#f59e0b" },
  ];

  return (
    <Box>
      <PageHeader title="Case Studies" subtitle="See how leading institutions use MATBEA Enterprise to power their crypto operations." badge="Case Studies" />

      {/* Detailed Case Studies */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Client Success Stories</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 600, mx: "auto" }}>Deep dives into how institutions are transforming their crypto operations with MATBEA Enterprise</Typography>
          </Box>

          {caseStudies.map((study, i) => (
            <Box key={i} sx={{ mb: 6 }}>
              <Card elevation={0} sx={{ "&:hover": { borderColor: `${study.color}33` } }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: `linear-gradient(135deg, ${study.color}26 0%, ${study.color}0d 100%)`, border: `1px solid ${study.color}33`, display: "flex", alignItems: "center", justifyContent: "center", color: study.color, fontWeight: 800, fontSize: "1.2rem" }}>
                          {study.company.charAt(0)}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>{study.company}</Typography>
                            <Chip label={study.type} size="small" sx={{ bgcolor: `${study.color}1a`, color: study.color, fontSize: "0.65rem", height: 20, fontWeight: 600 }} />
                          </Box>
                          <Chip label={study.result} size="small" sx={{ bgcolor: "rgba(34, 197, 94, 0.1)", color: "#22c55e", fontWeight: 600, fontSize: "0.7rem", height: 22 }} />
                        </Box>
                      </Box>

                      {study.paragraphs.map((p, j) => (
                        <Typography key={j} variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, mb: j < study.paragraphs.length - 1 ? 2 : 0 }}>{p}</Typography>
                      ))}

                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.5)", mb: 1, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Services Used</Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          {study.services.map((s, j) => (
                            <Chip key={j} label={s} size="small" sx={{ bgcolor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", height: 24, border: "1px solid rgba(255,255,255,0.08)" }} />
                          ))}
                        </Box>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Box sx={{ p: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: study.color, mb: 2, fontWeight: 600 }}>Key Metrics</Typography>
                        {study.metrics.map((m, j) => (
                          <Box key={j} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: j < study.metrics.length - 1 ? `1px solid ${study.color}14` : "none" }}>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{m.label}</Typography>
                            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>{m.value}</Typography>
                          </Box>
                        ))}
                      </Box>

                      <Box sx={{ p: 2.5, bgcolor: "rgba(255,255,255,0.02)", border: `1px solid ${study.color}20`, borderRadius: 2, borderLeft: `3px solid ${study.color}` }}>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic", lineHeight: 1.6, mb: 1.5 }}>"{study.quote.text}"</Typography>
                        <Typography variant="caption" sx={{ color: study.color, fontWeight: 600 }}>{study.quote.author}</Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", display: "block" }}>{study.quote.title}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Results Summary */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Results Summary</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 500, mx: "auto" }}>Aggregate impact across our enterprise client portfolio</Typography>
          </Box>
          <Grid container spacing={3}>
            {aggregateStats.map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", textAlign: "center", "&:hover": { borderColor: "rgba(139, 92, 246, 0.3)" } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: "#8b5cf6", mb: 2 }}>{stat.icon}</Box>
                    <Typography variant="h4" sx={{ color: "#fff", fontWeight: 800, mb: 0.5 }}>{stat.value}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Industries We Serve */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Industries We Serve</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 500, mx: "auto" }}>Specialized infrastructure for every sector of the digital asset economy</Typography>
          </Box>
          <Grid container spacing={3}>
            {industries.map((ind, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: `${ind.color}33` } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: "10px", background: `linear-gradient(135deg, ${ind.color}26 0%, ${ind.color}0d 100%)`, border: `1px solid ${ind.color}33`, display: "flex", alignItems: "center", justifyContent: "center", color: ind.color }}>
                        {ind.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700 }}>{ind.title}</Typography>
                        <Typography variant="caption" sx={{ color: ind.color, fontWeight: 600 }}>{ind.count} clients</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "0.85rem" }}>{ind.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Client Testimonials */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Client Testimonials</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 500, mx: "auto" }}>What our institutional partners say about working with MATBEA</Typography>
          </Box>
          <Grid container spacing={3}>
            {testimonials.map((t, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: `${t.color}33` } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                      {[...Array(5)].map((_, j) => (
                        <Box key={j} sx={{ width: 14, height: 14, borderRadius: "2px", bgcolor: t.color, opacity: 0.8 }} />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontStyle: "italic", mb: 2 }}>"{t.text}"</Typography>
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: `${t.color}33`, color: t.color, fontSize: "0.85rem", fontWeight: 700 }}>
                        {t.author.split(" ").map(n => n[0]).join("")}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>{t.author}</Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>{t.title}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
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

        {/* Partner Categories - Expanded */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Partner Categories</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Collaborate with us across multiple dimensions of the digital asset ecosystem</Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <HandshakeIcon />, title: "Technology Partners", color: "#3b82f6",
                desc: "Integrate with leading fintech platforms, OMS/EMS providers, and custody solutions to deliver seamless experiences to institutional clients.",
                subItems: ["API Integration & SDKs", "White-Label Solutions", "Data Feeds & Analytics", "Compliance Tooling"],
                metrics: [{ label: "Active Integrations", value: "85+" }, { label: "Avg. Uptime", value: "99.95%" }],
              },
              {
                icon: <TrendingUpOutlinedIcon />, title: "Liquidity Providers", color: "#8b5cf6",
                desc: "Access our network of 20+ institutional market makers for deep, aggregated liquidity across all supported trading pairs.",
                subItems: ["Market Making Services", "OTC Block Trading", "Cross-Asset Liquidity", "Custom Fee Structures"],
                metrics: [{ label: "Liquidity Pairs", value: "200+" }, { label: "Avg. Spread", value: "0.01%" }],
              },
              {
                icon: <AccountBalanceIcon />, title: "Institutional Partners", color: "#22c55e",
                desc: "Co-create products and services for the institutional digital asset ecosystem. Joint go-to-market strategies and revenue sharing.",
                subItems: ["Joint Product Development", "Revenue Sharing Models", "Co-Marketing Campaigns", "Industry Event Sponsorship"],
                metrics: [{ label: "Partner Revenue", value: "$2.5B+" }, { label: "Markets Served", value: "40+" }],
              },
              {
                icon: <CloudIcon />, title: "Cloud & Infrastructure", color: "#06b6d4",
                desc: "Leverage our partnerships with AWS, Google Cloud, and Azure for resilient, low-latency infrastructure that scales with demand.",
                subItems: ["Multi-Region Deployment", "Disaster Recovery", "Edge Computing", "Managed Services"],
                metrics: [{ label: "Cloud Regions", value: "12" }, { label: "Failover Time", value: "<30s" }],
              },
            ].map((cat, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: `${cat.color}40` }, transition: "all 0.3s ease" }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 52, height: 52, borderRadius: "12px", background: `linear-gradient(135deg, ${cat.color}18 0%, ${cat.color}05 100%)`, border: `1px solid ${cat.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: cat.color }}>
                        {cat.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>{cat.title}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, mb: 3 }}>{cat.desc}</Typography>
                    <Grid container spacing={1.5} sx={{ mb: 3 }}>
                      {cat.subItems.map((item, j) => (
                        <Grid size={{ xs: 6 }} key={j}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CheckCircleOutlinedIcon sx={{ color: cat.color, fontSize: 16 }} />
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem" }}>{item}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    <Box sx={{ p: 2, bgcolor: `${cat.color}06`, border: `1px solid ${cat.color}12`, borderRadius: 2 }}>
                      {cat.metrics.map((m, j) => (
                        <Box key={j} sx={{ display: "flex", justifyContent: "space-between", py: 0.75, borderBottom: j < cat.metrics.length - 1 ? `1px solid ${cat.color}08` : "none" }}>
                          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>{m.label}</Typography>
                          <Typography variant="caption" sx={{ color: "#fff", fontWeight: 700 }}>{m.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Partner Program Tiers */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Partner Program Tiers</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Choose the partnership level that fits your business goals and scale</Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                tier: "Registered", color: "#64748b", icon: <HandshakeIcon />,
                tagline: "Self-Service Basics",
                desc: "Start integrating with MATBEA with self-service tools and community support. Ideal for startups and smaller fintech companies exploring the ecosystem.",
                features: ["API access & sandbox environment", "Community forum support", "Standard documentation", "Basic analytics dashboard", "Monthly newsletter & updates"],
                cta: "Apply Now",
              },
              {
                tier: "Premier", color: "#8b5cf6", icon: <StarIcon />,
                tagline: "Co-Marketing & Dedicated Support",
                desc: "Unlock co-marketing opportunities, dedicated partner managers, and priority technical support. For partners with proven traction and market reach.",
                features: ["Dedicated partner manager", "Co-marketing campaigns", "Priority API rate limits", "Joint webinars & events", "Custom integration support", "Quarterly business reviews"],
                cta: "Apply Now",
              },
              {
                tier: "Strategic", color: "#22c55e", icon: <StarIcon />,
                tagline: "Joint Development & Revenue Share",
                desc: "Deep integration with joint product development, revenue sharing agreements, and market exclusivity. For partners driving significant volume and innovation.",
                features: ["Joint product development", "Revenue share agreements", "Market exclusivity options", "Executive sponsor program", "Custom SLA guarantees", "Board-level advisory access", "Early access to all features"],
                cta: "Apply Now",
              },
            ].map((t, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", position: "relative", "&:hover": { borderColor: `${t.color}40` }, transition: "all 0.3s ease" }}>
                  {i === 1 && (
                    <Box sx={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", bgcolor: t.color, color: "#fff", px: 2, py: 0.5, borderRadius: 2, fontSize: "0.7rem", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
                      Most Popular
                    </Box>
                  )}
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: "14px", background: `linear-gradient(135deg, ${t.color}18 0%, ${t.color}05 100%)`, border: `1px solid ${t.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: t.color, mb: 2 }}>
                      {t.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>{t.tier} Partner</Typography>
                    <Typography variant="caption" sx={{ color: t.color, fontWeight: 600, mb: 2, display: "block" }}>{t.tagline}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 3, minHeight: 72 }}>{t.desc}</Typography>
                    <Box sx={{ mb: 3 }}>
                      {t.features.map((f, j) => (
                        <Box key={j} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.75, borderBottom: j < t.features.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                          <CheckCircleOutlinedIcon sx={{ color: t.color, fontSize: 16 }} />
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>{f}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button fullWidth variant={i === 1 ? "contained" : "outlined"} sx={{
                      bgcolor: i === 1 ? t.color : "transparent",
                      borderColor: `${t.color}60`,
                      color: i === 1 ? "#fff" : t.color,
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: "none",
                      py: 1.25,
                      "&:hover": { bgcolor: i === 1 ? `${t.color}dd` : `${t.color}12`, borderColor: t.color },
                    }}>
                      {t.cta}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Partner Ecosystem */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Partner Ecosystem</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>A comprehensive network of specialists powering every layer of digital asset infrastructure</Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <BuildIcon />, title: "Technology Partners", color: "#3b82f6",
                categories: [
                  { name: "OMS/EMS", examples: "FlexTrade, Bloomberg EMSX, Fidessa" },
                  { name: "Portfolio Management", examples: "Aladdin, Eze, Charles River" },
                  { name: "Compliance Tools", examples: "Chainalysis, Elliptic, TRM Labs" },
                ],
              },
              {
                icon: <TrendingUpOutlinedIcon />, title: "Liquidity Partners", color: "#8b5cf6",
                categories: [
                  { name: "Market Makers", examples: "Jump Trading, Wintermute, GSR" },
                  { name: "Dark Pools", examples: "CrossTower, LMAX Digital, Cumberland" },
                  { name: "Aggregators", examples: "Paradigm, Caspian, CoinRoutes" },
                ],
              },
              {
                icon: <LockIcon />, title: "Custody Partners", color: "#22c55e",
                categories: [
                  { name: "Cold Storage", examples: "BitGo, Fireblocks, Anchorage" },
                  { name: "Insurance", examples: "Lloyd's, Aon, Evertas" },
                  { name: "Banking", examples: "Silvergate, Signature, SVB" },
                ],
              },
              {
                icon: <TimelineIcon />, title: "Data Partners", color: "#06b6d4",
                categories: [
                  { name: "Analytics", examples: "Kaiko, Coin Metrics, Nomics" },
                  { name: "Index Providers", examples: "CF Benchmarks, MVIS, Lukka" },
                  { name: "Research", examples: "Messari, The Block, Delphi" },
                ],
              },
            ].map((eco, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: `${eco.color}30` }, transition: "all 0.3s ease" }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: "10px", background: `linear-gradient(135deg, ${eco.color}18 0%, ${eco.color}05 100%)`, border: `1px solid ${eco.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: eco.color }}>
                        {eco.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>{eco.title}</Typography>
                    </Box>
                    <Box>
                      {eco.categories.map((cat, j) => (
                        <Box key={j} sx={{ py: 1.5, borderBottom: j < eco.categories.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                          <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600, mb: 0.5 }}>{cat.name}</Typography>
                          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>{cat.examples}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Partner Success Metrics */}
        <Box sx={{ mb: 8, p: { xs: 4, md: 5 }, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Partner Success Metrics</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Our partner program delivers measurable results across the board</Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { value: "200+", label: "Active Partners", sublabel: "across 6 continents", color: "#3b82f6" },
              { value: "$50B+", label: "Partner Volume", sublabel: "in the last 12 months", color: "#8b5cf6" },
              { value: "40+", label: "Countries", sublabel: "with active partnerships", color: "#22c55e" },
              { value: "99.9%", label: "Partner Uptime", sublabel: "across all integrations", color: "#06b6d4" },
            ].map((stat, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={i}>
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color, mb: 1, fontSize: { xs: "2rem", md: "2.75rem" } }}>{stat.value}</Typography>
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600, mb: 0.5 }}>{stat.label}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>{stat.sublabel}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How to Become a Partner */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>How to Become a Partner</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>A streamlined process from application to production partnership</Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { step: "01", title: "Submit Application", desc: "Complete our online partnership application with details about your company, product focus, and target market segment.", duration: "5 minutes", color: "#3b82f6" },
              { step: "02", title: "Discovery Call", desc: "Our partnerships team will schedule a call to understand your goals, technical requirements, and alignment with our ecosystem.", duration: "1 week", color: "#8b5cf6" },
              { step: "03", title: "Technical Review", desc: "Our engineering team evaluates your integration capabilities, API compatibility, and security posture.", duration: "1-2 weeks", color: "#22c55e" },
              { step: "04", title: "Agreement & Onboarding", desc: "Sign the partnership agreement, receive API credentials, and get access to partner resources and support channels.", duration: "1 week", color: "#f59e0b" },
              { step: "05", title: "Integration & Testing", desc: "Build and test your integration using our sandbox environment. Our partner engineering team provides hands-on support.", duration: "2-4 weeks", color: "#06b6d4" },
              { step: "06", title: "Go Live", desc: "Launch your integration in production. Our partner success team ensures smooth operations and ongoing optimization.", duration: "Ongoing", color: "#ec4899" },
            ].map((s, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
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
                    <Typography variant="h6" sx={{ fontWeight: 800, color: s.color }}>{s.step}</Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>{s.desc}</Typography>
                  <Chip label={s.duration} size="small" sx={{ bgcolor: `${s.color}15`, color: s.color, fontSize: "0.7rem", height: 22 }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Partner Benefits */}
        <Box sx={{ mb: 6, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Partner Benefits</Typography>
          <Grid container spacing={2}>
            {[
              "Revenue sharing on referred clients",
              "Co-marketing and brand exposure",
              "Early access to new features",
              "Dedicated partner support",
              "Joint product development",
              "Industry event sponsorship",
              "Custom API rate limits",
              "Priority technical support",
              "Quarterly business reviews",
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
  const docCategories = [
    {
      icon: <MenuBookIcon />,
      title: "Getting Started",
      desc: "Step-by-step guide to setting up your account, generating API keys, and making your first trade.",
      subtopics: ["Account Setup", "API Keys", "Authentication", "First Trade", "SDK Installation"],
      color: "#3b82f6",
    },
    {
      icon: <CodeIcon />,
      title: "API Reference",
      desc: "Complete reference for all REST and WebSocket endpoints with request/response examples.",
      subtopics: ["REST Endpoints", "WebSocket Streams", "FIX Protocol", "Rate Limits", "Error Handling"],
      color: "#8b5cf6",
    },
    {
      icon: <DescriptionIcon />,
      title: "Guides & Tutorials",
      desc: "In-depth guides on trading strategies, custody setup, compliance, and more.",
      subtopics: ["Order Types", "Market Data", "Position Management", "Risk Controls", "Algorithmic Trading"],
      color: "#22c55e",
    },
    {
      icon: <SecurityIcon />,
      title: "Security Best Practices",
      desc: "Recommendations for securing your API keys, accounts, and operational workflows.",
      subtopics: ["Wallet Setup", "Deposit/Withdrawal", "Multi-Sig Configuration", "IP Whitelisting", "Audit Logs"],
      color: "#06b6d4",
    },
  ];

  const docSections = [
    {
      title: "Getting Started",
      icon: <MenuBookIcon sx={{ fontSize: 20 }} />,
      color: "#3b82f6",
      items: [
        { label: "Account Setup", desc: "Create and configure your institutional account" },
        { label: "API Keys", desc: "Generate and manage API credentials" },
        { label: "Authentication", desc: "HMAC signing, OAuth 2.0, and session tokens" },
        { label: "First Trade", desc: "Execute your first order via the API" },
        { label: "SDK Installation", desc: "Install official client libraries" },
      ],
    },
    {
      title: "Trading Guide",
      icon: <TrendingUpIcon sx={{ fontSize: 20 }} />,
      color: "#8b5cf6",
      items: [
        { label: "Order Types", desc: "Limit, market, stop-loss, and TWAP orders" },
        { label: "Market Data", desc: "Real-time quotes, depth, and trade history" },
        { label: "Position Management", desc: "Track and manage open positions" },
        { label: "Risk Controls", desc: "Set limits, alerts, and circuit breakers" },
        { label: "Algorithmic Trading", desc: "Build and deploy trading algorithms" },
      ],
    },
    {
      title: "Custody",
      icon: <SecurityIcon sx={{ fontSize: 20 }} />,
      color: "#22c55e",
      items: [
        { label: "Wallet Setup", desc: "Configure hot, warm, and cold wallets" },
        { label: "Deposit/Withdrawal", desc: "Process crypto and fiat movements" },
        { label: "Multi-Sig Configuration", desc: "Set up multi-signature approval flows" },
        { label: "Security Best Practices", desc: "Key management and operational security" },
      ],
    },
    {
      title: "Compliance",
      icon: <GavelIcon sx={{ fontSize: 20 }} />,
      color: "#f59e0b",
      items: [
        { label: "KYC Process", desc: "Identity verification and onboarding" },
        { label: "Transaction Monitoring", desc: "AML screening and suspicious activity detection" },
        { label: "Reporting", desc: "Regulatory filings and audit trails" },
        { label: "Jurisdiction Requirements", desc: "Region-specific compliance rules" },
      ],
    },
    {
      title: "API Reference",
      icon: <ApiIcon sx={{ fontSize: 20 }} />,
      color: "#06b6d4",
      items: [
        { label: "REST Endpoints", desc: "Full HTTP API with JSON payloads" },
        { label: "WebSocket Streams", desc: "Real-time data subscriptions" },
        { label: "FIX Protocol", desc: "FIX 4.4 for high-frequency trading" },
        { label: "Rate Limits", desc: "Throttling rules and burst allowances" },
        { label: "Error Handling", desc: "Error codes, retries, and idempotency" },
      ],
    },
  ];

  const architectureLayers = [
    { label: "Client Applications", desc: "Your trading systems, dashboards, and mobile apps connecting via REST, WebSocket, or FIX.", color: "#3b82f6", icon: <LanIcon /> },
    { label: "API Gateway", desc: "Authentication, rate limiting, request validation, and routing to internal services.", color: "#8b5cf6", icon: <SecurityIcon /> },
    { label: "Matching Engine", desc: "Ultra-low-latency order matching with sub-microsecond execution and price-time priority.", color: "#22c55e", icon: <SpeedIcon /> },
    { label: "Settlement", desc: "Real-time position updates, margin calculations, and trade settlement across all asset classes.", color: "#f59e0b", icon: <AccountBalanceIcon /> },
    { label: "Custody", desc: "Institutional-grade cold storage, multi-sig wallets, and insurance-backed asset protection.", color: "#06b6d4", icon: <ShieldIcon /> },
  ];

  const codeExamples = [
    {
      lang: "Python",
      title: "Place an Order",
      color: "#3b82f6",
      code: `from matbea import Client

client = Client(
    api_key="your-api-key",
    api_secret="your-api-secret"
)

order = client.create_order(
    symbol="BTC-USD",
    side="buy",
    type="limit",
    price=65000.00,
    quantity=0.5
)

print(f"Order placed: {order.id}")`,
    },
    {
      lang: "JavaScript",
      title: "WebSocket Ticker Stream",
      color: "#8b5cf6",
      code: `import { MatbeaStream } from '@matbea/sdk';

const stream = new MatbeaStream({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret'
});

stream.subscribe('ticker', 'BTC-USD', (data) => {
  console.log('Price:', data.lastPrice);
  console.log('24h Volume:', data.volume24h);
  console.log('Change:', data.priceChange24h);
});

stream.connect();`,
    },
    {
      lang: "cURL",
      title: "Get Account Balance",
      color: "#22c55e",
      code: `curl -X GET https://api.matbea.com/v1/account/balances \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"

# Response:
{
  "balances": [
    { "asset": "BTC", "available": "1.25000000", "locked": "0.00000000" },
    { "asset": "USD", "available": "84500.00", "locked": "12500.00" },
    { "asset": "ETH", "available": "15.75000000", "locked": "0.00000000" }
  ]
}`,
    },
  ];

  const sdks = [
    { name: "Python", version: "3.2.1", install: "pip install matbea-sdk", color: "#3b82f6" },
    { name: "JavaScript/TypeScript", version: "2.8.0", install: "npm install @matbea/sdk", color: "#8b5cf6" },
    { name: "Go", version: "1.5.3", install: "go get github.com/matbea/go-sdk", color: "#06b6d4" },
    { name: "Java", version: "2.1.0", install: "implementation 'com.matbea:sdk:2.1.0'", color: "#f59e0b" },
    { name: "Rust", version: "0.9.2", install: 'matbea-sdk = "0.9"', color: "#ef4444" },
    { name: "Ruby", version: "1.3.0", install: "gem install matbea-sdk", color: "#ec4899" },
  ];

  return (
    <Box>
      <PageHeader title="Documentation" subtitle="Comprehensive guides, tutorials, and reference materials to help you integrate with MATBEA Enterprise." badge="Resources" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Documentation Categories */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 4 }}>Browse Documentation</Typography>
          <Grid container spacing={3}>
            {docCategories.map((f, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: `${f.color}40`, bgcolor: "rgba(255,255,255,0.03)" }, cursor: "pointer", transition: "all 0.3s ease" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: "10px", bgcolor: `${f.color}15`, border: `1px solid ${f.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color }}>{f.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>{f.title}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.7, mb: 2 }}>{f.desc}</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                      {f.subtopics.map((sub, j) => (
                        <Chip key={j} label={sub} size="small" sx={{ bgcolor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", height: 22, "&:hover": { bgcolor: `${f.color}20`, color: f.color } }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Documentation Sections */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Documentation Sections</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Navigate through our comprehensive documentation library</Typography>
          </Box>
          <Grid container spacing={3}>
            {docSections.map((section, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: `${section.color}30`, bgcolor: "rgba(255,255,255,0.03)" }, cursor: "pointer", transition: "all 0.3s ease" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: `${section.color}15`, border: `1px solid ${section.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: section.color }}>{section.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", fontSize: "1rem" }}>{section.title}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {section.items.map((item, j) => (
                        <Box key={j} sx={{ display: "flex", gap: 1.5, "&:hover": { bgcolor: "rgba(255,255,255,0.03)", borderRadius: 1, px: 1, py: 0.5, mx: -1 } }}>
                          <CheckCircleOutlinedIcon sx={{ color: section.color, fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{item.label}</Typography>
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{item.desc}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Architecture Overview */}
        <Box sx={{ mb: 8, p: { xs: 3, md: 4 }, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Architecture Overview</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Enterprise-grade infrastructure built for performance and security</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "stretch", gap: { xs: 2, md: 0 } }}>
            {architectureLayers.map((layer, i) => (
              <Box key={i} sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                <Box sx={{ flex: 1, p: 3, bgcolor: "rgba(255,255,255,0.03)", border: `1px solid ${layer.color}25`, borderRadius: 2, transition: "all 0.3s ease", "&:hover": { bgcolor: `${layer.color}08`, borderColor: `${layer.color}40`, transform: "translateY(-2px)" } }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", bgcolor: `${layer.color}15`, border: `1px solid ${layer.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: layer.color, mb: 2 }}>{layer.icon}</Box>
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 0.5, fontSize: "0.95rem" }}>{layer.label}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6, display: "block" }}>{layer.desc}</Typography>
                </Box>
                {i < architectureLayers.length - 1 && (
                  <Box sx={{ display: { xs: "none", md: "block" }, px: 1, color: "rgba(255,255,255,0.2)" }}>
                    <ArrowForwardIcon sx={{ fontSize: 20 }} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Code Examples */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Code Examples</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Copy-paste ready examples to get you started quickly</Typography>
          </Box>
          <Grid container spacing={3}>
            {codeExamples.map((ex, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Box sx={{ height: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                    <Chip label={ex.lang} size="small" sx={{ bgcolor: `${ex.color}20`, color: ex.color, fontWeight: 600, fontSize: "0.7rem", height: 22 }} />
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>{ex.title}</Typography>
                  </Box>
                  <Box component="pre" sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: 2.5, overflow: "auto", color: "#999", fontFamily: "monospace", fontSize: "0.75rem", lineHeight: 1.8, height: 320 }}>
                    {ex.code}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Start */}
        <Box sx={{ mb: 8, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, p: { xs: 3, md: 4 } }}>
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

        {/* SDKs & Libraries */}
        <Box>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>SDKs & Libraries</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Official client libraries maintained by our engineering team</Typography>
          </Box>
          <Grid container spacing={2}>
            {sdks.map((sdk, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card elevation={0} sx={{ "&:hover": { borderColor: `${sdk.color}40`, bgcolor: "rgba(255,255,255,0.03)" }, transition: "all 0.3s ease" }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                      <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700 }}>{sdk.name}</Typography>
                      <Chip label={`v${sdk.version}`} size="small" sx={{ bgcolor: `${sdk.color}20`, color: sdk.color, fontSize: "0.7rem", height: 20 }} />
                    </Box>
                    <Box component="pre" sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 1, p: 1.5, overflow: "auto", color: "#999", fontFamily: "monospace", fontSize: "0.72rem", lineHeight: 1.5 }}>
                      {sdk.install}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

function APIReferencePage() {
  const endpointCategories = [
    { title: "Authentication", desc: "API key management, HMAC signing, and session tokens.", icon: <LockIcon />, color: "#3b82f6", endpoints: ["POST /auth/token", "POST /auth/refresh", "POST /auth/revoke", "GET /auth/keys", "POST /auth/keys/generate", "DELETE /auth/keys/{id}", "GET /auth/sessions"] },
    { title: "Market Data", desc: "Real-time and historical market data endpoints.", icon: <ShowChartIcon />, color: "#8b5cf6", endpoints: ["GET /markets/ticker", "GET /markets/ticker/{symbol}", "GET /markets/depth", "GET /markets/trades", "GET /markets/candles", "GET /markets/stats", "GET /markets/instruments"] },
    { title: "Trading", desc: "Order management, execution, and position tracking.", icon: <SwapVertIcon />, color: "#22c55e", endpoints: ["POST /orders", "POST /orders/batch", "GET /orders", "GET /orders/{id}", "DELETE /orders/{id}", "DELETE /orders/all", "GET /orders/open", "GET /orders/filled", "GET /fills"] },
    { title: "Account", desc: "Balance, portfolio, and account management.", icon: <AccountBalanceWalletIcon />, color: "#06b6d4", endpoints: ["GET /account/balances", "GET /account/balance/{currency}", "GET /account/portfolio", "GET /account/history", "GET /account/fees", "GET /account/limits", "POST /account/transfer"] },
    { title: "Custody", desc: "Wallet management and withdrawal operations.", icon: <SecurityIcon />, color: "#f59e0b", endpoints: ["POST /custody/withdraw", "GET /custody/deposits", "GET /custody/address", "POST /custody/address/generate", "GET /custody/history", "GET /custody/whitelist", "POST /custody/whitelist"] },
    { title: "WebSocket", desc: "Real-time data streams for market data and orders.", icon: <LanIcon />, color: "#ef4444", endpoints: ["wss://stream.matbea.com/ticker", "wss://stream.matbea.com/depth", "wss://stream.matbea.com/trades", "wss://stream.matbea.com/orders", "wss://stream.matbea.com/account", "wss://stream.matbea.com/candles"] },
  ];

  const endpointTable = [
    { method: "GET", path: "/markets/instruments", desc: "List all available trading instruments", rate: "100 req/min", auth: "No" },
    { method: "GET", path: "/markets/ticker/{symbol}", desc: "Real-time ticker for a specific symbol", rate: "300 req/min", auth: "No" },
    { method: "GET", path: "/markets/depth", desc: "Order book depth with configurable levels", rate: "120 req/min", auth: "No" },
    { method: "GET", path: "/markets/candles", desc: "OHLCV candlestick data (1m to 1d intervals)", rate: "60 req/min", auth: "No" },
    { method: "GET", path: "/markets/trades", desc: "Recent trades for a given symbol pair", rate: "120 req/min", auth: "No" },
    { method: "POST", path: "/orders", desc: "Place a new order (limit, market, stop-limit)", rate: "60 req/min", auth: "Yes" },
    { method: "POST", path: "/orders/batch", desc: "Submit up to 100 orders in a single request", rate: "10 req/min", auth: "Yes" },
    { method: "GET", path: "/orders", desc: "List all orders with filters and pagination", rate: "120 req/min", auth: "Yes" },
    { method: "GET", path: "/orders/{id}", desc: "Retrieve a specific order by ID", rate: "300 req/min", auth: "Yes" },
    { method: "DELETE", path: "/orders/{id}", desc: "Cancel a specific open order", rate: "120 req/min", auth: "Yes" },
    { method: "DELETE", path: "/orders/all", desc: "Cancel all open orders for an account", rate: "10 req/min", auth: "Yes" },
    { method: "GET", path: "/account/balances", desc: "List all asset balances (available + locked)", rate: "60 req/min", auth: "Yes" },
    { method: "GET", path: "/account/portfolio", desc: "Aggregated portfolio with P&L metrics", rate: "30 req/min", auth: "Yes" },
    { method: "GET", path: "/account/history", desc: "Transaction and trade history with date range", rate: "30 req/min", auth: "Yes" },
    { method: "POST", path: "/custody/withdraw", desc: "Initiate a withdrawal to an approved address", rate: "10 req/min", auth: "Yes" },
    { method: "GET", path: "/custody/deposits", desc: "List recent deposits with confirmations", rate: "60 req/min", auth: "Yes" },
    { method: "POST", path: "/custody/address/generate", desc: "Generate a new deposit address for a currency", rate: "5 req/min", auth: "Yes" },
    { method: "GET", path: "/custody/whitelist", desc: "List whitelisted withdrawal addresses", rate: "60 req/min", auth: "Yes" },
  ];

  const errorCodes = [
    { code: 400, title: "Bad Request", desc: "The request body is malformed or missing required fields.", causes: "Invalid JSON, missing parameters, invalid enum values, or malformed numeric strings." },
    { code: 401, title: "Unauthorized", desc: "Authentication credentials are missing or invalid.", causes: "Expired token, invalid API key, missing HMAC signature, or malformed Authorization header." },
    { code: 403, title: "Forbidden", desc: "Authenticated but insufficient permissions for this endpoint.", causes: "API key lacks required scope, IP not whitelisted, or account type restriction (e.g., retail key on institutional endpoint)." },
    { code: 404, title: "Not Found", desc: "The requested resource does not exist.", causes: "Invalid order ID, deleted instrument symbol, or incorrect endpoint path." },
    { code: 429, title: "Rate Limited", desc: "Too many requests — back off and retry.", causes: "Exceeded per-endpoint rate limit or global request cap. Check X-RateLimit-Reset header for retry timing." },
    { code: 500, title: "Internal Error", desc: "An unexpected server error occurred.", causes: "Temporary infrastructure issue. These are automatically logged and escalated. Retry with exponential backoff." },
  ];

  return (
    <Box>
      <PageHeader title="API Reference" subtitle="Complete reference for all MATBEA Enterprise API endpoints. REST and WebSocket documentation with interactive examples." badge="API" />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

        {/* Endpoint Categories */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Endpoint Categories</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>All available API surfaces organized by domain</Typography>
          </Box>
          <Grid container spacing={3}>
            {endpointCategories.map((section, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3, transition: "all 0.3s ease", "&:hover": { borderColor: `${section.color}30`, transform: "translateY(-2px)" } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: "8px", background: `linear-gradient(135deg, ${section.color}20 0%, ${section.color}05 100%)`, border: `1px solid ${section.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: section.color }}>{section.icon}</Box>
                      <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>{section.title}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)", mb: 2 }}>{section.desc}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      {section.endpoints.map((ep, j) => (
                        <Box key={j} sx={{ bgcolor: "rgba(255,255,255,0.03)", px: 1.5, py: 0.75, borderRadius: 1, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#999", borderLeft: `2px solid ${section.color}40` }}>
                          {ep}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Authentication Section */}
        <Box sx={{ mb: 8, p: { xs: 3, md: 4 }, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Authentication</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Secure access to all MATBEA Enterprise API endpoints</Typography>
          </Box>

          <Grid container spacing={3}>
            {/* API Key Generation */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <LockIcon sx={{ color: "#3b82f6", fontSize: 20 }} />
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700 }}>API Key Generation</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>
                  Generate API keys from the MATBEA Enterprise dashboard under Settings → API Keys. Each key pair consists of a public <strong style={{ color: "#fff" }}>API Key</strong> and a secret <strong style={{ color: "#fff" }}>API Secret</strong>. The secret is shown only once at creation time.
                </Typography>
                <Box sx={{ p: 2, bgcolor: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 1.5 }}>
                  <Typography variant="caption" sx={{ color: "#3b82f6", fontWeight: 600, display: "block", mb: 0.5 }}>Available Key Scopes</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}>
                    read · trade · withdraw · custody · admin
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* HMAC Signature Computation */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <SecurityIcon sx={{ color: "#8b5cf6", fontSize: 20 }} />
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700 }}>HMAC Signature Computation</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>
                  All authenticated requests require an HMAC-SHA256 signature. The signature is computed from the request timestamp, method, path, and body, then sent in the <strong style={{ color: "#fff" }}>X-Signature</strong> header.
                </Typography>
                <Box sx={{ p: 2, bgcolor: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 1.5, overflowX: "auto" }}>
                  <Typography variant="caption" sx={{ color: "#8b5cf6", fontWeight: 600, display: "block", mb: 1 }}>Python — HMAC Signing Example</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8, whiteSpace: "pre-wrap", display: "block" }}>
{`import hmac, hashlib, time

def sign_request(secret, method, path, body=""):
    timestamp = str(int(time.time()))
    payload = timestamp + method.upper() + path + body
    signature = hmac.new(
      secret.encode(), payload.encode(),
      hashlib.sha256
    ).hexdigest()
    return timestamp, signature

ts, sig = sign_request(SECRET, "POST", "/api/v2/orders")
headers = {"X-Timestamp": ts, "X-Signature": sig}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Token-Based Auth Flow */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <VerifiedUserIcon sx={{ color: "#22c55e", fontSize: 20 }} />
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700 }}>Token-Based Auth Flow</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>
                  Exchange your API key pair for a short-lived bearer token via <strong style={{ color: "#fff" }}>POST /auth/token</strong>. Tokens expire after 1 hour. Use <strong style={{ color: "#fff" }}>POST /auth/refresh</strong> to obtain a new token without re-authenticating.
                </Typography>
                <Box sx={{ p: 2, bgcolor: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 1.5 }}>
                  <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 600, display: "block", mb: 0.5 }}>Token Response</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8, whiteSpace: "pre-wrap", display: "block" }}>
{`{
  "access_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcy...",
  "scopes": ["read", "trade"]
}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* IP Whitelisting */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <ShieldIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700 }}>IP Whitelisting</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 2 }}>
                  Restrict API key access to specific IP addresses or CIDR ranges. When enabled, requests from non-whitelisted IPs return <strong style={{ color: "#fff" }}>403 Forbidden</strong>. Enterprise accounts support up to 20 whitelisted entries per key.
                </Typography>
                <Box sx={{ p: 2, bgcolor: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 1.5 }}>
                  <Typography variant="caption" sx={{ color: "#f59e0b", fontWeight: 600, display: "block", mb: 0.5 }}>Allowed Formats</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}>
                    192.168.1.100<br />
                    10.0.0.0/8<br />
                    2001:db8::/32
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Endpoint Reference Table */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Endpoint Reference</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Complete method, path, rate limit, and authentication details</Typography>
          </Box>

          <Box sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
            {/* Table Header */}
            <Box sx={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 120px 100px", gap: 2, px: 3, py: 2, bgcolor: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Method</Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Path</Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Rate Limit</Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Auth</Typography>
            </Box>
            {/* Table Rows */}
            {endpointTable.map((ep, i) => (
              <Box
                key={i}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 1fr 120px 100px",
                  gap: 2,
                  px: 3,
                  py: 1.75,
                  borderBottom: i < endpointTable.length - 1 ? "1px solid rgba(255,255,255,0.03)" : undefined,
                  transition: "all 0.2s ease",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
                }}
              >
                <Chip
                  label={ep.method}
                  size="small"
                  sx={{
                    width: "fit-content",
                    height: 22,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    bgcolor: ep.method === "GET" ? "rgba(34,197,94,0.1)" : ep.method === "POST" ? "rgba(59,130,246,0.1)" : "rgba(239,68,68,0.1)",
                    color: ep.method === "GET" ? "#22c55e" : ep.method === "POST" ? "#3b82f6" : "#ef4444",
                    border: `1px solid ${ep.method === "GET" ? "rgba(34,197,94,0.2)" : ep.method === "POST" ? "rgba(59,130,246,0.2)" : "rgba(239,68,68,0.2)"}`,
                  }}
                />
                <Typography variant="caption" sx={{ color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", display: "flex", alignItems: "center" }}>{ep.path}</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center" }}>{ep.desc}</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", display: "flex", alignItems: "center" }}>{ep.rate}</Typography>
                <Chip
                  label={ep.auth}
                  size="small"
                  sx={{
                    width: "fit-content",
                    height: 22,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    bgcolor: ep.auth === "Yes" ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.05)",
                    color: ep.auth === "Yes" ? "#f59e0b" : "rgba(255,255,255,0.4)",
                    border: `1px solid ${ep.auth === "Yes" ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.08)"}`,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Error Codes */}
        <Box sx={{ mb: 8, p: { xs: 3, md: 4 }, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Error Codes</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Standard HTTP error responses and their meanings</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {errorCodes.map((err, i) => (
              <Box
                key={i}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "120px 1fr 1fr" },
                  gap: 2,
                  p: 2.5,
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2,
                  transition: "all 0.2s ease",
                  "&:hover": { borderColor: "rgba(255,255,255,0.12)" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Chip
                    label={err.code}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      bgcolor: err.code >= 500 ? "rgba(239,68,68,0.1)" : err.code === 429 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.08)",
                      color: err.code >= 500 ? "#ef4444" : err.code === 429 ? "#f59e0b" : "#f87171",
                      border: `1px solid ${err.code >= 500 ? "rgba(239,68,68,0.2)" : err.code === 429 ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.15)"}`,
                    }}
                  />
                  <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600, display: { xs: "inline", md: "none" } }}>{err.title}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600, mb: 0.5, display: { xs: "none", md: "block" } }}>{err.title}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{err.desc}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.6, fontStyle: "italic" }}>{err.causes}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* WebSocket Protocol */}
        <Box sx={{ mb: 8, p: { xs: 3, md: 4 }, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>WebSocket Protocol</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Real-time streaming via persistent WebSocket connections</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/* Connection Lifecycle */}
                <Box sx={{ p: 2.5, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: "#3b82f6", fontWeight: 700, mb: 1, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Connection Lifecycle</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    1. Establish TLS WebSocket to <strong style={{ color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>wss://stream.matbea.com/v2</strong><br />
                    2. Authenticate within 5 seconds using the auth message<br />
                    3. Subscribe to channels (ticker, depth, trades, orders)<br />
                    4. Receive streaming JSON messages<br />
                    5. Server closes idle connections after 30 minutes of inactivity
                  </Typography>
                </Box>

                {/* Subscription Model */}
                <Box sx={{ p: 2.5, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: "#8b5cf6", fontWeight: 700, mb: 1, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Subscription Model</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    Send a <strong style={{ color: "#fff" }}>subscribe</strong> message after authentication. Each subscription targets a specific channel and symbol. You can subscribe to up to <strong style={{ color: "#fff" }}>50 channels</strong> per connection. Unsubscribe to stop receiving data for a channel.
                  </Typography>
                </Box>

                {/* Message Format */}
                <Box sx={{ p: 2.5, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: "#22c55e", fontWeight: 700, mb: 1, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Message Format (JSON)</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    All messages are JSON objects with a <strong style={{ color: "#fff" }}>type</strong> field. Server messages include <strong style={{ color: "#fff" }}>channel</strong>, <strong style={{ color: "#fff" }}>symbol</strong>, and <strong style={{ color: "#fff" }}>data</strong> fields. Client messages use <strong style={{ color: "#fff" }}>action</strong> (subscribe/unsubscribe/auth) with <strong style={{ color: "#fff" }}>params</strong>.
                  </Typography>
                </Box>

                {/* Heartbeat & Reconnection */}
                <Box sx={{ p: 2.5, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: "#06b6d4", fontWeight: 700, mb: 1, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Heartbeat & Reconnection</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    Server sends a <strong style={{ color: "#fff" }}>ping</strong> every 15 seconds. Client must respond with <strong style={{ color: "#fff" }}>pong</strong> within 5 seconds or the connection is terminated. On disconnect, use exponential backoff starting at 1s with max 30s. Resume subscriptions on reconnect.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, bgcolor: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "#3b82f6", fontWeight: 700, mb: 2 }}>Client Implementation Example</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8, whiteSpace: "pre-wrap", display: "block" }}>
{`const ws = new WebSocket(
  "wss://stream.matbea.com/v2"
);

ws.onopen = () => {
  // Step 1: Authenticate
  ws.send(JSON.stringify({
    action: "auth",
    params: {
      api_key: API_KEY,
      timestamp: Date.now(),
      signature: computeHMAC(...)
    }
  }));
};

ws.onmessage = (msg) => {
  const { type, channel, data } =
    JSON.parse(msg.data);

  if (type === "ping") {
    ws.send(JSON.stringify({ type: "pong" }));
    return;
  }

  switch (channel) {
    case "ticker":
      handleTicker(data);
      break;
    case "depth":
      handleDepth(data);
      break;
    case "orders":
      handleOrderUpdate(data);
      break;
  }
};

// Step 2: Subscribe after auth
ws.onopen = () => {
  ws.send(JSON.stringify({
    action: "subscribe",
    params: {
      channel: "ticker",
      symbols: ["BTC/USDT", "ETH/USDT"]
    }
  }));
};`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Versioning & Changelog */}
        <Box sx={{ mb: 8, p: { xs: 3, md: 4 }, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>Versioning & Changelog</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>API versioning policy and recent updates</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ p: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, height: "100%" }}>
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>Versioning Policy</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  The current stable version is <strong style={{ color: "#fff" }}>v2</strong>. API versions are embedded in the URL path (<strong style={{ color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>/api/v2/...</strong>). Previous versions remain available for 12 months after deprecation. Breaking changes only occur in new major versions.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ p: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>Recent Changelog</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    { version: "v2.4.0", date: "Jul 15, 2025", changes: ["Added batch order endpoint (POST /orders/batch)", "WebSocket v2 with multiplexed channel support", "New rate limit headers: X-RateLimit-Remaining, X-RateLimit-Reset"], color: "#22c55e" },
                    { version: "v2.3.0", date: "May 20, 2025", changes: ["Added account transfer endpoint", "Support for USDC margin on futures", "Improved rate limiting — per-endpoint instead of global"], color: "#3b82f6" },
                    { version: "v2.2.0", date: "Mar 8, 2025", changes: ["Custody whitelist management endpoints", "Added 1-hour candle interval to market data", "Deprecated v1 endpoints — migration guide available"], color: "#8b5cf6" },
                    { version: "v2.1.0", date: "Jan 12, 2025", changes: ["Introduced HMAC-SHA256 signing (replacing MD5)", "Added IP whitelisting for API keys", "WebSocket authentication within 5s connection window"], color: "#f59e0b" },
                  ].map((release, i) => (
                    <Box key={i} sx={{ pl: 2, borderLeft: `2px solid ${release.color}`, ml: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                        <Chip label={release.version} size="small" sx={{ height: 20, fontSize: "0.7rem", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", bgcolor: `${release.color}15`, color: release.color, border: `1px solid ${release.color}25` }} />
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)" }}>{release.date}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                        {release.changes.map((c, j) => (
                          <Typography key={j} variant="caption" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>• {c}</Typography>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

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
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the MATBEA Enterprise platform, website, APIs, or any related services (collectively, the \"Platform\"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These Terms constitute a legally binding agreement between you (or the entity you represent) and MATBEA Enterprise. If you do not agree to any provision of these Terms, you must immediately cease all use of the Platform and its services.",
    },
    {
      title: "2. Definitions",
      content: "For the purposes of these Terms, the following definitions apply: \"Platform\" refers to the MATBEA Enterprise trading platform, including its web interface, mobile applications, and programmatic APIs. \"Services\" means all trading, custody, settlement, reporting, and ancillary services offered through the Platform. \"User,\" \"you,\" or \"your\" refers to any individual or legal entity that has registered an account and is authorized to use the Services. \"Content\" encompasses all data, text, graphics, market information, analytics, software, and other materials available on or through the Platform. \"Digital Assets\" refers to cryptocurrencies, tokens, stablecoins, and other blockchain-based instruments supported by MATBEA Enterprise.",
    },
    {
      title: "3. Eligibility",
      content: "The Services are available exclusively to institutional investors, qualified purchasers, and accredited investors as defined under applicable securities regulations (including Rule 501 of Regulation D under the U.S. Securities Act of 1933). You must be at least 18 years of age, possess the legal capacity to enter into binding agreements, and not be located in, or a resident of, any jurisdiction where the use of the Platform is prohibited. MATBEA Enterprise reserves the right to verify your eligibility at any time and to restrict or terminate access if eligibility criteria are no longer met.",
    },
    {
      title: "4. Account Registration",
      content: "To access the Services, you must complete the institutional onboarding process, which includes identity verification (KYC/KYB), submission of corporate documentation, and execution of all required legal agreements. You are solely responsible for maintaining the confidentiality and security of your account credentials, API keys, and any authentication tokens. You agree to immediately notify MATBEA Enterprise of any unauthorized access or suspected security breach. Each registered account is non-transferable, and you may not share, sell, or assign your account to any third party without prior written consent.",
    },
    {
      title: "5. Services Description",
      content: "MATBEA Enterprise provides institutional-grade cryptocurrency trading, custody, and settlement services. Our trading services include spot and derivative markets with deep liquidity sourced from a global network of market makers and liquidity providers. Custody services offer cold storage, multi-signature wallet infrastructure, and insurance coverage for digital assets held on the Platform. Settlement services enable real-time or T+1 trade settlement depending on the asset class. We reserve the right to modify, suspend, or discontinue any service at any time, and to impose volume or transaction limits at our sole discretion.",
    },
    {
      title: "6. Fees and Payment",
      content: "Trading fees, custody fees, withdrawal fees, and other charges are published in the MATBEA Enterprise Fee Schedule, which is incorporated by reference into these Terms. Fees may vary based on trading volume, asset type, and account tier. MATBEA Enterprise reserves the right to modify the Fee Schedule with at least 30 days' prior written notice to the email address associated with your account. All fees are non-refundable except where required by applicable law. Overdue balances may accrue interest at a rate of 1.5% per month, and MATBEA Enterprise reserves the right to offset outstanding balances against any funds held in your account.",
    },
    {
      title: "7. Risk Disclosure",
      content: "You acknowledge that investments in Digital Assets carry significant risk, including but not limited to: market risk (prices may decline rapidly or become worthless), technology risk (blockchain vulnerabilities, smart contract bugs, and cybersecurity threats), regulatory risk (changes in laws or enforcement actions may restrict or prohibit the holding or trading of certain assets), and liquidity risk (certain Digital Assets may become illiquid, resulting in unfavorable execution prices). MATBEA Enterprise does not guarantee the performance of any Digital Asset, and past performance is not indicative of future results. You should only commit capital that you can afford to lose entirely.",
    },
    {
      title: "8. User Obligations",
      content: "You agree to comply with all applicable laws, regulations, and sanctions programs when using the Platform. You shall not engage in market manipulation, wash trading, spoofing, layering, or any other conduct designed to artificially influence prices or trading volumes. You must not use the Platform for money laundering, terrorist financing, or any other unlawful purpose. You are required to promptly report any suspicious activity observed on the Platform to MATBEA Enterprise compliance team. Failure to comply with these obligations may result in immediate account suspension or termination.",
    },
    {
      title: "9. Intellectual Property",
      content: "All Content, trademarks, logos, trade names, service marks, patents, copyrights, and other intellectual property rights associated with the Platform are the exclusive property of MATBEA Enterprise or its licensors. You are granted a limited, non-exclusive, non-transferable, revocable license to use the Platform solely for its intended purpose. You may not copy, modify, distribute, sell, lease, or reverse-engineer any portion of the Platform, nor may you use any MATBEA Enterprise trademarks or branding without prior written consent. Any feedback or suggestions you provide regarding the Platform become the sole property of MATBEA Enterprise.",
    },
    {
      title: "10. Limitation of Liability",
      content: "To the maximum extent permitted by applicable law, MATBEA Enterprise, its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, revenue, data, or business opportunities arising out of or related to your use of or inability to use the Platform. In no event shall the total aggregate liability of MATBEA Enterprise exceed the fees you paid to MATBEA Enterprise during the twelve (12) months immediately preceding the event giving rise to the claim.",
    },
    {
      title: "11. Indemnification",
      content: "You agree to indemnify, defend, and hold harmless MATBEA Enterprise and its affiliates, officers, directors, employees, agents, and successors from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of the Platform, your violation of these Terms, or your violation of any applicable law, regulation, or third-party right. This obligation survives the termination or expiration of your account and these Terms.",
    },
    {
      title: "12. Termination",
      content: "MATBEA Enterprise may suspend or terminate your access to the Platform at any time, with or without cause, and with or without prior notice. Grounds for termination include, but are not limited to, violation of these Terms, fraudulent activity, failure to pay outstanding fees, or conduct that MATBEA Enterprise reasonably believes is harmful to other users or to its business interests. Upon termination, your right to use the Platform ceases immediately. Any pending trades may be cancelled, and remaining balances will be returned to you in accordance with applicable law. Provisions that by their nature should survive termination shall remain in effect.",
    },
    {
      title: "13. Dispute Resolution",
      content: "Any dispute, controversy, or claim arising out of or relating to these Terms shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration shall be conducted in English in Wilmington, Delaware, and the arbitral award may be entered as a judgment in any court of competent jurisdiction. These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Each party irrevocably waives its right to a jury trial with respect to any dispute arising hereunder.",
    },
    {
      title: "14. Modifications",
      content: "MATBEA Enterprise reserves the right to amend or modify these Terms of Service at any time at its sole discretion. Material changes will be communicated to you via email to the address on file or through a prominent notice on the Platform at least 30 days before they take effect. Your continued use of the Platform after the effective date of any revised Terms constitutes your acceptance of the updated terms. If you do not agree to the revised Terms, you must discontinue use of the Platform and close your account prior to the effective date.",
    },
    {
      title: "15. Contact Information",
      content: "If you have any questions, concerns, or complaints regarding these Terms of Service, please contact MATBEA Enterprise at: Legal Department, MATBEA Enterprise Inc., 1209 North Market Street, Suite 320, Wilmington, Delaware 19801, United States. You may also reach us by email at legal@matbea.com or by phone at +1 (302) 555-0100. We aim to respond to all inquiries within 2 business days.",
    },
  ];

  return (
    <Box>
      <PageHeader title="Terms of Service" subtitle="Please read these terms carefully before using MATBEA Enterprise services." badge="Legal" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>Last updated: January 15, 2026</Typography>

          <Box sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 1.5, p: 3, mb: 4 }}>
            <Typography variant="subtitle2" sx={{ color: "#fff", mb: 2, fontWeight: 600 }}>Table of Contents</Typography>
            {sections.map((s, i) => (
              <Typography key={i} variant="body2" sx={{ color: "#999", lineHeight: 2.2, cursor: "pointer", "&:hover": { color: "#3b82f6" } }}>
                {s.title}
              </Typography>
            ))}
          </Box>

          {sections.map((section, i) => (
            <Box key={i} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1.5, fontWeight: 600 }}>{section.title}</Typography>
              <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>{section.content}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function PrivacyPage() {
  const sections = [
    { id: "introduction", num: "1", title: "Introduction" },
    { id: "info-collect", num: "2", title: "Information We Collect" },
    { id: "info-collect-how", num: "3", title: "How We Collect Information" },
    { id: "info-use", num: "4", title: "How We Use Your Information" },
    { id: "legal-basis", num: "5", title: "Legal Basis for Processing" },
    { id: "info-sharing", num: "6", title: "Information Sharing" },
    { id: "intl-transfers", num: "7", title: "International Data Transfers" },
    { id: "retention", num: "8", title: "Data Retention" },
    { id: "security", num: "9", title: "Data Security" },
    { id: "rights", num: "10", title: "Your Rights" },
    { id: "cookies", num: "11", title: "Cookies and Tracking" },
    { id: "children", num: "12", title: "Children's Privacy" },
    { id: "changes", num: "13", title: "Changes to This Policy" },
    { id: "contact", num: "14", title: "Contact Us" },
  ];

  return (
    <Box>
      <PageHeader title="Privacy Policy" subtitle="How MATBEA Enterprise collects, uses, and protects your personal information across our institutional platform." badge="Legal" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", gap: 3, mb: 2, flexWrap: "wrap" }}>
            <Typography variant="body2" sx={{ color: "#666" }}>Last updated: January 15, 2026</Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>Effective Date: February 1, 2026</Typography>
          </Box>

          {/* Table of Contents */}
          <Box sx={{ mb: 4, p: { xs: 2, md: 3 }, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, mb: 1.5 }}>Table of Contents</Typography>
            <Box component="nav" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 0.5 }}>
              {sections.map((s) => (
                <Typography key={s.id} variant="body2" component="a" href={`#${s.id}`} sx={{ color: "#888", textDecoration: "none", py: 0.5, "&:hover": { color: "#fff" } }}>
                  {s.num}. {s.title}
                </Typography>
              ))}
            </Box>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 4 }} />

          {/* Section 1 */}
          <Box id="introduction" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>1. Introduction</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              MATBEA Enterprise ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our institutional cryptocurrency trading platform and related services.
            </Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8, mt: 1.5 }}>
              We recognize that privacy is fundamental to the trust our institutional clients place in us. This policy applies to all users of our platform, including individual traders, corporate entities, fund managers, and their authorized representatives. By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 2 */}
          <Box id="info-collect" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>2. Information We Collect</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We collect several categories of information to provide and improve our services. The specific data we gather depends on your interactions with our platform and the services you utilize.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Personal Data</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              During account registration and identity verification, we collect your full name, email address, phone number, date of birth, residential address, nationality, and government-issued identification documents (such as passport or driver's license). For corporate accounts, we also collect business registration documents, organizational structure, and beneficial ownership information.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Financial Data</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We collect information related to your financial transactions, including deposit and withdrawal history, trading activity, account balances, bank account details for fiat transactions, and wallet addresses for cryptocurrency transfers. This data is essential for transaction processing, regulatory compliance, and account management.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Technical Data</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Our systems automatically collect technical information when you access our platform, including your IP address, browser type and version, operating system, device identifiers, login timestamps, and API usage patterns. This information helps us maintain platform security, detect unauthorized access, and optimize performance.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Usage Data</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We track how you interact with our platform, including pages visited, features used, search queries, order history, and navigation patterns. This data is used in aggregated and anonymized form to improve our services, develop new features, and understand market trends.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 3 */}
          <Box id="info-collect-how" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>3. How We Collect Information</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We employ multiple methods to collect information about you, ensuring comprehensive coverage while maintaining transparency about our data practices.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Directly From You</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Most of the information we hold is provided directly by you during account creation, identity verification, customer support interactions, and through your ongoing use of our trading platform. When you submit documents for KYC verification, open support tickets, or communicate with our team, you actively share information with us.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Automatically</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Our platform uses cookies, web beacons, pixel tags, and similar tracking technologies to collect information automatically as you browse and interact with our services. This includes device information, browsing behavior, and usage patterns that help us personalize your experience and maintain platform security.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>From Third Parties</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We may receive information from third-party sources, including identity verification providers, credit reference agencies, publicly available databases, and our business partners. This data supplements the information you provide and helps us verify your identity, assess risk, and comply with regulatory requirements.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 4 */}
          <Box id="info-use" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>4. How We Use Your Information</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We use the information we collect for a variety of purposes, all aimed at providing secure, reliable, and compliant institutional crypto services.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Service Provision and Operation</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Your information is used to create and manage your account, process transactions, execute trades, facilitate deposits and withdrawals, provide customer support, and deliver the full range of services available on our platform. We rely on this data to ensure seamless operation of our trading infrastructure.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Regulatory Compliance</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              As a regulated financial institution, we are legally required to collect, verify, and maintain certain information about our clients. This includes performing anti-money laundering (AML) and counter-terrorism financing (CTF) checks, maintaining transaction records, and reporting suspicious activities to relevant authorities.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Marketing and Communications</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We may use your contact information to send you updates about our services, market insights, product announcements, and regulatory changes that may affect your account. You can opt out of marketing communications at any time through your account settings or by contacting us directly.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Analytics and Improvement</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We analyze usage patterns, trading behavior, and platform performance data to improve our services, develop new features, optimize user experience, and ensure the reliability and security of our infrastructure. This analysis is conducted on aggregated and anonymized data wherever possible.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 5 */}
          <Box id="legal-basis" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>5. Legal Basis for Processing</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We process your personal data only when we have a valid legal basis to do so under applicable data protection laws, including the General Data Protection Regulation (GDPR) and other regional frameworks.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Consent</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Where required, we obtain your explicit consent before processing certain categories of personal data, such as for marketing communications or the use of non-essential cookies. You may withdraw your consent at any time without affecting the lawfulness of processing that occurred prior to withdrawal.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Contractual Necessity</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Much of our data processing is necessary to fulfill our contractual obligations to you, including providing access to our trading platform, processing transactions, and maintaining your account. Without this processing, we would be unable to deliver the services you have requested.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Legitimate Interest</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We may process your data based on our legitimate interests, such as preventing fraud, ensuring network security, improving our services, and conducting internal analytics. We carefully balance these interests against your privacy rights and implement appropriate safeguards.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Legal Obligation</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Certain data processing activities are required by law, including AML/KYC compliance, tax reporting, responding to valid legal requests from authorities, and maintaining records as mandated by financial regulations. We process this data to meet our regulatory obligations.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 6 */}
          <Box id="info-sharing" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>6. Information Sharing</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We do not sell, rent, or trade your personal information to third parties for their independent marketing purposes. However, we may share your information in the following circumstances and with the following categories of recipients.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Service Providers</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We engage trusted third-party service providers to assist with platform operations, including cloud hosting providers, payment processors, identity verification services, analytics providers, and customer support tools. These providers are contractually bound to use your data only for the purposes we specify and are subject to strict data protection obligations.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Regulators and Law Enforcement</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We may disclose your information to regulatory bodies, law enforcement agencies, tax authorities, and other governmental organizations when required by law, regulation, legal process, or governmental request. This includes reporting suspicious transactions as mandated by AML regulations.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Affiliated Entities</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Within the MATBEA corporate group, we may share information with our subsidiaries and affiliates for operational purposes, including centralized compliance functions, shared technology infrastructure, and consolidated risk management. All affiliated entities are bound by equivalent data protection standards.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Business Transfers</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your personal data may be transferred as part of the transaction. We will notify you of any such change and any choices you may have regarding your data before it is transferred or becomes subject to a different privacy policy.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 7 */}
          <Box id="intl-transfers" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>7. International Data Transfers</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              MATBEA Enterprise operates globally, and your personal data may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws than those applicable in your jurisdiction.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Safeguards for Transfers</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              When we transfer personal data internationally, we implement appropriate safeguards to ensure your information receives an adequate level of protection. These safeguards include Standard Contractual Clauses (SCCs) approved by relevant authorities, binding corporate rules within our corporate group, and data processing agreements with all third-party recipients.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Adequacy Decisions</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We may transfer data to countries that have received an adequacy determination from relevant data protection authorities, confirming that they provide an equivalent level of data protection. Where such decisions are not in place, we rely on the supplementary measures described above to protect your data during transfer.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Data Localization</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Where local regulations require data to be stored within specific jurisdictions, we maintain regional data centers and processing facilities to comply with data localization requirements. We work with local legal counsel to ensure compliance with all applicable data residency laws.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 8 */}
          <Box id="retention" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>8. Data Retention</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, regulatory, accounting, and reporting requirements.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Retention Periods by Data Type</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Account and identity verification data is retained for the duration of your account relationship and for a minimum of five years after account closure, in accordance with AML regulations. Transaction records are maintained for at least seven years as required by financial regulations and tax laws. Marketing consent records are kept for as long as consent is active and for two years after withdrawal.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Technical and Usage Data</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Server logs and technical data are typically retained for 12 to 24 months for security monitoring and performance analysis purposes. Aggregated and anonymized analytics data may be retained indefinitely as it can no longer be linked to identifiable individuals.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Deletion and Anonymization</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              When data is no longer required, we securely delete or anonymize it using industry-standard methods. Our deletion processes include cryptographic erasure for digital records and verified destruction for any physical documentation.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 9 */}
          <Box id="security" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>9. Data Security</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We implement comprehensive technical and organizational measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security framework is built on industry best practices and is regularly audited by independent third parties.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Technical Measures</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We employ multi-factor authentication for account access, hardware security modules for key management, intrusion detection and prevention systems, and continuous security monitoring with real-time alerting. Our infrastructure undergoes regular penetration testing and vulnerability assessments.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Organizational Measures</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Access to personal data is restricted on a strict need-to-know basis through role-based access controls. All employees undergo background checks and receive regular data protection training. We maintain a comprehensive incident response plan and carry cyber insurance to mitigate the impact of any security incidents that may occur.
            </Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8, mt: 1.5 }}>
              While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or method of electronic storage is completely secure. We encourage you to take steps to protect your account, including using strong passwords, enabling multi-factor authentication, and keeping your login credentials confidential.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 10 */}
          <Box id="rights" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>10. Your Rights</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Depending on your jurisdiction and applicable data protection laws, you may have the following rights regarding your personal data. We are committed to honoring these rights and providing timely responses to your requests.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Right of Access</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              You have the right to request confirmation of whether we process your personal data and to obtain a copy of that data in a structured, commonly used, and machine-readable format. We will respond to access requests within 30 days.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Right to Rectification</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              You may request correction of inaccurate personal data or completion of incomplete data we hold about you. You can update most information directly through your account settings, or contact our support team for assistance with data that cannot be self-corrected.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Right to Erasure</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              You may request deletion of your personal data where there is no compelling reason for its continued processing. Please note that we may be unable to fulfill certain deletion requests where retention is required by law or for the establishment, exercise, or defense of legal claims.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Right to Data Portability</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              You have the right to receive your personal data in a structured, commonly used, and machine-readable format and to request that we transmit that data to another controller where technically feasible and where the processing is based on consent or contractual necessity.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Right to Object</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              You may object to processing of your personal data based on legitimate interests or for direct marketing purposes. Upon receiving an objection, we will cease processing unless we can demonstrate compelling legitimate grounds that override your interests, rights, and freedoms.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 11 */}
          <Box id="cookies" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>11. Cookies and Tracking Technologies</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Our website and platform use cookies and similar tracking technologies to distinguish you from other users, remember your preferences, and understand how you use our services. Cookies help us provide a better experience and allow certain features to function properly.
            </Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8, mt: 1.5 }}>
              We use essential cookies required for platform functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can manage your cookie preferences through your browser settings. For full details on the specific cookies we use and how to manage them, please refer to our dedicated <Typography component="span" sx={{ color: "#fff", fontWeight: 600 }}>Cookie Policy</Typography>.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 12 */}
          <Box id="children" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>12. Children's Privacy</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Our services are designed exclusively for institutional and professional clients and are not directed to individuals under the age of 18. We do not knowingly collect personal information from children or minors. If we become aware that we have collected data from a minor without appropriate parental consent, we will take immediate steps to delete that information.
            </Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8, mt: 1.5 }}>
              If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately at the details provided in the Contact Us section below. We will investigate and promptly address any such situation.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 13 */}
          <Box id="changes" sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>13. Changes to This Policy</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, and other factors. When we make material changes, we will notify you by posting the updated policy on our website with a revised effective date and, where appropriate, by sending you an email notification.
            </Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8, mt: 1.5 }}>
              We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our services after the effective date of any updated Privacy Policy constitutes your acceptance of the changes. If you do not agree with the revised policy, you have the right to terminate your account and discontinue use of our services.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

          {/* Section 14 */}
          <Box id="contact" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>14. Contact Us</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data protection practices, please do not hesitate to reach out to us through any of the following channels.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Data Protection Officer</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              Our designated Data Protection Officer (DPO) oversees compliance with data protection laws and can be contacted at dpo@matbea.com. The DPO is responsible for monitoring our data protection strategy, ensuring compliance with GDPR and other applicable regulations, and serving as your point of contact for all privacy-related matters.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Supervisory Authority</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              If you are located in the European Economic Area, you have the right to lodge a complaint with your local data protection supervisory authority if you believe that our processing of your personal data violates applicable law. We encourage you to contact us first so we can address your concerns directly before you escalate to a supervisory authority.
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, mt: 2, mb: 0.5 }}>Mailing Address</Typography>
            <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8 }}>
              MATBEA Enterprise, Attn: Privacy Office, 100 Wall Street, Suite 2400, New York, NY 10005, United States. For urgent matters, please email privacy@matbea.com and we will respond within 48 business hours.
            </Typography>
          </Box>
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
            { icon: <VisibilityIcon />, title: "Transaction Monitoring", desc: "Real-time monitoring of all transactions using advanced analytics, machine learning models, and rule-based systems to detect suspicious activity patterns across all asset classes and trading pairs." },
            { icon: <VerifiedUserIcon />, title: "Customer Due Diligence", desc: "Comprehensive KYC/KYB verification for all institutional clients, including beneficial ownership identification, source of funds verification, and risk-based classification for ongoing monitoring requirements." },
            { icon: <AssignmentIcon />, title: "Record Keeping", desc: "Secure maintenance of all transaction records, customer identification documents, and compliance communications for a minimum of 5 years, with full audit trail capabilities and regulatory access provisions." },
            { icon: <SupportAgentIcon />, title: "Compliance Team", desc: "Dedicated compliance officers trained in AML regulations across all operating jurisdictions, with ongoing training programs and direct reporting lines to senior management and the Board of Directors." },
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

        <Box sx={{ mt: 5, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Verification Process</Typography>
          <Grid container spacing={3}>
            {[
              { step: "01", title: "Application Submission", desc: "Complete the institutional onboarding application with entity details, authorized signatories, and initial risk assessment documentation.", timeline: "1–2 business days" },
              { step: "02", title: "Document Verification", desc: "Our compliance team reviews all submitted documents for authenticity, cross-references with public registries, and validates beneficial ownership structures.", timeline: "3–5 business days" },
              { step: "03", title: "Enhanced Due Diligence", desc: "For higher-risk clients, additional screening against sanctions lists, PEP databases, and adverse media sources is conducted with manual review by senior compliance officers.", timeline: "5–10 business days" },
              { step: "04", title: "Approval & Onboarding", desc: "Upon successful verification, clients receive their account credentials, API keys, and access to the full suite of MATBEA Enterprise trading and custody services.", timeline: "1–2 business days" },
            ].map((s, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e", fontWeight: 700, fontSize: 14 }}>{s.step}</Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff" }}>{s.title}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.7, mb: 2 }}>{s.desc}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <ScheduleIcon sx={{ color: "#22c55e", fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: "#22c55e" }}>Est. {s.timeline}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 5, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Compliance Frameworks</Typography>
          <Typography variant="body2" sx={{ color: "#999", mb: 3, lineHeight: 1.7 }}>MATBEA Enterprise adheres to international and local anti-money laundering standards across every jurisdiction where we operate.</Typography>
          <Grid container spacing={3}>
            {[
              { title: "Bank Secrecy Act (BSA)", desc: "Full compliance with U.S. BSA requirements including currency transaction reporting, suspicious activity reporting, and customer identification programs for all U.S.-related transactions." },
              { title: "EU Anti-Money Laundering Directives", desc: "Adherence to the EU's AMLD5 and AMLD6 frameworks, including enhanced due diligence for high-risk third countries, crypto-asset service provider obligations, and beneficial ownership transparency." },
              { title: "Financial Action Task Force (FATF)", desc: "Alignment with FATF Recommendations, including the updated guidance for virtual assets and virtual asset service providers, travel rule compliance, and risk-based approach to AML/CFT." },
              { title: "FinCEN Requirements", desc: "Registration as a Money Services Business (MSB) with FinCEN, implementation of an effective AML program, and timely filing of Currency Transaction Reports (CTRs) and Suspicious Activity Reports (SARs)." },
              { title: "Local Regulations", desc: "Country-specific compliance programs tailored to each operating jurisdiction, including local licensing requirements, reporting obligations, and cooperation with national financial intelligence units." },
            ].map((f, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>{f.title}</Typography>
                    <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.7 }}>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 5, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Required Documentation</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>For Entities</Typography>
              {["Certificate of Incorporation or Equivalent", "Articles of Organization / Memorandum & Articles", "Board Resolution Authorizing Account Opening", "Beneficial Ownership Declaration (≥25% ownership)", "Source of Funds / Source of Wealth Evidence", "Audited Financial Statements (last 2 fiscal years)", "Corporate Organizational Chart with UBO Identification", "Operating License or Regulatory Registration", "Proof of Business Address (utility bill or lease agreement)", "Tax Identification Number (TIN) Documentation"].map((doc, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <CheckCircleOutlinedIcon sx={{ color: "#22c55e", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>{doc}</Typography>
                </Box>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>For Individuals</Typography>
              {["Government-issued photo ID (passport or national ID)", "Proof of residential address (utility bill, bank statement)", "Selfie or liveness verification", "Source of funds declaration with supporting evidence", "Professional references or employer verification", "Tax residency certificate or equivalent", "Politically Exposed Person (PEP) self-declaration", "Sanctions screening acknowledgment"].map((doc, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <CheckCircleOutlinedIcon sx={{ color: "#22c55e", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>{doc}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 5, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Transaction Monitoring</Typography>
          <Typography variant="body2" sx={{ color: "#999", mb: 3, lineHeight: 1.7 }}>Our multi-layered transaction monitoring system operates continuously to identify and flag potentially suspicious activities before they can be exploited.</Typography>
          <Grid container spacing={3}>
            {[
              { icon: <SpeedIcon />, title: "Real-Time Screening", desc: "Every transaction is screened in real-time against predefined rules, velocity limits, and behavioral analytics to detect anomalies as they occur." },
              { icon: <GavelIcon />, title: "Sanctions Lists", desc: "Automated screening against OFAC SDN, EU Consolidated Sanctions, UN Security Council, and 40+ additional global sanctions and watchlists with daily updates." },
              { icon: <PersonSearchIcon />, title: "PEP Screening", desc: "Comprehensive screening of all parties against Politically Exposed Persons databases, with ongoing monitoring for changes in PEP status throughout the client relationship." },
              { icon: <NewspaperIcon />, title: "Adverse Media", desc: "Continuous monitoring of global news sources and databases for adverse media coverage related to clients, their beneficial owners, and associated entities." },
              { icon: <DescriptionIcon />, title: "SAR Filing", desc: "Automated suspicious activity report generation and filing with relevant Financial Intelligence Units (FIUs) when transaction patterns meet reporting thresholds." },
            ].map((f, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Card elevation={0} sx={{ height: "100%", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>{f.icon}</Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff" }}>{f.title}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.7 }}>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 5, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>Reporting Obligations</Typography>
          <Typography variant="body2" sx={{ color: "#999", mb: 3, lineHeight: 1.7 }}>MATBEA Enterprise fulfills all mandatory reporting requirements to regulatory authorities in each jurisdiction of operation.</Typography>
          <Grid container spacing={3}>
            {[
              { title: "Suspicious Activity Reports (SARs)", desc: "Filed with FinCEN (U.S.) and equivalent FIUs globally whenever a transaction or pattern of transactions is suspected to involve proceeds of crime, is designed to evade regulations, or has no apparent lawful purpose. SARs must be filed within 30 days of detection." },
              { title: "Currency Transaction Reports (CTRs)", desc: "Automatic filing for all cash transactions exceeding $10,000 (or equivalent in local currency). Aggregation rules are applied to detect structuring attempts where multiple transactions are designed to avoid the threshold." },
              { title: "Foreign Bank Account Reports (FBAR)", desc: "Reporting of foreign financial accounts to FinCEN for U.S. persons with aggregate foreign account balances exceeding $10,000 at any time during the calendar year, with annual filing requirements." },
              { title: "OFAC Blocking Reports", desc: "Immediate reporting and asset blocking when a transaction involves a sanctioned party. Blocked assets must be reported to OFAC within 10 business days along with detailed information about the blocked transaction." },
              { title: "Regulatory Audits & Examinations", desc: "Full cooperation with regulatory examinations, including on-site inspections, information requests, and periodic compliance program reviews by internal and external auditors." },
            ].map((r, i) => (
              <Grid size={{ xs: 12 }} key={i}>
                <Box sx={{ borderLeft: "3px solid #22c55e", pl: 3, py: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>{r.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.7 }}>{r.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <CTASection title="Start Verification" subtitle="Begin the institutional onboarding process to access MATBEA Enterprise services." primaryAction={{ label: "Begin KYC Process", path: "/products/enterprise" }} secondaryAction={{ label: "Contact Compliance", path: "/partners" }} />
    </Box>
  );
}

function CookiePolicyPage() {
  const sections = [
    {
      title: "1. What Are Cookies",
      content: "Cookies are small text files that are placed on your computer, smartphone, tablet, or other device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners. Cookies allow a website to recognize your device and remember if you have been to the website before. They can be used to store your preferences, keep you logged in, and help us understand how you interact with our platform. Cookies do not typically contain any personally identifiable information, but the data they collect can be linked to other information we hold about you. Cookies set by the website owner (in this case, MATBEA Enterprise) are called first-party cookies, while cookies set by parties other than the website owner are called third-party cookies. Third-party cookies enable features such as analytics, advertising, and interactive content provided by external services.",
    },
    {
      title: "2. How We Use Cookies",
      content: "We use cookies for several purposes: to ensure our website functions correctly, to remember your preferences and settings, to analyze how our website is used so we can improve it, and to deliver relevant marketing communications. Specifically, cookies help us maintain your session when you log into the MATBEA platform, authenticate your identity across pages, store your language and theme preferences, measure site traffic and user behavior, and detect and prevent security threats. Without cookies, features such as staying logged in during a browsing session, saving your dashboard layout, or remembering your two-factor authentication status would not be possible.",
    },
    {
      title: "3. Types of Cookies We Use",
      content: "We categorize cookies into four types: Essential cookies are strictly necessary for the website to function — they enable core features like security, authentication, and session management. Analytics cookies collect information about how visitors use our site, such as which pages are visited most often and whether users encounter errors. Functional cookies remember your preferences and choices you make (like language, region, or display settings) to provide a more personalized experience. Marketing cookies are used to track visitors across websites and display advertisements that are relevant and engaging for the individual user. Each category serves a distinct role, and you can learn more about each one in the sections below.",
    },
    {
      title: "4. Essential Cookies",
      content: "Essential cookies are the backbone of our platform's security and functionality. Without them, core services such as user authentication, fraud prevention, and session persistence would not work. These cookies do not require your consent because they are strictly necessary for the website to operate. They include session identifiers, CSRF tokens, and cookies that manage load balancing. If you block these cookies via your browser, you will not be able to log in, access your account dashboard, or perform any transactions on the platform. Essential cookies never store sensitive financial data — they only reference secure, server-side session tokens.",
    },
    {
      title: "5. Analytics Cookies",
      content: "Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics, which sets cookies such as _ga and _gid, to measure metrics like page views, session duration, bounce rate, and traffic sources. This aggregated data helps us identify which features are most valued, where users encounter difficulties, and how we can optimize the platform's performance and user experience. The information generated by these cookies is transmitted to and stored by Google on servers in the United States. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on. Please note that disabling analytics cookies does not affect the website's functionality.",
    },
    {
      title: "6. Functional Cookies",
      content: "Functional cookies enable enhanced functionality and personalization. They remember choices you make — such as your preferred language, time zone, display mode (light or dark theme), and other customizable settings — so that you do not have to re-enter them each time you visit. These cookies may also be used to provide services you have requested, such as watching a video or interacting with a chat widget. If you do not allow functional cookies, some or all of these services may not function properly, but the core trading and account features will remain available. Functional cookies are set by MATBEA and do not track your activity on other websites.",
    },
    {
      title: "7. Marketing Cookies",
      content: "Marketing cookies are used to track visitors across websites with the aim of displaying advertisements that are relevant and engaging for the individual user. These cookies are typically placed by third-party advertising networks with our permission. They remember that you have visited our website and share this information with advertisers and other organizations. Marketing cookies help us measure the effectiveness of our advertising campaigns, limit the number of times you see an ad, and understand the demographics of users who engage with our content. We use cookies from platforms such as Facebook Pixel (via the _fbp cookie) to deliver targeted advertisements and measure conversions. You can opt out of marketing cookies through our cookie consent banner or by adjusting your browser settings, though this will not remove ads entirely — it will only prevent personalized targeting.",
    },
    {
      title: "8. Third-Party Cookies",
      content: "In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and provide other services. These cookies are set by domains other than MATBEA Enterprise and are governed by the respective third party's privacy policy. Notable third-party cookies include Google Analytics cookies (_ga, _gid) for site analytics, Facebook Pixel (_fbp) for advertising measurement, and session management cookies from our infrastructure providers. We do not have direct control over the data collected by these third parties. We encourage you to review the privacy policies of these providers to understand how they handle your data. If you disable third-party cookies, certain integrated features — such as analytics reporting and ad tracking — may be affected.",
    },
    {
      title: "9. Managing Your Cookie Preferences",
      content: "You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through your browser settings, which allow you to block or delete cookies entirely, or to prompt you each time a cookie is set. Below are instructions for the most common browsers:\n\n• Chrome: Open Settings → Privacy and Security → Cookies and site data. You can block all cookies, allow only first-party cookies, or manage exceptions for specific sites.\n• Firefox: Open Settings → Privacy & Security → Cookies and Site Data. Choose between Standard, Strict, or Custom settings to control cookie behavior.\n• Safari: Open Preferences → Privacy → Manage Website Data. You can block all cookies or remove stored cookies for specific websites.\n• Edge: Open Settings → Cookies and site permissions → Manage and delete cookies. You can block cookies, block third-party cookies, or add site-specific exceptions.\n\nPlease note that blocking essential cookies will prevent you from logging in and using key platform features. If you clear your cookies, you will need to log in again and reconfigure your preferences.",
    },
    {
      title: "10. Changes to This Policy",
      content: "We reserve the right to update this Cookie Policy at any time to reflect changes in technology, legislation, or our business practices. When we make material changes, we will update the \"Last updated\" date at the top of this page and, where appropriate, notify you via email or a prominent notice on our website. We encourage you to review this policy periodically to stay informed about how we use cookies and protect your data. Your continued use of the MATBEA platform after any changes to this policy constitutes your acceptance of the updated terms. If you do not agree with the revised policy, you should adjust your cookie settings accordingly or discontinue use of the platform.",
    },
  ];

  const cookies = [
    { name: "__session", category: "Essential", duration: "Session", purpose: "Maintains your authenticated session across page navigations. Expires when you close your browser or log out." },
    { name: "__csrf", category: "Essential", duration: "Session", purpose: "Protects against cross-site request forgery attacks by validating that form submissions originate from authorized users." },
    { name: "_ga", category: "Analytics", duration: "2 years", purpose: "Used by Google Analytics to distinguish unique users by assigning a randomly generated number as a client identifier." },
    { name: "_gid", category: "Analytics", duration: "24 hours", purpose: "Used by Google Analytics to distinguish users and track page views within a 24-hour window." },
    { name: "locale", category: "Functional", duration: "1 year", purpose: "Stores your preferred language setting so the platform displays content in the correct language on subsequent visits." },
    { name: "theme", category: "Functional", duration: "1 year", purpose: "Remembers your UI theme preference (light or dark mode) so you do not have to re-select it each time." },
    { name: "_fbp", category: "Marketing", duration: "3 months", purpose: "Set by Facebook Pixel to deliver, measure, and improve the quality of advertisements shown on Meta platforms." },
  ];

  return (
    <Box>
      <PageHeader title="Cookie Policy" subtitle="How MATBEA Enterprise uses cookies and similar technologies on our website." badge="Legal" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>Last updated: January 15, 2026</Typography>
        </Box>

        <Box sx={{ bgcolor: "rgba(26, 115, 232, 0.06)", border: "1px solid rgba(26, 115, 232, 0.2)", borderRadius: 2, p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h6" sx={{ color: "#1a73e8", mb: 2 }}>Quick Summary</Typography>
          <Typography variant="body2" sx={{ color: "#aaa", lineHeight: 1.8 }}>
            Cookies are small text files that help our website remember you and work properly. We use essential cookies to keep you logged in and secure your session, analytics cookies to understand how people use our site, functional cookies to remember your preferences, and marketing cookies to show you relevant ads. You can control most cookies through your browser settings, and we never use cookies to collect sensitive financial information. Read the full policy below for detailed information on each cookie type and how to manage your preferences.
          </Typography>
        </Box>

        <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 }, mb: 4 }}>
          {sections.map((section, i) => (
            <Box key={i} sx={{ mb: i < sections.length - 1 ? 3 : 0 }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>{section.title}</Typography>
              <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.8, whiteSpace: "pre-line" }}>{section.content}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>Cookies We Use</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#666", borderBottom: "1px solid rgba(255,255,255,0.08)", fontWeight: 600 }}>Cookie Name</TableCell>
                  <TableCell sx={{ color: "#666", borderBottom: "1px solid rgba(255,255,255,0.08)", fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ color: "#666", borderBottom: "1px solid rgba(255,255,255,0.08)", fontWeight: 600 }}>Duration</TableCell>
                  <TableCell sx={{ color: "#666", borderBottom: "1px solid rgba(255,255,255,0.08)", fontWeight: 600 }}>Purpose</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cookies.map((cookie) => (
                  <TableRow key={cookie.name}>
                    <TableCell sx={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "monospace", fontSize: "0.875rem" }}>{cookie.name}</TableCell>
                    <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <Chip
                        label={cookie.category}
                        size="small"
                        sx={{
                          bgcolor: cookie.category === "Essential" ? "rgba(46, 125, 50, 0.15)" : cookie.category === "Analytics" ? "rgba(26, 115, 232, 0.15)" : cookie.category === "Functional" ? "rgba(255, 152, 0, 0.15)" : "rgba(156, 39, 176, 0.15)",
                          color: cookie.category === "Essential" ? "#4caf50" : cookie.category === "Analytics" ? "#1a73e8" : cookie.category === "Functional" ? "#ff9800" : "#ab47bc",
                          fontSize: "0.75rem",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "#999", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.875rem" }}>{cookie.duration}</TableCell>
                    <TableCell sx={{ color: "#999", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.875rem", maxWidth: 280 }}>{cookie.purpose}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ bgcolor: "rgba(255, 152, 0, 0.06)", border: "1px solid rgba(255, 152, 0, 0.2)", borderRadius: 2, p: { xs: 3, md: 4 } }}>
          <Typography variant="h6" sx={{ color: "#ff9800", mb: 2 }}>Cookie Consent</Typography>
          <Typography variant="body2" sx={{ color: "#aaa", lineHeight: 1.8 }}>
            When you first visit the MATBEA Enterprise website, you will see a cookie consent banner that allows you to accept or customize your cookie preferences. You can change your preferences at any time by clicking the "Cookie Settings" link in the footer of any page on our site. Your consent choices are stored locally on your device and will be remembered for future visits. If you clear your browser cookies or use a different device, you will be prompted to make your selections again. For questions about our cookie practices, contact our Data Protection Officer at dpo@matbea.com.
          </Typography>
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

function ProtectedRoute() {
  const isAuth = document.cookie.includes("matbea_auth=1");
  if (!isAuth) return <Navigate to="/login" replace />;
  return <Outlet />;
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
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="trading" element={<TradingPage />} />
          <Route path="wallets" element={<WalletsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="markets" element={<MarketsPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
