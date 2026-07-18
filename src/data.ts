export const coins = [
  { name: "Bitcoin", symbol: "BTC", price: 67432.18, change: 2.45, volume: "28.5B", marketCap: "1.32T", color: "#f7931a", gradient: "linear-gradient(135deg, #f7931a, #f59e0b)", holdings: 1.245, avgBuy: 42350.00 },
  { name: "Ethereum", symbol: "ETH", price: 3521.67, change: 1.82, volume: "15.2B", marketCap: "423.1B", color: "#627eea", gradient: "linear-gradient(135deg, #627eea, #818cf8)", holdings: 12.5, avgBuy: 2180.00 },
  { name: "Solana", symbol: "SOL", price: 178.93, change: 5.67, volume: "4.8B", marketCap: "78.3B", color: "#9945ff", gradient: "linear-gradient(135deg, #9945ff, #c084fc)", holdings: 85.0, avgBuy: 98.50 },
  { name: "Cardano", symbol: "ADA", price: 0.6234, change: -1.23, volume: "892M", marketCap: "22.1B", color: "#0033ad", gradient: "linear-gradient(135deg, #3b82f6, #6366f1)", holdings: 15000, avgBuy: 0.45 },
  { name: "XRP", symbol: "XRP", price: 0.5821, change: 0.89, volume: "1.2B", marketCap: "31.7B", color: "#23292f", gradient: "linear-gradient(135deg, #64748b, #94a3b8)", holdings: 25000, avgBuy: 0.52 },
  { name: "Polkadot", symbol: "DOT", price: 8.4521, change: 3.21, volume: "567M", marketCap: "11.2B", color: "#e6007a", gradient: "linear-gradient(135deg, #e6007a, #f472b6)", holdings: 200, avgBuy: 6.20 },
  { name: "Avalanche", symbol: "AVAX", price: 42.87, change: -0.54, volume: "678M", marketCap: "16.3B", color: "#e84142", gradient: "linear-gradient(135deg, #e84142, #f87171)", holdings: 50, avgBuy: 35.00 },
  { name: "Chainlink", symbol: "LINK", price: 18.92, change: 4.12, volume: "1.1B", marketCap: "11.1B", color: "#2a5ada", gradient: "linear-gradient(135deg, #2a5ada, #6366f1)", holdings: 300, avgBuy: 12.50 },
  { name: "Dogecoin", symbol: "DOGE", price: 0.1523, change: 8.45, volume: "2.3B", marketCap: "21.8B", color: "#c2a633", gradient: "linear-gradient(135deg, #c2a633, #f59e0b)", holdings: 50000, avgBuy: 0.08 },
  { name: "Polygon", symbol: "MATIC", price: 0.7123, change: 1.56, volume: "445M", marketCap: "6.6B", color: "#8247e5", gradient: "linear-gradient(135deg, #8247e5, #a78bfa)", holdings: 8000, avgBuy: 0.55 },
];

export const tickerData = [
  { symbol: "BTC/USDT", price: "67,432.18", change: "+2.45%" },
  { symbol: "ETH/USDT", price: "3,521.67", change: "+1.82%" },
  { symbol: "SOL/USDT", price: "178.93", change: "+5.67%" },
  { symbol: "BNB/USDT", price: "612.45", change: "+0.93%" },
  { symbol: "XRP/USDT", price: "0.5821", change: "+0.89%" },
  { symbol: "ADA/USDT", price: "0.6234", change: "-1.23%" },
  { symbol: "DOGE/USDT", price: "0.1523", change: "+8.45%" },
  { symbol: "DOT/USDT", price: "8.4521", change: "+3.21%" },
  { symbol: "AVAX/USDT", price: "42.87", change: "-0.54%" },
  { symbol: "LINK/USDT", price: "18.92", change: "+4.12%" },
  { symbol: "MATIC/USDT", price: "0.7123", change: "+1.56%" },
  { symbol: "UNI/USDT", price: "12.34", change: "+2.78%" },
];

