export const coins = [
  { name: "Tether", symbol: "USDT", price: 1.0, change: 0.01, volume: "52.1B", marketCap: "112.4B", color: "#26a17b", gradient: "linear-gradient(135deg, #26a17b, #3ddc97)", holdings: 2148.63, avgBuy: 1.0 },
  { name: "Bitcoin", symbol: "BTC", price: 67432.18, change: 2.45, volume: "28.5B", marketCap: "1.32T", color: "#f7931a", gradient: "linear-gradient(135deg, #f7931a, #f59e0b)", holdings: 0.0042, avgBuy: 64200.00 },
  { name: "Ethereum", symbol: "ETH", price: 3521.67, change: 1.82, volume: "15.2B", marketCap: "423.1B", color: "#627eea", gradient: "linear-gradient(135deg, #627eea, #818cf8)", holdings: 0.18, avgBuy: 3280.00 },
  { name: "Solana", symbol: "SOL", price: 178.93, change: 5.67, volume: "4.8B", marketCap: "78.3B", color: "#9945ff", gradient: "linear-gradient(135deg, #9945ff, #c084fc)", holdings: 1.5, avgBuy: 165.00 },
];

export const notifications = [
  { id: 1, title: "KYC Verification Required", message: "Please complete your identity verification to continue using withdrawal services. Mandatory since June 2026.", time: "10 min ago", read: false, type: "warning" as const },
  { id: 2, title: "Withdrawal Completed", message: "Your withdrawal of 1,050 USDT has been processed and sent to your external wallet.", time: "2 days ago", read: true, type: "success" as const },
  { id: 3, title: "Deposit Confirmed", message: "1,120 USDT has been credited to your account from an external transfer.", time: "5 days ago", read: true, type: "info" as const },
  { id: 4, title: "Withdrawal Completed", message: "Your withdrawal of 980 USDT has been processed successfully.", time: "12 days ago", read: true, type: "success" as const },
  { id: 5, title: "Deposit Confirmed", message: "1,075 USDT has been credited to your account.", time: "15 days ago", read: true, type: "info" as const },
  { id: 6, title: "Withdrawal Completed", message: "Your withdrawal of 1,100 USDT has been processed successfully.", time: "20 days ago", read: true, type: "success" as const },
  { id: 7, title: "Deposit Confirmed", message: "1,025 USDT has been credited to your account.", time: "25 days ago", read: true, type: "info" as const },
];

export const portfolioHistory = {
  "1W": [
    { date: "Mon", value: 3380 },
    { date: "Tue", value: 3410 },
    { date: "Wed", value: 3395 },
    { date: "Thu", value: 3445 },
    { date: "Fri", value: 3420 },
    { date: "Sat", value: 3458 },
    { date: "Sun", value: 3460 },
  ],
  "1M": [
    { date: "Jun 19", value: 3210 },
    { date: "Jun 22", value: 3245 },
    { date: "Jun 25", value: 3180 },
    { date: "Jun 28", value: 3290 },
    { date: "Jul 1", value: 3320 },
    { date: "Jul 4", value: 3355 },
    { date: "Jul 7", value: 3310 },
    { date: "Jul 10", value: 3380 },
    { date: "Jul 13", value: 3420 },
    { date: "Jul 16", value: 3445 },
    { date: "Jul 19", value: 3460 },
  ],
  "3M": [
    { date: "Apr", value: 2980 },
    { date: "Apr", value: 3020 },
    { date: "May", value: 3080 },
    { date: "May", value: 3050 },
    { date: "May", value: 3120 },
    { date: "Jun", value: 3150 },
    { date: "Jun", value: 3210 },
    { date: "Jun", value: 3180 },
    { date: "Jul", value: 3290 },
    { date: "Jul", value: 3380 },
    { date: "Jul", value: 3460 },
  ],
  "1Y": [
    { date: "Aug", value: 1150 },
    { date: "Sep", value: 1320 },
    { date: "Oct", value: 1480 },
    { date: "Nov", value: 1650 },
    { date: "Dec", value: 1580 },
    { date: "Jan", value: 1890 },
    { date: "Feb", value: 2100 },
    { date: "Mar", value: 2340 },
    { date: "Apr", value: 2680 },
    { date: "May", value: 2980 },
    { date: "Jun", value: 3210 },
    { date: "Jul", value: 3460 },
  ],
  "ALL": [
    { date: "Jan '25", value: 1050 },
    { date: "Apr '25", value: 1380 },
    { date: "Jul '25", value: 1820 },
    { date: "Oct '25", value: 2240 },
    { date: "Jan '26", value: 2680 },
    { date: "Apr '26", value: 3120 },
    { date: "Jul '26", value: 3460 },
  ],
};

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
  { id: "TXN-4521", type: "Deposit", asset: "USDT", amount: 1120.00, status: "Completed", date: "2026-07-14 09:15", txHash: "0x8f3a...c4e2" },
  { id: "TXN-4520", type: "Withdrawal", asset: "USDT", amount: 1050.00, status: "Blocked", date: "2026-07-12 14:30", txHash: "—" },
  { id: "TXN-4519", type: "Deposit", asset: "USDT", amount: 1075.00, status: "Completed", date: "2026-06-14 08:55", txHash: "0x1b2c...9f4d" },
  { id: "TXN-4518", type: "Withdrawal", asset: "USDT", amount: 980.00, status: "Completed", date: "2026-06-12 11:20", txHash: "0x6d7e...3a1b" },
  { id: "TXN-4517", type: "Deposit", asset: "USDT", amount: 1025.00, status: "Completed", date: "2026-05-14 10:30", txHash: "5K8j...mN2p" },
  { id: "TXN-4516", type: "Withdrawal", asset: "USDT", amount: 1100.00, status: "Completed", date: "2026-05-12 09:45", txHash: "0x4e5f...7c8d" },
  { id: "TXN-4515", type: "Deposit", asset: "USDT", amount: 1050.00, status: "Completed", date: "2026-04-14 08:20", txHash: "0x9a0b...2e3f" },
  { id: "TXN-4514", type: "Withdrawal", asset: "USDT", amount: 1025.00, status: "Completed", date: "2026-04-12 11:10", txHash: "3Rx7...kL9m" },
];

export const recentActivity = [
  { action: "Monthly USDT Deposit", amount: "1,120 USDT", value: "$1,120", time: "5 days ago", type: "deposit" as const },
  { action: "Withdrawal Blocked", amount: "1,050 USDT", value: "$1,050", time: "7 days ago", type: "withdrawal" as const },
  { action: "Monthly USDT Deposit", amount: "1,075 USDT", value: "$1,075", time: "35 days ago", type: "deposit" as const },
  { action: "Withdrawal Completed", amount: "980 USDT", value: "$980", time: "37 days ago", type: "withdrawal" as const },
  { action: "Monthly USDT Deposit", amount: "1,025 USDT", value: "$1,025", time: "65 days ago", type: "deposit" as const },
];
