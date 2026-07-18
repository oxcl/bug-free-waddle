import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#cccccc",
      contrastText: "#000000",
    },
    secondary: {
      main: "#888888",
      light: "#aaaaaa",
      dark: "#666666",
    },
    background: {
      default: "#000000",
      paper: "#111111",
    },
    text: {
      primary: "#ffffff",
      secondary: "#999999",
    },
    success: {
      main: "#22c55e",
      light: "#4ade80",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
    },
    warning: {
      main: "#f59e0b",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none" as const,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "0.9rem",
          fontWeight: 600,
          transition: "all 0.2s ease",
        },
        contained: {
          backgroundColor: "#ffffff",
          color: "#000000",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#e5e5e5",
            boxShadow: "none",
          },
        },
        outlined: {
          borderWidth: "1px",
          borderColor: "rgba(255, 255, 255, 0.2)",
          color: "#ffffff",
          "&:hover": {
            borderWidth: "1px",
            borderColor: "#ffffff",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#111111",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 100,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
  },
});

export default theme;
