import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryAction?: { label: string; path: string };
  secondaryAction?: { label: string; path: string };
}

export default function CTASection({ title, subtitle, primaryAction, secondaryAction }: CTASectionProps) {
  return (
    <Box sx={{
      py: { xs: 8, md: 10 },
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(59, 130, 246, 0.03) 50%, rgba(0,0,0,0) 100%)",
    }}>
      {/* Background grid */}
      <Box className="grid-pattern" sx={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      {/* Floating orbs */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <Box className="animate-fade-in-up">
          <Typography
            variant="h3"
            className="gradient-text"
            sx={{
              mb: 2.5,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              maxWidth: 500,
              mx: "auto",
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.5)",
              mb: 4,
              maxWidth: 440,
              mx: "auto",
              lineHeight: 1.8,
              fontSize: "1.05rem",
            }}
          >
            {subtitle}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            {primaryAction && (
              <RouterLink to={primaryAction.path} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.5,
                    px: 5,
                    fontSize: "1rem",
                    background: "linear-gradient(135deg, #fff 0%, #e5e5e5 100%)",
                    color: "#000",
                    fontWeight: 700,
                    "&:hover": {
                      background: "linear-gradient(135deg, #e5e5e5 0%, #ccc 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 8px 24px rgba(255,255,255,0.15)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {primaryAction.label}
                </Button>
              </RouterLink>
            )}
            {secondaryAction && (
              <RouterLink to={secondaryAction.path} style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 5,
                    fontSize: "1rem",
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.4)",
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  {secondaryAction.label}
                </Button>
              </RouterLink>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
