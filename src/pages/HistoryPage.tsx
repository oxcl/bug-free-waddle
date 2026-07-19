import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { transactions } from "../data";

export default function HistoryPage() {
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.asset.toLowerCase().includes(search.toLowerCase()) || tx.id.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || tx.type.toLowerCase() === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const totalDeposits = useMemo(() => transactions.filter((tx) => tx.type === "Deposit").reduce((sum, tx) => sum + tx.amount, 0), []);
  const totalWithdrawals = useMemo(() => transactions.filter((tx) => tx.type === "Withdrawal").reduce((sum, tx) => sum + tx.amount, 0), []);
  const pendingCount = useMemo(() => transactions.filter((tx) => tx.status === "Pending").length, []);

  return (
    <Box>
      <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2, "& .MuiTab-root": { color: "#666666", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", minHeight: 36 }, "& .Mui-selected": { color: "#ffffff" }, "& .MuiTabs-indicator": { bgcolor: "#ffffff" } }}>
        <Tab label="Deposits & Withdrawals" />
        <Tab label="Trade History" />
      </Tabs>

      {tabValue === 0 && (
        <>
          {/* Filters */}
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap", alignItems: "center" }}>
            <TextField
              placeholder="Search by ID or asset..."
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
            <TextField
              select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              size="small"
              sx={{
                minWidth: 120,
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
                  "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                  "&.Mui-focused fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                },
                "& .MuiInputLabel-root": { color: "#666666" },
              }}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="deposit">Deposits</MenuItem>
              <MenuItem value="withdrawal">Withdrawals</MenuItem>
            </TextField>
          </Box>

          {/* Summary Cards */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Card
              elevation={0}
              sx={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "16px",
              }}
            >
              <CardContent sx={{ p: 2, textAlign: "center" }}>
                <ArrowDownwardIcon sx={{ fontSize: 24, color: "#22c55e", mb: 0.5 }} />
                <Typography variant="body2" sx={{ color: "#999999", fontSize: "0.75rem" }}>Total Deposits</Typography>
                <Typography variant="subtitle1" sx={{ color: "#22c55e", fontWeight: 700 }}>${totalDeposits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
              </CardContent>
            </Card>
            <Card
              elevation={0}
              sx={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "16px",
              }}
            >
              <CardContent sx={{ p: 2, textAlign: "center" }}>
                <ArrowUpwardIcon sx={{ fontSize: 24, color: "#ef4444", mb: 0.5 }} />
                <Typography variant="body2" sx={{ color: "#999999", fontSize: "0.75rem" }}>Total Withdrawals</Typography>
                <Typography variant="subtitle1" sx={{ color: "#ef4444", fontWeight: 700 }}>${totalWithdrawals.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
              </CardContent>
            </Card>
            <Card
              elevation={0}
              sx={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "16px",
              }}
            >
              <CardContent sx={{ p: 2, textAlign: "center" }}>
                <SwapHorizIcon sx={{ fontSize: 24, color: "#ffffff", mb: 0.5 }} />
                <Typography variant="body2" sx={{ color: "#999999", fontSize: "0.75rem" }}>Pending</Typography>
                <Typography variant="subtitle1" sx={{ color: "#ffffff", fontWeight: 700 }}>{pendingCount}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Transactions Table */}
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
                    {["ID", "Type", "Asset", "Amount", "Status", "Date", "Tx Hash"].map((h) => (
                      <TableCell key={h} sx={{ color: "#666666", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 1.5 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03)" }, "& td": { borderBottom: "1px solid rgba(255,255,255,0.03)", py: 1.8 } }}>
                      <TableCell sx={{ color: "#cccccc", fontFamily: "monospace", fontSize: "0.8rem" }}>{tx.id}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: tx.type === "Deposit" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)" }}>
                            {tx.type === "Deposit" ? <ArrowDownwardIcon sx={{ fontSize: 14, color: "#22c55e" }} /> : <ArrowUpwardIcon sx={{ fontSize: 14, color: "#ef4444" }} />}
                          </Box>
                          <Typography variant="body2" sx={{ color: tx.type === "Deposit" ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: "0.8rem" }}>{tx.type}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={tx.asset} size="small" sx={{ bgcolor: "rgba(255, 255, 255, 0.06)", color: "#ffffff", fontWeight: 600, fontSize: "0.7rem", height: 22 }} />
                      </TableCell>
                      <TableCell sx={{ color: "#ffffff", fontWeight: 600, fontSize: "0.85rem" }}>{tx.amount.toLocaleString()} {tx.asset}</TableCell>
                      <TableCell>
                        <Chip
                          label={tx.status}
                          size="small"
                          sx={{
                            bgcolor: tx.status === "Completed" ? "rgba(34, 197, 94, 0.08)" : "rgba(245, 158, 11, 0.08)",
                            color: tx.status === "Completed" ? "#22c55e" : "#f59e0b",
                            fontSize: "0.65rem",
                            height: 20,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#cccccc", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{tx.date}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Typography variant="body2" sx={{ color: "#999999", fontFamily: "monospace", fontSize: "0.75rem" }}>{tx.txHash}</Typography>
                          <OpenInNewIcon sx={{ fontSize: 12, color: "#666666", cursor: "pointer", "&:hover": { color: "#ffffff" } }} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {tabValue === 1 && (
        <Card
          elevation={0}
          sx={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "16px",
          }}
        >
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: "#666666" }}>Trade history will appear here</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
