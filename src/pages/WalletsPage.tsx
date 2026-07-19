import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { coins as staticCoins } from "../data";
import { useCoins } from "../components/CoinGeckoProvider";
import { formatPrice } from "../api/coingecko";

export default function WalletsPage() {
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("USDT");
  const [tabValue, setTabValue] = useState(0);
  const { coins: cgCoins } = useCoins();

  const coins = useMemo(() => {
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

  const totalBalance = coins.reduce((sum, c) => sum + c.holdings * c.price, 0);
  const totalCost = coins.reduce((sum, c) => sum + c.holdings * c.avgBuy, 0);
  const totalPnL = totalBalance - totalCost;

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      color: "#ffffff",
      fontSize: "0.85rem",
      background: "rgba(255, 255, 255, 0.03)",
      "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
      "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
      "&.Mui-focused fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
    },
    "& .MuiInputLabel-root": { color: "#666666", fontSize: "0.8rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#999999" },
  };

  return (
    <Box>
      {/* Balance Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ p: 2.5, textAlign: "center" }}>
              <AccountBalanceWalletIcon sx={{ fontSize: 28, color: "#ffffff", mb: 1 }} />
              <Typography variant="body2" sx={{ color: "#999999", mb: 0.5, fontSize: "0.8rem" }}>Total Balance</Typography>
              <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 700 }}>${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ p: 2.5, textAlign: "center" }}>
              <SwapHorizIcon sx={{ fontSize: 28, color: "#22d3ee", mb: 1 }} />
              <Typography variant="body2" sx={{ color: "#999999", mb: 0.5, fontSize: "0.8rem" }}>Available for Trading</Typography>
              <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 700 }}>${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ p: 2.5, textAlign: "center" }}>
              <TrendingUpIcon sx={{ fontSize: 28, color: totalPnL >= 0 ? "#22c55e" : "#ef4444", mb: 1 }} />
              <Typography variant="body2" sx={{ color: "#999999", mb: 0.5, fontSize: "0.8rem" }}>Total P&L</Typography>
              <Typography variant="h5" sx={{ color: totalPnL >= 0 ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
                {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
        <Button variant="contained" startIcon={<ArrowDownwardIcon />} onClick={() => setDepositOpen(true)} sx={{ bgcolor: "rgba(34, 197, 94, 0.9)", "&:hover": { bgcolor: "#22c55e" } }}>
          Deposit
        </Button>
        <Button variant="outlined" startIcon={<ArrowUpwardIcon />} onClick={() => setWithdrawOpen(true)} sx={{ borderColor: "rgba(239, 68, 68, 0.3)", color: "#ef4444", "&:hover": { borderColor: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.05)" } }}>
          Withdraw
        </Button>
      </Box>

      {/* Balances Table */}
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
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2, "& .MuiTab-root": { color: "#666666", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", minHeight: 36 }, "& .Mui-selected": { color: "#ffffff" }, "& .MuiTabs-indicator": { bgcolor: "#ffffff" } }}>
            <Tab label="All Assets" />
            <Tab label="Crypto" />
            <Tab label="Fiat" />
          </Tabs>

          <Table>
            <TableHead>
              <TableRow>
                {["Asset", "Price", "Holdings", "Value", "Avg. Buy", "P&L", "24h", "Actions"].map((h) => (
                  <TableCell key={h} sx={{ color: "#666666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 1.5 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((coin) => {
                const value = coin.holdings * coin.price;
                const cost = coin.holdings * coin.avgBuy;
                const pnl = value - cost;
                const pnlPct = ((pnl / cost) * 100).toFixed(2);
                return (
                  <TableRow key={coin.symbol} sx={{ cursor: "pointer", "&:hover": { bgcolor: "rgba(255,255,255,0.03)" }, "& td": { borderBottom: "1px solid rgba(255,255,255,0.03)", py: 1.8 } }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        {coin.image ? (
                          <Box component="img" src={coin.image} alt={coin.name} sx={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                          <Avatar sx={{ width: 34, height: 34, background: coin.gradient, fontSize: "0.75rem", fontWeight: 700 }}>{coin.symbol[0]}</Avatar>
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
                    <TableCell sx={{ color: "#cccccc", fontSize: "0.85rem" }}>${coin.avgBuy.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ color: pnl >= 0 ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.85rem" }}>
                          {pnl >= 0 ? "+" : ""}${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Typography>
                        <Typography variant="caption" sx={{ color: pnl >= 0 ? "#22c55e" : "#ef4444", fontSize: "0.7rem" }}>{pnl >= 0 ? "+" : ""}{pnlPct}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {coin.change >= 0 ? <TrendingUpIcon sx={{ fontSize: 14, color: "#22c55e" }} /> : <TrendingDownIcon sx={{ fontSize: 14, color: "#ef4444" }} />}
                        <Typography sx={{ color: coin.change >= 0 ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.8rem" }}>{coin.change >= 0 ? "+" : ""}{typeof coin.change === "number" ? coin.change.toFixed(2) : coin.change}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Button size="small" variant="text" sx={{ color: "#22c55e", fontSize: "0.7rem", minWidth: 0, py: 0.5, px: 1 }} onClick={() => { setSelectedAsset(coin.symbol); setDepositOpen(true); }}>Deposit</Button>
                        <Button size="small" variant="text" sx={{ color: "#ef4444", fontSize: "0.7rem", minWidth: 0, py: 0.5, px: 1 }} onClick={() => { setSelectedAsset(coin.symbol); setWithdrawOpen(true); }}>Withdraw</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Deposit Dialog */}
      <Dialog open={depositOpen} onClose={() => setDepositOpen(false)} slotProps={{ paper: { sx: { bgcolor: "rgba(17, 17, 17, 0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, minWidth: { xs: "90%", sm: 440 } } } }}>
        <DialogTitle sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>Deposit {selectedAsset}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ color: "#999999", mb: 2, fontSize: "0.8rem" }}>Send {selectedAsset} to this address. Only send {selectedAsset} to this address.</Typography>

            <TextField
              fullWidth
              value="0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18"
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copy">
                        <IconButton sx={{ color: "#ffffff" }}><ContentCopyIcon sx={{ fontSize: 18 }} /></IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": { color: "#ffffff", fontFamily: "monospace", fontSize: "0.8rem", background: "rgba(255, 255, 255, 0.03)", "& fieldset": { borderColor: "rgba(255,255,255,0.08)" } },
              }}
            />

            <Box sx={{ mt: 2, p: 2, bgcolor: "rgba(255, 255, 255, 0.04)", borderRadius: 2, border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 600, mb: 1, fontSize: "0.8rem" }}>Important</Typography>
              <Typography variant="body2" sx={{ color: "#999999", fontSize: "0.75rem", lineHeight: 1.6 }}>
                &bull; Minimum deposit: 0.001 {selectedAsset}<br />
                &bull; Confirmations required: 3<br />
                &bull; Deposits typically arrive in 10-30 minutes
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setDepositOpen(false)} sx={{ color: "#999999" }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawOpen} onClose={() => setWithdrawOpen(false)} slotProps={{ paper: { sx: { bgcolor: "rgba(17, 17, 17, 0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, minWidth: { xs: "90%", sm: 440 } } } }}>
        <DialogTitle sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>Withdraw {selectedAsset}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Recipient Address" fullWidth size="small" sx={inputSx} />
            <TextField label={`Amount (${selectedAsset})`} type="number" fullWidth size="small" sx={inputSx} />
            <Box sx={{ display: "flex", justifyContent: "space-between", p: 1.5, bgcolor: "rgba(255,255,255,0.03)", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: "#999999", fontSize: "0.8rem" }}>Available</Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 600, fontSize: "0.85rem" }}>
                {coins.find((c) => c.symbol === selectedAsset)?.holdings.toLocaleString()} {selectedAsset}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#999999", fontSize: "0.8rem" }}>Network Fee</Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", fontSize: "0.85rem" }}>~0.0001 {selectedAsset}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setWithdrawOpen(false)} sx={{ color: "#999999" }}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "rgba(239, 68, 68, 0.9)", "&:hover": { bgcolor: "#ef4444" } }}>Withdraw</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