export const ratePairs: Record<string, number> = {
  BTC: 67432.18,
  ETH: 3521.67,
  SOL: 178.93,
  BNB: 612.45,
  XRP: 0.5821,
  ADA: 0.6234,
  DOGE: 0.1523,
  DOT: 8.4521,
  AVAX: 42.87,
  LINK: 18.92,
  MATIC: 0.7123,
  USDT: 1.0,
  USDC: 1.0,
};

export const portfolioHistory = [
  { date: "Jan", value: 82000 },
  { date: "Feb", value: 95000 },
  { date: "Mar", value: 88000 },
  { date: "Apr", value: 110000 },
  { date: "May", value: 125000 },
  { date: "Jun", value: 118000 },
  { date: "Jul", value: 142000 },
];

export const orderBook = {
  asks: [
    { price: 67485.20, amount: 0.452, total: 30503.31 },
    { price: 67478.50, amount: 1.230, total: 82998.55 },
    { price: 67470.00, amount: 0.890, total: 60048.30 },
    { price: 67465.80, amount: 2.100, total: 141698.18 },
    { price: 67460.00, amount: 0.345, total: 23273.70 },
    { price: 67455.25, amount: 1.567, total: 105702.28 },
    { price: 67450.00, amount: 0.780, total: 52611.00 },
    { price: 67445.50, amount: 3.210, total: 216499.05 },
    { price: 67440.00, amount: 0.125, total: 8430.00 },
    { price: 67435.80, amount: 1.890, total: 127453.66 },
  ],
  bids: [
    { price: 67432.18, amount: 0.892, total: 60149.50 },
    { price: 67428.00, amount: 2.340, total: 157781.52 },
    { price: 67422.50, amount: 1.560, total: 105179.10 },
    { price: 67418.00, amount: 0.675, total: 45507.15 },
    { price: 67412.80, amount: 3.450, total: 232574.16 },
    { price: 67408.50, amount: 1.230, total: 82912.45 },
    { price: 67402.00, amount: 0.445, total: 29993.89 },
    { price: 67395.80, amount: 2.670, total: 179946.78 },
    { price: 67390.00, amount: 0.890, total: 59977.10 },
    { price: 67385.25, amount: 1.780, total: 119945.74 },
  ],
};

export const openOrders = [
  { id: "ORD-7842", pair: "BTC/USDT", type: "Limit", side: "Buy", price: 65000.00, amount: 0.5, filled: 0, total: 32500.00, date: "2026-07-18 14:32", status: "Open" },
  { id: "ORD-7843", pair: "ETH/USDT", type: "Limit", side: "Sell", price: 3800.00, amount: 5.0, filled: 2.5, total: 19000.00, date: "2026-07-18 13:15", status: "Partial" },
  { id: "ORD-7844", pair: "SOL/USDT", type: "Stop-Limit", side: "Buy", price: 170.00, amount: 20, filled: 0, total: 3400.00, date: "2026-07-18 11:45", status: "Open" },
  { id: "ORD-7845", pair: "ADA/USDT", type: "Limit", side: "Buy", price: 0.55, amount: 5000, filled: 0, total: 2750.00, date: "2026-07-17 22:10", status: "Open" },
  { id: "ORD-7846", pair: "DOT/USDT", type: "Market", side: "Sell", price: 8.45, amount: 100, filled: 100, total: 845.00, date: "2026-07-17 18:30", status: "Filled" },
  { id: "ORD-7847", pair: "LINK/USDT", type: "Limit", side: "Buy", price: 17.50, amount: 50, filled: 30, total: 875.00, date: "2026-07-17 16:20", status: "Partial" },
];

