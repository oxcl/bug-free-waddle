import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import TickerTape from "./TickerTape";
import Footer from "./Footer";

export default function Layout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#000" }}>
      <Navbar />
      <TickerTape />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
