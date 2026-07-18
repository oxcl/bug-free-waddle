import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HistoryIcon from "@mui/icons-material/History";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

const MLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="white" />
    <path
      d="M10 30V12L16 22L20 14L24 22L30 12V30"
      stroke="#060918"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const sidebarItems = [
  { label: "Overview", path: "/dashboard", icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
  { label: "Trading", path: "/dashboard/trading", icon: <SwapHorizIcon sx={{ fontSize: 20 }} /> },
  { label: "Wallets", path: "/dashboard/wallets", icon: <AccountBalanceWalletIcon sx={{ fontSize: 20 }} /> },
  { label: "Orders", path: "/dashboard/orders", icon: <ReceiptLongIcon sx={{ fontSize: 20 }} /> },
  { label: "Markets", path: "/dashboard/markets", icon: <StorefrontIcon sx={{ fontSize: 20 }} /> },
  { label: "History", path: "/dashboard/history", icon: <HistoryIcon sx={{ fontSize: 20 }} /> },
];

const SIDEBAR_WIDTH = 240;
const COLLAPSED_WIDTH = 68;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const currentWidth = isMobile ? 0 : collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: isMobile ? SIDEBAR_WIDTH : currentWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#080b16",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          height: 64,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <MLogo size={32} />
        {!collapsed && (
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body1" sx={{ fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em", lineHeight: 1.1, whiteSpace: "nowrap" }}>
              MATBEA
            </Typography>
            <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Enterprise
            </Typography>
          </Box>
        )}
      </Box>

      {/* Nav Items */}
      <Box sx={{ flex: 1, py: 1.5, px: 1, overflowY: "auto", overflowX: "hidden" }}>
        {sidebarItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Box
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: collapsed ? 2 : 2,
                py: 1.2,
                mx: 0.5,
                mb: 0.5,
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                justifyContent: collapsed ? "center" : "flex-start",
                bgcolor: active ? "rgba(99, 102, 241, 0.12)" : "transparent",
                color: active ? "#818cf8" : "#64748b",
                borderLeft: active ? "3px solid #6366f1" : "3px solid transparent",
                "&:hover": {
                  bgcolor: active ? "rgba(99, 102, 241, 0.12)" : "rgba(255,255,255,0.04)",
                  color: "#f1f5f9",
                },
              }}
            >
              {item.icon}
              {!collapsed && (
                <Typography variant="body2" sx={{ fontWeight: active ? 600 : 500, whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                  {item.label}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Bottom */}
      <Box sx={{ p: 1.5, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {!collapsed && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 1.5,
              py: 1.2,
              borderRadius: "10px",
              cursor: "pointer",
              "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
            }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(99, 102, 241, 0.2)", color: "#818cf8", fontSize: "0.8rem", fontWeight: 700 }}>
              JD
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.8rem", whiteSpace: "nowrap" }}>John Doe</Typography>
              <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.7rem", whiteSpace: "nowrap" }}>Pro Trader</Typography>
            </Box>
            <LogoutIcon sx={{ fontSize: 16, color: "#475569" }} />
          </Box>
        )}
        {collapsed && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(99, 102, 241, 0.2)", color: "#818cf8", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
              JD
            </Avatar>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#060918" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box component="nav" sx={{ flexShrink: 0, width: currentWidth, transition: "width 0.3s ease" }}>
          {sidebarContent}
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{ paper: { sx: { bgcolor: "#080b16", borderRight: "1px solid rgba(255,255,255,0.06)" } } }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#64748b" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {sidebarContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Bar */}
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 3 },
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            bgcolor: "rgba(6, 9, 24, 0.8)",
            backdropFilter: "blur(12px)",
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#f1f5f9" }}>
                <MenuIcon />
              </IconButton>
            )}
            {!isMobile && (
              <IconButton
                onClick={() => setCollapsed(!collapsed)}
                sx={{ color: "#64748b", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", width: 36, height: 36, "&:hover": { color: "#f1f5f9", borderColor: "rgba(255,255,255,0.12)" } }}
              >
                <MenuIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ color: "#475569" }}>/</Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 500 }}>
                {sidebarItems.find((i) => isActive(i.path))?.label || "Dashboard"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
                bgcolor: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.15)",
                borderRadius: "8px",
                px: 1.5,
                py: 0.5,
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 14, color: "#10b981" }} />
              <Typography variant="body2" sx={{ color: "#10b981", fontWeight: 600, fontSize: "0.8rem" }}>+12.4%</Typography>
            </Box>
            <IconButton sx={{ color: "#64748b", "&:hover": { color: "#f1f5f9" } }}>
              <Badge badgeContent={3} color="error" sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem", height: 16, minWidth: 16 } }}>
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: "#64748b", "&:hover": { color: "#f1f5f9" } }}>
              <SettingsIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Page Content */}
        <Box component="main" sx={{ flex: 1, overflow: "auto", p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
