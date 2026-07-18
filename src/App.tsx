import { useState, useMemo } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LayersIcon from "@mui/icons-material/Layers";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const VALID_EMAIL = "hamed.h1366@gmail.com";
const VALID_PASSWORD = "Hh13661366!@";

const MLogo = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="white" />
    <path
      d="M10 30V12L16 22L20 14L24 22L30 12V30"
      stroke="#000000"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const navLinks = ["Markets", "Enterprise", "API", "Custody", "Pricing"];

const features = [
  {
    title: "Institutional Custody",
    desc: "Multi-signature cold storage with $250M insurance coverage. SOC 2 Type II certified.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7V12C3 17.25 6.75 22.0 12 23C17.25 22.0 21 17.25 21 12V7L12 2Z" />
        <path d="M8 12L11 15L16 9" />
      </svg>
    ),
  },
  {
    title: "Ultra-Low Latency",
    desc: "Co-located matching engine with sub-millisecond execution for enterprise operations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Volume-Based Pricing",
    desc: "Tiered fee structure starting at 0.02% for institutional clients.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    desc: "Named account managers and priority support for enterprise clients.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
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

function MiniChart({ up }: { up: boolean }) {
  const points = up
    ? "0,30 8,25 16,28 24,18 32,22 40,12 48,16 56,8 64,12 72,5 80,8"
    : "0,8 8,12 16,10 24,20 32,16 40,25 48,22 56,28 64,24 72,28 80,30";
  const color = up ? "#22c55e" : "#ef4444";
  return (
    <svg width="100%" height="32" viewBox="0 0 80 32" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`miniGrad-${up}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points={`0,32 ${points} 80,32`} fill={`url(#miniGrad-${up})`} />
    </svg>
  );
}

function TickerTape() {
  return (
    <Box sx={{ bgcolor: "#000", borderBottom: "1px solid rgba(255,255,255,0.08)", py: 0.75 }}>
      <Box className="marquee-container">
        <Box className="ticker-scroll">
          {[...tickerData, ...tickerData].map((t, i) => {
            const isUp = t.change.startsWith("+");
            return (
              <Box key={i} sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
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

function Navbar({ isAuthenticated, onLogout }: { isAuthenticated: boolean; onLogout: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", height: 64 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }} onClick={() => navigate("/")}>
              <MLogo />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  MATBEA
                </Typography>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Enterprise
                </Typography>
              </Box>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {navLinks.map((link) => (
                  <Typography key={link} variant="body2" sx={{ color: "#999", fontWeight: 500, cursor: "pointer", px: 1.5, py: 0.5, borderRadius: 1, transition: "all 0.2s", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}>
                    {link}
                  </Typography>
                ))}
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              {!isMobile && (
                <>
                  {isAuthenticated ? (
                    <>
                      <Button variant="text" startIcon={<DashboardIcon />} sx={{ color: "#999", fontWeight: 500 }} onClick={() => navigate("/dashboard")}>
                        Dashboard
                      </Button>
                      <Button variant="outlined" startIcon={<LogoutIcon />} sx={{ fontWeight: 500 }} onClick={onLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="text" sx={{ color: "#999", fontWeight: 500 }} onClick={() => navigate("/login")}>
                        Log In
                      </Button>
                      <Button variant="contained">Contact Sales</Button>
                    </>
                  )}
                </>
              )}
              {isMobile && (
                <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#fff" }}><MenuIcon /></IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { bgcolor: "#111", width: 280, borderLeft: "1px solid rgba(255,255,255,0.08)" } }}>
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>Menu</Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#666" }}><CloseIcon /></IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link} disablePadding sx={{ px: 1 }}>
              <ListItemButton onClick={() => setMobileOpen(false)} sx={{ borderRadius: 2 }}>
                <ListItemText primary={link} primaryTypographyProps={{ fontWeight: 500, color: "#fff" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 2 }} />
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {isAuthenticated ? (
            <>
              <Button variant="outlined" fullWidth startIcon={<DashboardIcon />} onClick={() => { setMobileOpen(false); navigate("/dashboard"); }}>
                Dashboard
              </Button>
              <Button variant="contained" fullWidth startIcon={<LogoutIcon />} onClick={() => { setMobileOpen(false); onLogout(); }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" fullWidth onClick={() => { setMobileOpen(false); navigate("/login"); }}>
                Log In
              </Button>
              <Button variant="contained" fullWidth>Contact Sales</Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        onLogin();
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#060918", display: "flex" }}>
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 6,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box className="login-orb" sx={{ width: 300, height: 300, bgcolor: "rgba(99,102,241,0.15)", top: "10%", left: "10%", animationDelay: "0s" }} />
          <Box className="login-orb" sx={{ width: 200, height: 200, bgcolor: "rgba(34,211,238,0.1)", bottom: "15%", right: "10%", animationDelay: "2s" }} />

          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 420 }}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
              <MLogo size={64} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#fff", mb: 1.5, fontSize: "2.2rem", letterSpacing: "-0.03em" }}>
              MATBEA Enterprise
            </Typography>
            <Typography variant="body1" sx={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "1.05rem" }}>
              Institutional-grade digital asset trading, custody, and settlement infrastructure.
            </Typography>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          width: isMobile ? "100%" : 480,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 3, sm: 6 },
          bgcolor: "rgba(10, 14, 30, 0.6)",
          borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.06)",
          position: "relative",
        }}
      >
        {isMobile && (
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <MLogo size={48} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#fff", mt: 1.5, letterSpacing: "-0.02em" }}>
              MATBEA Enterprise
            </Typography>
          </Box>
        )}

        <Box className="animate-fade-in" sx={{ width: "100%", maxWidth: 360 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4 }}>
            Sign in to your account
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                },
                "& .MuiInputLabel-root": { color: "#64748b" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#818cf8" },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#64748b" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                },
                "& .MuiInputLabel-root": { color: "#64748b" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#818cf8" },
              }}
            />

            <Box sx={{ textAlign: "right", mb: 3 }}>
              <Typography variant="body2" sx={{ color: "#818cf8", cursor: "pointer", fontSize: "0.82rem", "&:hover": { color: "#a5b4fc" } }}>
                Forgot password?
              </Typography>
            </Box>

            {error && (
              <Typography variant="body2" sx={{ color: "#ef4444", mb: 2, bgcolor: "rgba(239,68,68,0.08)", py: 1, px: 1.5, borderRadius: 1, fontSize: "0.82rem" }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "0.95rem",
                fontWeight: 600,
                bgcolor: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 4px 24px rgba(99,102,241,0.3)",
                "&:hover": { bgcolor: "linear-gradient(135deg, #818cf8, #6366f1)", boxShadow: "0 6px 32px rgba(99,102,241,0.4)" },
                "&:disabled": { bgcolor: "rgba(99,102,241,0.3)", color: "rgba(255,255,255,0.5)" },
              }}
            >
              {loading ? "Signing in..." : "Log In"}
            </Button>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", my: 3 }}>
            <Typography variant="caption" sx={{ color: "#475569" }}>or</Typography>
          </Divider>

          <Typography variant="body2" sx={{ color: "#64748b", textAlign: "center", fontSize: "0.82rem" }}>
            Don&apos;t have an account?{" "}
            <Typography component="span" variant="body2" sx={{ color: "#818cf8", cursor: "pointer", fontWeight: 500, "&:hover": { color: "#a5b4fc" } }}>
              Contact Sales
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function DashboardPage({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();

  const dashStats = [
    { label: "Portfolio Value", value: "$1,248,532.18", change: "+5.23%", up: true, icon: <AccountBalanceWalletIcon /> },
    { label: "Today's P&L", value: "+$23,841.50", change: "+1.92%", up: true, icon: <ShowChartIcon /> },
    { label: "Active Orders", value: "12", change: "3 pending", up: true, icon: <ReceiptLongIcon /> },
    { label: "Total Assets", value: "24", change: "6 chains", up: true, icon: <LayersIcon /> },
  ];

  const recentActivity = [
    { action: "Deposit", asset: "BTC", amount: "0.4521", status: "Completed", time: "2 min ago" },
    { action: "Trade", asset: "ETH/USDT", amount: "15.2", status: "Completed", time: "15 min ago" },
    { action: "Withdrawal", asset: "USDT", amount: "50,000", status: "Processing", time: "1 hr ago" },
    { action: "Trade", asset: "SOL/USDT", amount: "120", status: "Completed", time: "3 hr ago" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#060918" }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", height: 64 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }} onClick={() => navigate("/")}>
              <MLogo />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  MATBEA
                </Typography>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Enterprise
                </Typography>
              </Box>
              <Chip label="Dashboard" size="small" sx={{ ml: 1, bgcolor: "rgba(99,102,241,0.15)", color: "#818cf8", fontWeight: 600, fontSize: "0.7rem", height: 22 }} />
            </Box>
            <Button variant="outlined" startIcon={<LogoutIcon />} onClick={() => { onLogout(); navigate("/login"); }} sx={{ fontWeight: 500 }}>
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            Welcome back, Hamed. Here&apos;s your portfolio overview.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {dashStats.map((s) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.label}>
              <Card elevation={0} sx={{ bgcolor: "rgba(15, 20, 40, 0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.82rem" }}>{s.label}</Typography>
                    <Box sx={{ color: "#6366f1" }}>{s.icon}</Box>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff", mb: 0.5, fontSize: "1.3rem" }}>
                    {s.value}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {s.up ? <ArrowUpwardIcon sx={{ fontSize: 14, color: "#22c55e" }} /> : <ArrowDownwardIcon sx={{ fontSize: 14, color: "#ef4444" }} />}
                    <Typography variant="body2" sx={{ color: s.up ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.78rem" }}>
                      {s.change}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={0} sx={{ bgcolor: "rgba(15, 20, 40, 0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 2, fontSize: "1rem" }}>
                  Recent Activity
                </Typography>
                <Box>
                  {recentActivity.map((a, i) => (
                    <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5, borderBottom: i < recentActivity.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: a.action === "Deposit" ? "rgba(34,197,94,0.1)" : a.action === "Withdrawal" ? "rgba(239,68,68,0.1)" : "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {a.action === "Deposit" ? <ArrowDownwardIcon sx={{ fontSize: 16, color: "#22c55e" }} /> : a.action === "Withdrawal" ? <ArrowUpwardIcon sx={{ fontSize: 16, color: "#ef4444" }} /> : <ShowChartIcon sx={{ fontSize: 16, color: "#6366f1" }} />}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{a.action} {a.asset}</Typography>
                          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.72rem" }}>{a.time}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>{a.amount}</Typography>
                        <Chip label={a.status} size="small" sx={{ mt: 0.25, bgcolor: a.status === "Completed" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)", color: a.status === "Completed" ? "#22c55e" : "#f59e0b", fontWeight: 600, fontSize: "0.65rem", height: 20 }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ bgcolor: "rgba(15, 20, 40, 0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 2, fontSize: "1rem" }}>
                  Quick Actions
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {[
                    { label: "Deposit Funds", color: "#6366f1" },
                    { label: "Withdraw", color: "#22d3ee" },
                    { label: "Trade", color: "#22c55e" },
                    { label: "Transfer", color: "#f59e0b" },
                  ].map((action) => (
                    <Button key={action.label} variant="outlined" fullWidth sx={{ justifyContent: "flex-start", color: action.color, borderColor: `${action.color}33`, fontWeight: 500, py: 1.2, "&:hover": { borderColor: action.color, bgcolor: `${action.color}08` } }}>
                      {action.label}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function HeroSection() {
  return (
    <Box sx={{ position: "relative", overflow: "hidden", pt: { xs: 6, md: 8 }, pb: { xs: 6, md: 8 } }}>
      <Box className="dot-grid" sx={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box className="animate-slide-left">
              <Chip label="Trusted by 2,400+ enterprises" size="small" sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.06)", color: "#ccc", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem" }} />
              <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" }, mb: 2, color: "#fff" }}>
                Crypto Infrastructure
                <br />
                for Enterprise
              </Typography>
              <Typography variant="body1" sx={{ color: "#999", lineHeight: 1.8, mb: 4, maxWidth: 480, fontSize: "1.05rem" }}>
                Institutional-grade trading, custody, and settlement infrastructure. Power your business with the most reliable crypto platform.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ py: 1.5, px: 4, fontSize: "1rem" }}>
                  Request a Demo
                </Button>
                <Button variant="outlined" size="large" sx={{ py: 1.5, px: 4, fontSize: "1rem" }}>
                  View Documentation
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 5 }}>
                {stats.slice(0, 2).map((s, i) => (
                  <Box key={i}>
                    <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>{s.value}</Typography>
                    <Typography variant="body2" sx={{ color: "#666", mt: 0.5, fontSize: "0.8rem" }}>{s.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative", display: { xs: "none", md: "block" } }} className="animate-slide-right">
              <Box
                component="img"
                src="/coins.jpg"
                alt="Cryptocurrency coins"
                sx={{
                  width: "100%",
                  maxWidth: 480,
                  mx: "auto",
                  display: "block",
                  borderRadius: 3,
                  filter: "brightness(0.9)",
                }}
              />
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
          <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>
            Convert Crypto
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Real-time exchange rates for any pair
          </Typography>
        </Box>

        <Card elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
                "& .MuiInputLabel-root": { color: "#666" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                "& input[type=number]": { MozAppearance: "textfield" },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
              }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: "#666" }}>From</InputLabel>
              <Select value={fromCurrency} label="From" onChange={(e) => setFromCurrency(e.target.value)} sx={{ color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" } }}>
                {currencyOptions.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <IconButton onClick={handleSwap} sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
              <SwapVertIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField
              label="Result"
              value={result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  fontWeight: 600,
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                },
                "& .MuiInputLabel-root": { color: "#666" },
              }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: "#666" }}>To</InputLabel>
              <Select value={toCurrency} label="To" onChange={(e) => setToCurrency(e.target.value)} sx={{ color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" } }}>
                {currencyOptions.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: "#666" }}>
              1 {fromCurrency} = {rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {toCurrency}
            </Typography>
            <Typography variant="caption" sx={{ color: "#444" }}>
              Demo rates
            </Typography>
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
          <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>
            Markets
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Real-time prices for top digital assets
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["#", "Asset", "Price", "24h", "Volume", "Mkt Cap"].map((h) => (
                  <TableCell key={h} sx={{ color: "#666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.08)", py: 1.5 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((coin, i) => (
                <TableRow key={coin.symbol} className="table-row-hover" sx={{ cursor: "pointer", transition: "background 0.2s", "& td": { borderBottom: "1px solid rgba(255,255,255,0.04)", py: 1.5 } }}>
                  <TableCell sx={{ color: "#666", fontWeight: 500, fontSize: "0.8rem" }}>{i + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: "#222", fontWeight: 700, fontSize: "0.75rem", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>
                        {coin.symbol.charAt(0)}
                      </Avatar>
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
          <Button variant="outlined" endIcon={<ArrowForwardIcon />} sx={{ px: 4 }}>
            View All Markets
          </Button>
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
  return (
    <Box sx={{ py: { xs: 5, md: 7 }, position: "relative" }}>
      <Box className="dot-grid" sx={{ position: "absolute", inset: 0, opacity: 0.2 }} />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>
            Why MATBEA Enterprise
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", maxWidth: 400 }}>
            Institutional infrastructure for hedge funds, corporates, and fintech platforms.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <Card elevation={0} sx={{ height: "100%", "&:hover": { borderColor: "rgba(255,255,255,0.15)" } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "#fff" }}>
                    {f.icon}
                  </Box>
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
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#fff", mb: 0.5, fontSize: { xs: "1.6rem", md: "2rem" } }}>
                  {s.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", fontWeight: 500, fontSize: "0.82rem" }}>{s.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function CTASection() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, position: "relative", overflow: "hidden" }}>
      <Box className="dot-grid" sx={{ position: "absolute", inset: 0, opacity: 0.2 }} />
      <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <Typography variant="h3" sx={{ color: "#fff", mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
          Ready to Scale Your
          <br />
          Crypto Operations?
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 4, maxWidth: 440, mx: "auto" }}>
          Join 2,400+ enterprises using MATBEA for institutional trading, custody, and settlement.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ py: 1.5, px: 5, fontSize: "1rem" }}>
            Schedule a Demo
          </Button>
          <Button variant="outlined" size="large" sx={{ py: 1.5, px: 5, fontSize: "1rem" }}>
            View API Docs
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function Footer() {
  const footerLinks = {
    Products: ["Spot Trading", "OTC Desk", "Custody", "Settlement", "API Access"],
    Enterprise: ["Solutions", "Case Studies", "Compliance", "Fees", "Partners"],
    Resources: ["Documentation", "API Reference", "Status Page", "Security"],
    Legal: ["Terms", "Privacy", "AML/KYC", "Cookies"],
  };

  return (
    <Box sx={{ bgcolor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 6 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <MLogo size={32} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>MATBEA</Typography>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Enterprise</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: "#666", mb: 3, maxWidth: 280, lineHeight: 1.8, fontSize: "0.82rem" }}>
              Institutional-grade crypto infrastructure. Secure, compliant, and built for scale.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[TwitterIcon, TelegramIcon, GitHubIcon].map((Icon, i) => (
                <IconButton key={i} sx={{ color: "#666", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", width: 34, height: 34, "&:hover": { color: "#fff", borderColor: "rgba(255,255,255,0.2)" } }}>
                  <Icon sx={{ fontSize: 15 }} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid size={{ xs: 6, sm: 3, md: 2 }} key={title}>
              <Typography variant="subtitle2" sx={{ color: "#999", fontWeight: 700, mb: 1.5, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {links.map((link) => (
                  <Box component="li" key={link} sx={{ mb: 1, color: "#666", fontSize: "0.8rem", cursor: "pointer", transition: "color 0.2s", "&:hover": { color: "#fff" } }}>
                    {link}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "#444", fontSize: "0.78rem" }}>
            &copy; 2026 MATBEA Enterprise. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {["English", "Espa&#241;ol", "中文", "日本語"].map((lang) => (
              <Typography key={lang} variant="caption" sx={{ color: "#444", cursor: "pointer", fontSize: "0.72rem", transition: "color 0.2s", "&:hover": { color: "#999" } }}>
                {lang}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function LandingPage({ isAuthenticated, onLogout }: { isAuthenticated: boolean; onLogout: () => void }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#000" }}>
      <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <TickerTape />
      <HeroSection />
      <RateCalculator />
      <MarketSection />
      <TradingPairsSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </Box>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/dashboard" element={isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<LandingPage isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;
