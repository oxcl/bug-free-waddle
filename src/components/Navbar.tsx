import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MLogo from "./MLogo";

interface NavSubItem {
  label: string;
  path: string;
  description?: string;
}

interface NavItem {
  label: string;
  path?: string;
  children?: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    label: "Products",
    children: [
      { label: "Spot Trading", path: "/products/spot-trading", description: "Deep liquidity across 200+ pairs" },
      { label: "OTC Desk", path: "/products/otc-desk", description: "Block trades with zero slippage" },
      { label: "Custody", path: "/products/custody", description: "Institutional-grade cold storage" },
      { label: "Settlement", path: "/products/settlement", description: "T+0 instant settlement" },
      { label: "API Access", path: "/products/api-access", description: "REST & WebSocket APIs" },
      { label: "Enterprise", path: "/products/enterprise", description: "Custom infrastructure solutions" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Overview", path: "/solutions" },
      { label: "Case Studies", path: "/solutions/case-studies" },
    ],
  },
  {
    label: "Compliance",
    children: [
      { label: "Institutional Fees", path: "/compliance/institutional-fees" },
    ],
  },
  { label: "Partners", path: "/partners" },
  {
    label: "Resources",
    children: [
      { label: "Documentation", path: "/resources/documentation" },
      { label: "API Reference", path: "/resources/api-reference" },
      { label: "Status Page", path: "/resources/status" },
      { label: "Security", path: "/resources/security" },
      { label: "Bug Bounty", path: "/resources/bug-bounty" },
    ],
  },
  {
    label: "Legal",
    children: [
      { label: "Terms of Service", path: "/legal/terms" },
      { label: "Privacy Policy", path: "/legal/privacy" },
      { label: "AML/KYC", path: "/legal/aml-kyc" },
      { label: "Cookie Policy", path: "/legal/cookies" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width:900px)");
  const location = useLocation();

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", height: 64 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <RouterLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 1.5 }}>
                <MLogo />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                    MATBEA
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Enterprise
                  </Typography>
                </Box>
              </RouterLink>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {navItems.map((item) => (
                  <Box
                    key={item.label}
                    sx={{ position: "relative" }}
                    onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.path ? (
                      <RouterLink to={item.path} style={{ textDecoration: "none" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: location.pathname === item.path ? "#fff" : "#999",
                            fontWeight: 500,
                            cursor: "pointer",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" },
                          }}
                        >
                          {item.label}
                        </Typography>
                      </RouterLink>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#999",
                          fontWeight: 500,
                          cursor: "pointer",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" },
                        }}
                      >
                        {item.label}
                        <KeyboardArrowDownIcon sx={{ fontSize: 14, transition: "transform 0.2s", transform: activeDropdown === item.label ? "rotate(180deg)" : "none" }} />
                      </Typography>
                    )}

                    {item.children && activeDropdown === item.label && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          minWidth: 220,
                          bgcolor: "#111",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 2,
                          py: 1,
                          zIndex: 1000,
                          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                        }}
                      >
                        {item.children.map((child) => (
                          <RouterLink to={child.path} key={child.path} style={{ textDecoration: "none" }}>
                            <Box
                              sx={{
                                px: 2,
                                py: 1,
                                cursor: "pointer",
                                transition: "background 0.2s",
                                "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                              }}
                            >
                              <Typography variant="body2" sx={{ color: "#fff", fontWeight: 500, fontSize: "0.85rem" }}>
                                {child.label}
                              </Typography>
                              {child.description && (
                                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.75rem" }}>
                                  {child.description}
                                </Typography>
                              )}
                            </Box>
                          </RouterLink>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              {!isMobile && (
                <>
                  <Button variant="text" sx={{ color: "#999", fontWeight: 500 }}>Log In</Button>
                  <Button variant="contained">Contact Sales</Button>
                </>
              )}
              {isMobile && (
                <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#fff" }}><MenuIcon /></IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} slotProps={{ paper: { sx: { bgcolor: "#111", width: 280, borderLeft: "1px solid rgba(255,255,255,0.08)" } } }}>
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>Menu</Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#666" }}><CloseIcon /></IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ px: 1 }}>
              {item.path ? (
                <RouterLink to={item.path} style={{ textDecoration: "none", width: "100%" }} onClick={() => setMobileOpen(false)}>
                  <ListItemButton sx={{ borderRadius: 2 }}>
                    <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 500, color: "#fff" } } }} />
                  </ListItemButton>
                </RouterLink>
              ) : (
                <>
                  <ListItemButton sx={{ borderRadius: 2 }} onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}>
                    <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 500, color: "#fff" } } }} />
                    <KeyboardArrowDownIcon sx={{ color: "#666", transition: "transform 0.2s", transform: activeDropdown === item.label ? "rotate(180deg)" : "none" }} />
                  </ListItemButton>
                  {activeDropdown === item.label && item.children && (
                    <List disablePadding sx={{ pl: 2 }}>
                      {item.children.map((child) => (
                        <ListItem key={child.path} disablePadding>
                          <RouterLink to={child.path} style={{ textDecoration: "none", width: "100%" }} onClick={() => setMobileOpen(false)}>
                            <ListItemButton sx={{ borderRadius: 2 }}>
                              <ListItemText primary={child.label} slotProps={{ primary: { sx: { fontWeight: 400, color: "#ccc", fontSize: "0.9rem" } } }} />
                            </ListItemButton>
                          </RouterLink>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </>
              )}
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 2 }} />
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Button variant="outlined" fullWidth>Log In</Button>
          <Button variant="contained" fullWidth>Contact Sales</Button>
        </Box>
      </Drawer>
    </>
  );
}
