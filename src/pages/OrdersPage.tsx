import { useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/Cancel";
import { openOrders, orderHistory } from "../data";

export default function OrdersPage() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2, "& .MuiTab-root": { color: "#64748b", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", minHeight: 36 }, "& .Mui-selected": { color: "#818cf8" }, "& .MuiTabs-indicator": { bgcolor: "#6366f1" } }}>
        <Tab label={`Open Orders (${openOrders.filter((o) => o.status === "Open" || o.status === "Partial").length})`} />
        <Tab label="Order History" />
      </Tabs>

      {tabValue === 0 && (
        <Card elevation={0}>
          <CardContent sx={{ p: 0 }}>
            {openOrders.filter((o) => o.status === "Open" || o.status === "Partial").length === 0 ? (
              <Box sx={{ p: 6, textAlign: "center" }}>
                <Typography variant="body1" sx={{ color: "#475569" }}>No open orders</Typography>
              </Box>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    {["Date", "Pair", "Type", "Side", "Price", "Amount", "Filled", "Total", "Status", "Actions"].map((h) => (
                      <TableCell key={h} sx={{ color: "#475569", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(255,255,255,0.04)", py: 1.5, px: 1.5 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {openOrders.filter((o) => o.status === "Open" || o.status === "Partial").map((order) => (
                    <TableRow key={order.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" }, "& td": { borderBottom: "1px solid rgba(255,255,255,0.03)", py: 1.5, px: 1.5, fontSize: "0.82rem" } }}>
                      <TableCell sx={{ color: "#94a3b8", whiteSpace: "nowrap" }}>{order.date}</TableCell>
                      <TableCell sx={{ color: "#f1f5f9", fontWeight: 600 }}>{order.pair}</TableCell>
                      <TableCell>
                        <Chip label={order.type} size="small" sx={{ bgcolor: "rgba(99, 102, 241, 0.08)", color: "#818cf8", fontSize: "0.65rem", height: 20, fontWeight: 600 }} />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.side}
                          size="small"
                          sx={{
                            bgcolor: order.side === "Buy" ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                            color: order.side === "Buy" ? "#10b981" : "#ef4444",
                            fontSize: "0.65rem",
                            height: 20,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#f1f5f9", fontWeight: 500 }}>${order.price.toLocaleString()}</TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ flex: 1, height: 4, borderRadius: 2, bgcolor: "rgba(255,255,255,0.04)", overflow: "hidden", minWidth: 60 }}>
                            <Box sx={{ height: "100%", width: `${(order.filled / order.amount) * 100}%`, bgcolor: "#6366f1", borderRadius: 2 }} />
                          </Box>
                          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>{((order.filled / order.amount) * 100).toFixed(0)}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "#f1f5f9", fontWeight: 500 }}>${order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          sx={{
                            bgcolor: order.status === "Open" ? "rgba(99, 102, 241, 0.08)" : "rgba(245, 158, 11, 0.08)",
                            color: order.status === "Open" ? "#818cf8" : "#f59e0b",
                            fontSize: "0.65rem",
                            height: 20,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Cancel Order">
                          <IconButton size="small" sx={{ color: "#ef4444", "&:hover": { bgcolor: "rgba(239, 68, 68, 0.1)" } }}>
                            <CancelIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {tabValue === 1 && (
        <Card elevation={0}>
          <CardContent sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {["Date", "Pair", "Type", "Side", "Price", "Amount", "Total", "Fee", "Status"].map((h) => (
                    <TableCell key={h} sx={{ color: "#475569", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(255,255,255,0.04)", py: 1.5, px: 1.5 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistory.map((order) => (
                  <TableRow key={order.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" }, "& td": { borderBottom: "1px solid rgba(255,255,255,0.03)", py: 1.5, px: 1.5, fontSize: "0.82rem" } }}>
                    <TableCell sx={{ color: "#94a3b8", whiteSpace: "nowrap" }}>{order.date}</TableCell>
                    <TableCell sx={{ color: "#f1f5f9", fontWeight: 600 }}>{order.pair}</TableCell>
                    <TableCell>
                      <Chip label={order.type} size="small" sx={{ bgcolor: "rgba(99, 102, 241, 0.08)", color: "#818cf8", fontSize: "0.65rem", height: 20, fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.side}
                        size="small"
                        sx={{
                          bgcolor: order.side === "Buy" ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                          color: order.side === "Buy" ? "#10b981" : "#ef4444",
                          fontSize: "0.65rem",
                          height: 20,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "#f1f5f9", fontWeight: 500 }}>${order.price.toLocaleString()}</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>{order.amount.toLocaleString()}</TableCell>
                    <TableCell sx={{ color: "#f1f5f9", fontWeight: 500 }}>${order.total.toLocaleString()}</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>${order.fee.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          bgcolor: order.status === "Filled" ? "rgba(16, 185, 129, 0.08)" : "rgba(100, 116, 139, 0.15)",
                          color: order.status === "Filled" ? "#10b981" : "#64748b",
                          fontSize: "0.65rem",
                          height: 20,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
