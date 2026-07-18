import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  variant?: "default" | "trading" | "security" | "enterprise" | "legal";
}

const variantStyles = {
  default: {
    gradient: "page-header-gradient",
    badgeBg: "rgba(59, 130, 246, 0.1)",
    badgeColor: "#60a5fa",
    badgeBorder: "rgba(59, 130, 246, 0.2)",
    accentColor: "#3b82f6",
  },
  trading: {
    gradient: "page-header-gradient page-header-trading",
    badgeBg: "rgba(34, 197, 94, 0.1)",
    badgeColor: "#4ade80",
    badgeBorder: "rgba(34, 197, 94, 0.2)",
    accentColor: "#22c55e",
  },
  security: {
    gradient: "page-header-gradient page-header-security",
    badgeBg: "rgba(245, 158, 11, 0.1)",
    badgeColor: "#fbbf24",
    badgeBorder: "rgba(245, 158, 11, 0.2)",
    accentColor: "#f59e0b",
  },
  enterprise: {
    gradient: "page-header-gradient page-header-enterprise",
    badgeBg: "rgba(139, 92, 246, 0.1)",
    badgeColor: "#a78bfa",
    badgeBorder: "rgba(139, 92, 246, 0.2)",
    accentColor: "#8b5cf6",
  },
  legal: {
    gradient: "page-header-gradient",
    badgeBg: "rgba(156, 163, 175, 0.1)",
    badgeColor: "#9ca3af",
    badgeBorder: "rgba(156, 163, 175, 0.2)",
    accentColor: "#6b7280",
  },
};

export default function PageHeader({ title, subtitle, badge, variant = "default" }: PageHeaderProps) {
  const style = variantStyles[variant];

  return (
    <Box className={style.gradient} sx={{ pt: { xs: 8, md: 10 }, pb: { xs: 6, md: 8 }, position: "relative", overflow: "hidden" }}>
      <Box className="dot-grid" sx={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      {/* Animated accent line */}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: `linear-gradient(90deg, transparent, ${style.accentColor}40, transparent)`,
        opacity: 0.6,
      }} />

      {/* Floating orbs */}
      <Box sx={{
        position: "absolute",
        top: "20%",
        right: "10%",
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${style.accentColor}15 0%, transparent 70%)`,
        animation: "float 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute",
        bottom: "10%",
        left: "5%",
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${style.accentColor}10 0%, transparent 70%)`,
        animation: "float 8s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box className="animate-fade-in-up">
          {badge && (
            <Chip
              label={badge}
              size="small"
              sx={{
                mb: 3,
                bgcolor: style.badgeBg,
                color: style.badgeColor,
                border: `1px solid ${style.badgeBorder}`,
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                backdropFilter: "blur(10px)",
              }}
            />
          )}
          <Typography
            variant="h1"
            className="gradient-text"
            sx={{
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
              mb: 2,
              maxWidth: 700,
              lineHeight: 1.15,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.6)",
              maxWidth: 560,
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
