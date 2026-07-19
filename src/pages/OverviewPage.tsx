import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import { portfolioHistory, recentActivity } from "../data";
import { coins as staticCoins } from "../data";
import { useCoins } from "../components/CoinGeckoProvider";
import { formatPrice } from "../api/coingecko";

type Period = "1W" | "1M" | "3M" | "1Y" | "ALL";

function PortfolioChart({ period }: { period: Period }) {
  const data = portfolioHistory[period];
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const width = 600;
  const height = 180;
  const padding = 20;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (width - padding * 2),
    y: padding + (1 - (d.value - min) / range) * (height - padding * 2),
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <Box sx={{ width: "100%", height: height, "& svg": { width: "100%", height: "100%" } }}>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding + (i / 4) * (height - padding * 2);
          return <line key={i} x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />;
        })}
        <path d={areaPath} fill="url(#chartGrad)" />
        <path d={linePath} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#6366f1" stroke="#000000" strokeWidth="2" />
        ))}
      </svg>
    </Box>
  );
}

function StatCard({ title, value, change, icon, color }: { title: string; value: string; change?: string; icon: React.ReactNode; color: string }) {
  const isPositive = change && !change.startsWith("-");
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: "16px",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.05)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
            {icon}
          </Box>
          {change && (
            <Chip
              icon={isPositive ? <TrendingUpIcon sx={{ fontSize: "12px !important" }} /> : <TrendingDownIcon sx={{ fontSize: "12px !important" }} />}
              label={change}
              size="small"
              sx={{
                bgcolor: isPositive ? "rgba(34, 197, 94, 0.08)" : "rgba(239, 68, 68, 0.08)",
                color: isPositive ? "#22c55e" : "#ef4444",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
                "& .MuiChip-icon": { color: isPositive ? "#22c55e !important" : "#ef4444 !important" },
              }}
            />
          )}
        </Box>
        <Typography variant="body2" sx={{ color: "#999999", mb: 0.5, fontSize: "0.8rem" }}>{title}</Typography>
        <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 700, letterSpacing: "-0.01em" }}>{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default function OverviewPage() {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState<Period>("1M");
  const { coins: cgCoins } = useCoins();

  const mergedCoins = useMemo(() => {
    return staticCoins.map((sc) => {
      const cg = cgCoins.find((c) => c.symbol.toUpperCase() === sc.symbol);
      return {
        ...sc,
        price: cg?.current_price ?? sc.price,
        change: cg?.price_change_percentage_24h ?? sc.change,
        image: cg?.image,
      };
    });
  }, [cgCoins]);

  const totalValue = useMemo(() => mergedCoins.reduce((sum, c) => sum + c.holdings * c.price, 0), [mergedCoins]);
  const totalCost = useMemo(() => mergedCoins.reduce((sum, c) => sum + c.holdings * c.avgBuy, 0), [mergedCoins]);
  const totalPnL = totalValue - totalCost;
  const pnlPercent = ((totalPnL / totalCost) * 100).toFixed(2);
  const availableBalance = mergedCoins[0].holdings * mergedCoins[0].price;

  return (
    <Box>
      {/* Stats Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Portfolio Value" value={`$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} change={`${Number(pnlPercent) > 0 ? "+" : ""}${pnlPercent}%`} icon={<AccountBalanceWalletIcon sx={{ fontSize: 20 }} />} color="#6366f1" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="24h P&L" value={`$${(totalValue * 0.0245).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} change="+2.45%" icon={<TrendingUpIcon sx={{ fontSize: 20 }} />} color="#10b981" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Available Balance" value={`$${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={<SwapHorizIcon sx={{ fontSize: 20 }} />} color="#22d3ee" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Total P&L" value={`${totalPnL >= 0 ? "+" : ""}$${totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} change={`${totalPnL >= 0 ? "+" : ""}${pnlPercent}%`} icon={<TrendingUpIcon sx={{ fontSize: 20 }} />} color={totalPnL >= 0 ? "#10b981" : "#ef4444"} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Portfolio Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: "#ffffff", fontWeight: 700 }}>Portfolio Performance</Typography>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {(["1W", "1M", "3M", "1Y", "ALL"] as Period[]).map((p) => (
                    <Chip
                      key={p}
                      label={p}
                      size="small"
                      onClick={() => setActivePeriod(p)}
                      sx={{
                        bgcolor: activePeriod === p ? "rgba(255, 255, 255, 0.08)" : "transparent",
                        color: activePeriod === p ? "#ffffff" : "#666666",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        height: 24,
                        border: activePeriod === p ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(255,255,255,0.06)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.06)" },
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <PortfolioChart period={activePeriod} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                {portfolioHistory[activePeriod].map((d, i) => (
                  <Typography key={`${d.date}-${i}`} variant="caption" sx={{ color: "#666666", fontSize: "0.65rem" }}>{d.date}</Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Asset Allocation */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" sx={{ color: "#ffffff", fontWeight: 700, mb: 2 }}>Asset Allocation</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {mergedCoins.map((coin) => {
                  const value = coin.holdings * coin.price;
                  const pct = (value / totalValue) * 100;
                  return (
                    <Box key={coin.symbol}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {coin.image ? (
                            <Box component="img" src={coin.image} alt={coin.name} sx={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} />
                          ) : (
                            <Avatar sx={{ width: 22, height: 22, background: coin.gradient, fontSize: "0.55rem", fontWeight: 700 }}>{coin.symbol[0]}</Avatar>
                          )}
                          <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 500, fontSize: "0.8rem" }}>{coin.symbol}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: "#cccccc", fontSize: "0.8rem" }}>{pct.toFixed(1)}%</Typography>
                      </Box>
                      <Box sx={{ height: 4, borderRadius: 2, bgcolor: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                        <Box sx={{ height: "100%", width: `${pct}%`, bgcolor: coin.color, borderRadius: 2, transition: "width 0.5s ease" }} />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 0 }}>
        {/* Holdings */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: "#ffffff", fontWeight: 700 }}>Your Holdings</Typography>
                <Typography
                  variant="body2"
                  onClick={() => navigate("/dashboard/wallets")}
                  sx={{ color: "#ffffff", fontWeight: 500, cursor: "pointer", "&:hover": { textDecoration: "underline" }, fontSize: "0.8rem" }}
                >
                  View All
                </Typography>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Asset", "Price", "Holdings", "Value", "P&L", "24h"].map((h) => (
                      <TableCell key={h} sx={{ color: "#666666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 1.5 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mergedCoins.map((coin) => {
                    const value = coin.holdings * coin.price;
                    const cost = coin.holdings * coin.avgBuy;
                    const pnl = value - cost;
                    return (
                      <TableRow key={coin.symbol} sx={{ cursor: "pointer", "&:hover": { bgcolor: "rgba(255,255,255,0.03)" }, "& td": { borderBottom: "1px solid rgba(255,255,255,0.03)", py: 1.5 } }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            {coin.image ? (
                              <Box component="img" src={coin.image} alt={coin.name} sx={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover" }} />
                            ) : (
                              <Avatar sx={{ width: 30, height: 30, background: coin.gradient, fontSize: "0.7rem", fontWeight: 700 }}>{coin.symbol[0]}</Avatar>
                            )}
                            <Box>
                              <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 600, fontSize: "0.85rem" }}>{coin.symbol}</Typography>
                              <Typography variant="caption" sx={{ color: "#666666", fontSize: "0.7rem" }}>{coin.name}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 500, fontSize: "0.85rem" }}>{formatPrice(coin.price)}</TableCell>
                        <TableCell sx={{ color: "#cccccc", fontSize: "0.85rem" }}>{coin.holdings.toLocaleString()} {coin.symbol}</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 600, fontSize: "0.85rem" }}>${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell>
                          <Typography sx={{ color: pnl >= 0 ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.85rem" }}>
                            {pnl >= 0 ? "+" : ""}${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            {coin.change >= 0 ? <TrendingUpIcon sx={{ fontSize: 14, color: "#22c55e" }} /> : <TrendingDownIcon sx={{ fontSize: 14, color: "#ef4444" }} />}
                            <Typography sx={{ color: coin.change >= 0 ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.8rem" }}>{coin.change >= 0 ? "+" : ""}{typeof coin.change === "number" ? coin.change.toFixed(2) : coin.change}%</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" sx={{ color: "#ffffff", fontWeight: 700, mb: 2 }}>Recent Activity</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {recentActivity.map((activity, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: "8px", bgcolor: "rgba(255,255,255,0.02)", "&:hover": { bgcolor: "rgba(255,255,255,0.04)" } }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: activity.type === "deposit" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)" }}>
                      {activity.type === "deposit" ? <ArrowDownwardIcon sx={{ fontSize: 16, color: "#22c55e" }} /> : <ArrowUpwardIcon sx={{ fontSize: 16, color: "#ef4444" }} />}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 500, fontSize: "0.8rem" }}>{activity.action}</Typography>
                      <Typography variant="caption" sx={{ color: "#666666", fontSize: "0.7rem" }}>{activity.time}</Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 500, fontSize: "0.8rem" }}>{activity.amount}</Typography>
                      <Typography variant="caption" sx={{ color: "#666666", fontSize: "0.7rem" }}>{activity.value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
