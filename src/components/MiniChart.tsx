import Box from "@mui/material/Box";

export default function MiniChart({ up }: { up: boolean }) {
  const points = up
    ? "0,30 8,25 16,28 24,18 32,22 40,12 48,16 56,8 64,12 72,5 80,8"
    : "0,8 8,12 16,10 24,20 32,16 40,25 48,22 56,28 64,24 72,28 80,30";
  const color = up ? "#22c55e" : "#ef4444";
  return (
    <Box component="svg" width="100%" height="32" viewBox="0 0 80 32" sx={{ display: "block" }}>
      <defs>
        <linearGradient id={`miniGrad-${up}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points={`0,32 ${points} 80,32`} fill={`url(#miniGrad-${up})`} />
    </Box>
  );
}
