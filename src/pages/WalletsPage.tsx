import { useState } from "react";
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
import { coins } from "../data";

export default function WalletsPage() {
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [tabValue, setTabValue] = useState(0);

  const totalBalance = coins.reduce((sum, c) => sum + c.holdings * c.price, 0);
  const totalCost = coins.reduce((sum, c) => sum + c.holdings * c.avgBuy, 0);
  const totalPnL = totalBalance - totalCost;

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
    <Box>
      {/* Balance Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={0}>
            <CardContent sx={{ p: 2.5, textAlign: "center" }}>
              <AccountBalanceWalletIcon sx={{ fontSize: 28, color: "#6366f1", mb: 1 }} />
              <Typography variant="body2" sx={{ color: "#64748b", mb: 0.5, fontSize: "0.8rem" }}>Total Balance</Typography>
              <Typography variant="h5" sx={{ color: "#f1f5f9", fontWeight: 700 }}>${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={0}>
            <CardContent sx={{ p: 2.5, textAlign: "center" }}>
              <SwapHorizIcon sx={{ fontSize: 28, color: "#22d3ee", mb: 1 }} />
              <Typography variant="body2" sx={{ color: "#64748b", mb: 0.5, fontSize: "0.8rem" }}>Available for Trading</Typography>
              <Typography variant="h5" sx={{ color: "#f1f5f9", fontWeight: 700 }}>$42,850.00</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={0}>
            <CardContent sx={{ p: 2.5, textAlign: "center" }}>
              <TrendingUpIcon sx={{ fontSize: 28, color: totalPnL >= 0 ? "#10b981" : "#ef4444", mb: 1 }} />
              <Typography variant="body2" sx={{ color: "#64748b", mb: 0.5, fontSize: "0.8rem" }}>Total P&L</Typography>
              <Typography variant="h5" sx={{ color: totalPnL >= 0 ? "#10b981" : "#ef4444", fontWeight: 700 }}>
                {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
        <Button variant="contained" startIcon={<ArrowDownwardIcon />} onClick={() => setDepositOpen(true)} sx={{ bgcolor: "rgba(16, 185, 129, 0.9)", "&:hover": { bgcolor: "rgba(16, 185, 129, 1)" } }}>
          Deposit
        </Button>
        <Button variant="outlined" startIcon={<ArrowUpwardIcon />} onClick={() => setWithdrawOpen(true)} sx={{ borderColor: "rgba(239, 68, 68, 0.3)", color: "#ef4444", "&:hover": { borderColor: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.05)" } }}>
          Withdraw
        </Button>
      </Box>

      {/* Balances Table */}
      <Card elevation={0}>
        <CardContent sx={{ p: 2.5 }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2, "& .MuiTab-root": { color: "#64748b", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", minHeight: 36 }, "& .Mui-selected": { color: "#818cf8" }, "& .MuiTabs-indicator": { bgcolor: "#6366f1" } }}>
            <Tab label="All Assets" />
            <Tab label="Crypto" />
            <Tab label="Fiat" />
          </Tabs>

          <Table>
            <TableHead>
              <TableRow>
                {["Asset", "Price", "Holdings", "Value", "Avg. Buy", "P&L", "24h", "Actions"].map((h) => (
                  <TableCell key={h} sx={{ color: "#475569", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(255,255,255,0.04)", py: 1.5 }}>
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
                  <TableRow key={coin.symbol} sx={{ cursor: "pointer", "&:hover": { bgcolor: "rgba(255,255,255,0.02)" }, "& td": { borderBottom: "1px solid rgba(255,255,255,0.03)", py: 1.8 } }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ width: 34, height: 34, background: coin.gradient, fontSize: "0.75rem", fontWeight: 700 }}>{coin.symbol[0]}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.85rem" }}>{coin.symbol}</Typography>
                          <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.7rem" }}>{coin.name}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "#f1f5f9", fontWeight: 500, fontSize: "0.85rem" }}>${coin.price.toLocaleString()}</TableCell>
                    <TableCell sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>{coin.holdings.toLocaleString()} {coin.symbol}</TableCell>
                    <TableCell sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.85rem" }}>${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>${coin.avgBuy.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ color: pnl >= 0 ? "#10b981" : "#ef4444", fontWeight: 600, fontSize: "0.85rem" }}>
                          {pnl >= 0 ? "+" : ""}${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Typography>
                        <Typography variant="caption" sx={{ color: pnl >= 0 ? "#10b981" : "#ef4444", fontSize: "0.7rem" }}>{pnl >= 0 ? "+" : ""}{pnlPct}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {coin.change >= 0 ? <TrendingUpIcon sx={{ fontSize: 14, color: "#10b981" }} /> : <TrendingDownIcon sx={{ fontSize: 14, color: "#ef4444" }} />}
                        <Typography sx={{ color: coin.change >= 0 ? "#10b981" : "#ef4444", fontWeight: 600, fontSize: "0.8rem" }}>{coin.change >= 0 ? "+" : ""}{coin.change}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Button size="small" variant="text" sx={{ color: "#10b981", fontSize: "0.7rem", minWidth: 0, py: 0.5, px: 1 }} onClick={() => { setSelectedAsset(coin.symbol); setDepositOpen(true); }}>Deposit</Button>
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
      <Dialog open={depositOpen} onClose={() => setDepositOpen(false)} slotProps={{ paper: { sx: { bgcolor: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, minWidth: { xs: "90%", sm: 440 } } } }}>
        <DialogTitle sx={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.1rem" }}>Deposit {selectedAsset}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ color: "#64748b", mb: 2, fontSize: "0.8rem" }}>Send {selectedAsset} to this address. Only send {selectedAsset} to this address.</Typography>

            <TextField
              fullWidth
              value={selectedAsset === "BTC" ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" : "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18"}
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copy">
                        <IconButton sx={{ color: "#818cf8" }}><ContentCopyIcon sx={{ fontSize: 18 }} /></IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": { color: "#f1f5f9", fontFamily: "monospace", fontSize: "0.8rem", "& fieldset": { borderColor: "rgba(255,255,255,0.08)" } },
              }}
            />

            <Box sx={{ mt: 2, p: 2, bgcolor: "rgba(99, 102, 241, 0.06)", borderRadius: 2, border: "1px solid rgba(99, 102, 241, 0.1)" }}>
              <Typography variant="body2" sx={{ color: "#818cf8", fontWeight: 600, mb: 1, fontSize: "0.8rem" }}>Important</Typography>
              <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.75rem", lineHeight: 1.6 }}>
                • Minimum deposit: 0.001 {selectedAsset}<br />
                • Confirmations required: 3<br />
                • Deposits typically arrive in 10-30 minutes
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setDepositOpen(false)} sx={{ color: "#64748b" }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawOpen} onClose={() => setWithdrawOpen(false)} slotProps={{ paper: { sx: { bgcolor: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, minWidth: { xs: "90%", sm: 440 } } } }}>
        <DialogTitle sx={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.1rem" }}>Withdraw {selectedAsset}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Recipient Address" fullWidth size="small" sx={inputSx} />
            <TextField label={`Amount (${selectedAsset})`} type="number" fullWidth size="small" sx={inputSx} />
            <Box sx={{ display: "flex", justifyContent: "space-between", p: 1.5, bgcolor: "rgba(255,255,255,0.02)", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.8rem" }}>Available</Typography>
              <Typography variant="body2" sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.85rem" }}>
                {coins.find((c) => c.symbol === selectedAsset)?.holdings.toLocaleString()} {selectedAsset}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.8rem" }}>Network Fee</Typography>
              <Typography variant="body2" sx={{ color: "#f1f5f9", fontSize: "0.85rem" }}>~0.0001 {selectedAsset}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setWithdrawOpen(false)} sx={{ color: "#64748b" }}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "rgba(239, 68, 68, 0.9)", "&:hover": { bgcolor: "rgba(239, 68, 68, 1)" } }}>Withdraw</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