export const orderHistory = [
  { id: "ORD-7830", pair: "BTC/USDT", type: "Market", side: "Buy", price: 66800.00, amount: 0.25, total: 16700.00, date: "2026-07-16 10:15", status: "Filled", fee: 16.70 },
  { id: "ORD-7831", pair: "ETH/USDT", type: "Limit", side: "Sell", price: 3600.00, amount: 3.0, total: 10800.00, date: "2026-07-15 14:42", status: "Filled", fee: 10.80 },
  { id: "ORD-7832", pair: "SOL/USDT", type: "Limit", side: "Buy", price: 165.00, amount: 15, total: 2475.00, date: "2026-07-14 09:30", status: "Filled", fee: 2.48 },
  { id: "ORD-7833", pair: "DOGE/USDT", type: "Market", side: "Buy", price: 0.14, amount: 10000, total: 1400.00, date: "2026-07-13 16:55", status: "Filled", fee: 1.40 },
  { id: "ORD-7834", pair: "BTC/USDT", type: "Limit", side: "Sell", price: 68000.00, amount: 0.1, total: 6800.00, date: "2026-07-12 11:20", status: "Cancelled", fee: 0 },
  { id: "ORD-7835", pair: "AVAX/USDT", type: "Stop-Limit", side: "Sell", price: 40.00, amount: 25, total: 1000.00, date: "2026-07-11 08:45", status: "Filled", fee: 1.00 },
  { id: "ORD-7836", pair: "MATIC/USDT", type: "Limit", side: "Buy", price: 0.60, amount: 3000, total: 1800.00, date: "2026-07-10 13:10", status: "Filled", fee: 1.80 },
  { id: "ORD-7837", pair: "ETH/USDT", type: "Market", side: "Buy", price: 3450.00, amount: 2.0, total: 6900.00, date: "2026-07-09 17:25", status: "Filled", fee: 6.90 },
];

export const transactions = [
  { id: "TXN-4521", type: "Deposit", asset: "USDT", amount: 25000.00, status: "Completed", date: "2026-07-18 09:15", txHash: "0x8f3a...c4e2" },
  { id: "TXN-4520", type: "Withdrawal", asset: "BTC", amount: 0.5, status: "Completed", date: "2026-07-17 16:30", txHash: "bc1q...x8k2" },
  { id: "TXN-4519", type: "Deposit", asset: "ETH", amount: 5.0, status: "Completed", date: "2026-07-16 11:45", txHash: "0x1b2c...9f4d" },
  { id: "TXN-4518", type: "Withdrawal", asset: "USDT", amount: 10000.00, status: "Completed", date: "2026-07-15 14:20", txHash: "0x6d7e...3a1b" },
  { id: "TXN-4517", type: "Deposit", asset: "SOL", amount: 20.0, status: "Completed", date: "2026-07-14 08:55", txHash: "5K8j...mN2p" },
  { id: "TXN-4516", type: "Withdrawal", asset: "ETH", amount: 2.5, status: "Pending", date: "2026-07-18 15:10", txHash: "0x4e5f...7c8d" },
  { id: "TXN-4515", type: "Deposit", asset: "USDC", amount: 15000.00, status: "Completed", date: "2026-07-13 12:30", txHash: "0x9a0b...2e3f" },
  { id: "TXN-4514", type: "Withdrawal", asset: "SOL", amount: 10.0, status: "Completed", date: "2026-07-12 17:45", txHash: "3Rx7...kL9m" },
];

export const recentActivity = [
  { action: "Buy BTC", amount: "0.25 BTC", value: "$16,700", time: "2 hours ago", type: "trade" },
  { action: "Deposit USDT", amount: "25,000 USDT", value: "$25,000", time: "5 hours ago", type: "deposit" },
  { action: "Sell ETH", amount: "3.0 ETH", value: "$10,800", time: "1 day ago", type: "trade" },
  { action: "Withdraw BTC", amount: "0.5 BTC", value: "$33,716", time: "2 days ago", type: "withdrawal" },
  { action: "Buy SOL", amount: "15 SOL", value: "$2,475", time: "3 days ago", type: "trade" },
];
