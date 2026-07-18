import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import MLogo from "./MLogo";

const footerLinks = {
  Products: [
    { label: "Spot Trading", path: "/products/spot-trading" },
    { label: "OTC Desk", path: "/products/otc-desk" },
    { label: "Custody", path: "/products/custody" },
    { label: "Settlement", path: "/products/settlement" },
    { label: "API Access", path: "/products/api-access" },
  ],
  Enterprise: [
    { label: "Solutions", path: "/solutions" },
    { label: "Case Studies", path: "/solutions/case-studies" },
    { label: "Compliance", path: "/compliance/institutional-fees" },
    { label: "Fees", path: "/compliance/institutional-fees" },
    { label: "Partners", path: "/partners" },
  ],
  Resources: [
    { label: "Documentation", path: "/resources/documentation" },
    { label: "API Reference", path: "/resources/api-reference" },
    { label: "Status Page", path: "/resources/status" },
    { label: "Security", path: "/resources/security" },
  ],
  Legal: [
    { label: "Terms", path: "/legal/terms" },
    { label: "Privacy", path: "/legal/privacy" },
    { label: "AML/KYC", path: "/legal/aml-kyc" },
    { label: "Cookies", path: "/legal/cookies" },
  ],
};

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 6 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <RouterLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <MLogo size={32} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>MATBEA</Typography>
                <Typography variant="caption" sx={{ color: "#666", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Enterprise</Typography>
              </Box>
            </RouterLink>
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
                  <Box component="li" key={link.path} sx={{ mb: 1 }}>
                    <RouterLink
                      to={link.path}
                      style={{ textDecoration: "none", color: "#666", fontSize: "0.8rem", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                    >
                      {link.label}
                    </RouterLink>
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
            {["English", "Espanol", "Chinese", "Japanese"].map((lang) => (
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
