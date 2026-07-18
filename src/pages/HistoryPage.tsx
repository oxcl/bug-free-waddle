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

  return (
    <Box>
      <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2, "& .MuiTab-root": { color: "#64748b", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", minHeight: 36 }, "& .Mui-selected": { color: "#818cf8" }, "& .MuiTabs-indicator": { bgcolor: "#6366f1" } }}>
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
                  color: "#f1f5f9",
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
                  "&:hover fieldset": { borderColor: "rgba(99, 102, 241, 0.3)" },
                  "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                },
              }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#475569", fontSize: 20 }} /></InputAdornment> } }}
            />
            <TextField
              select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              size="small"
              sx={{
                minWidth: 120,
                "& .MuiOutlinedInput-root": {
                  color: "#f1f5f9",
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
                  "&:hover fieldset": { borderColor: "rgba(99, 102, 241, 0.3)" },
                  "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                },
                "& .MuiInputLabel-root": { color: "#64748b" },
              }}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="deposit">Deposits</MenuItem>
              <MenuItem value="withdrawal">Withdrawals</MenuItem>
            </TextField>
          </Box>

          {/* Summary Cards */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Card elevation={0} sx={{ flex: 1 }}>
              <CardContent sx={{ p: 2, textAlign: "center" }}>
                <ArrowDownwardIcon sx={{ fontSize: 24, color: "#10b981", mb: 0.5 }} />
                <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.75rem" }}>Total Deposits</Typography>
                <Typography variant="subtitle1" sx={{ color: "#10b981", fontWeight: 700 }}>$40,000.00</Typography>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ flex: 1 }}>
              <CardContent sx={{ p: 2, textAlign: "center" }}>
                <ArrowUpwardIcon sx={{ fontSize: 24, color: "#ef4444", mb: 0.5 }} />
                <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.75rem" }}>Total Withdrawals</Typography>
                <Typography variant="subtitle1" sx={{ color: "#ef4444", fontWeight: 700 }}>$10,000.00</Typography>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ flex: 1 }}>
              <CardContent sx={{ p: 2, textAlign: "center" }}>
                <SwapHorizIcon sx={{ fontSize: 24, color: "#6366f1", mb: 0.5 }} />
                <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.75rem" }}>Pending</Typography>
                <Typography variant="subtitle1" sx={{ color: "#818cf8", fontWeight: 700 }}>1</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Transactions Table */}
          <Card elevation={0}>
            <CardContent sx={{ p: 0 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {["ID", "Type", "Asset", "Amount", "Status", "Date", "Tx Hash"].map((h) => (
                      <TableCell key={h} sx={{ color: "#475569", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(255,255,255,0.04)", py: 1.5 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" }, "& td": { borderBottom: "1px solid rgba(255,255,255,0.03)", py: 1.8 } }}>
                      <TableCell sx={{ color: "#94a3b8", fontFamily: "monospace", fontSize: "0.8rem" }}>{tx.id}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: tx.type === "Deposit" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)" }}>
                            {tx.type === "Deposit" ? <ArrowDownwardIcon sx={{ fontSize: 14, color: "#10b981" }} /> : <ArrowUpwardIcon sx={{ fontSize: 14, color: "#ef4444" }} />}
                          </Box>
                          <Typography variant="body2" sx={{ color: tx.type === "Deposit" ? "#10b981" : "#ef4444", fontWeight: 600, fontSize: "0.8rem" }}>{tx.type}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={tx.asset} size="small" sx={{ bgcolor: "rgba(99, 102, 241, 0.08)", color: "#818cf8", fontWeight: 600, fontSize: "0.7rem", height: 22 }} />
                      </TableCell>
                      <TableCell sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.85rem" }}>{tx.amount.toLocaleString()} {tx.asset}</TableCell>
                      <TableCell>
                        <Chip
                          label={tx.status}
                          size="small"
                          sx={{
                            bgcolor: tx.status === "Completed" ? "rgba(16, 185, 129, 0.08)" : "rgba(245, 158, 11, 0.08)",
                            color: tx.status === "Completed" ? "#10b981" : "#f59e0b",
                            fontSize: "0.65rem",
                            height: 20,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#94a3b8", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{tx.date}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Typography variant="body2" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.75rem" }}>{tx.txHash}</Typography>
                          <OpenInNewIcon sx={{ fontSize: 12, color: "#475569", cursor: "pointer", "&:hover": { color: "#818cf8" } }} />
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
        <Card elevation={0}>
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: "#475569" }}>Trade history will appear here</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
