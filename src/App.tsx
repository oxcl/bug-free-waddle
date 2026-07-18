import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Matbea Enterprise
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          React + MUI + TypeScript
        </Typography>
        <Button variant="contained">Get Started</Button>
      </Box>
    </Container>
  );
}

export default App;
