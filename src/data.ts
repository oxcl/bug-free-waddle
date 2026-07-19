export const coins = [
  { name: "Tether", symbol: "USDT", price: 1.0, change: 0.01, volume: "52.1B", marketCap: "112.4B", color: "#26a17b", gradient: "linear-gradient(135deg, #26a17b, #3ddc97)", holdings: 2143.63, avgBuy: 1.0 },
];

export const notifications = [
  { id: 1, title: "KYC Verification Required", message: "Please complete your identity verification to continue using withdrawal services. Mandatory since June 2026.", time: "10 min ago", read: false, type: "warning" as const },
  { id: 2, title: "Deposit Confirmed", message: "1,100 USDT has been credited to your account from an external transfer.", time: "5 days ago", read: true, type: "info" as const },
  { id: 3, title: "Deposit Confirmed", message: "1,043 USDT has been credited to your account.", time: "65 days ago", read: true, type: "info" as const },
  { id: 4, title: "Deposit Confirmed", message: "1,080 USDT has been credited to your account.", time: "95 days ago", read: true, type: "info" as const },
  { id: 5, title: "Withdrawal Completed", message: "Your withdrawal of 1,080 USDT has been processed successfully.", time: "93 days ago", read: true, type: "success" as const },
  { id: 6, title: "Deposit Confirmed", message: "1,025 USDT has been credited to your account.", time: "125 days ago", read: true, type: "info" as const },
  { id: 7, title: "Withdrawal Completed", message: "Your withdrawal of 1,025 USDT has been processed successfully.", time: "124 days ago", read: true, type: "success" as const },
];

export const portfolioHistory = {
  "1W": [
    { date: "Mon", value: 2143 },
    { date: "Tue", value: 2143 },
    { date: "Wed", value: 2143 },
    { date: "Thu", value: 2143 },
    { date: "Fri", value: 2143 },
    { date: "Sat", value: 2143 },
    { date: "Sun", value: 2143 },
  ],
  "1M": [
    { date: "Jun 19", value: 1043 },
    { date: "Jun 22", value: 1043 },
    { date: "Jun 25", value: 1043 },
    { date: "Jun 28", value: 1043 },
    { date: "Jul 1", value: 1043 },
    { date: "Jul 4", value: 1043 },
    { date: "Jul 7", value: 1043 },
    { date: "Jul 10", value: 1043 },
    { date: "Jul 13", value: 1043 },
    { date: "Jul 16", value: 2143 },
    { date: "Jul 19", value: 2143 },
  ],
  "3M": [
    { date: "Apr", value: 0 },
    { date: "Apr", value: 0 },
    { date: "May", value: 0 },
    { date: "May", value: 1043 },
    { date: "May", value: 1043 },
    { date: "Jun", value: 1043 },
    { date: "Jun", value: 1043 },
    { date: "Jun", value: 1043 },
    { date: "Jul", value: 1043 },
    { date: "Jul", value: 2143 },
    { date: "Jul", value: 2143 },
  ],
  "1Y": [
    { date: "Aug", value: 0 },
    { date: "Sep", value: 0 },
    { date: "Oct", value: 0 },
    { date: "Nov", value: 0 },
    { date: "Dec", value: 0 },
    { date: "Jan", value: 0 },
    { date: "Feb", value: 0 },
    { date: "Mar", value: 0 },
    { date: "Apr", value: 0 },
    { date: "May", value: 1043 },
    { date: "Jun", value: 1043 },
    { date: "Jul", value: 2143 },
  ],
  "ALL": [
    { date: "Jan '25", value: 0 },
    { date: "Apr '25", value: 0 },
    { date: "Jul '25", value: 0 },
    { date: "Oct '25", value: 0 },
    { date: "Jan '26", value: 0 },
    { date: "Apr '26", value: 0 },
    { date: "Jul '26", value: 2143 },
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

export const openOrders = [];

export const orderHistory = [];

export const transactions = [
  { id: "TXN-4521", type: "Deposit", asset: "USDT", amount: 1100.00, status: "Completed", date: "2026-07-14 09:15", txHash: "0x8f3a...c4e2" },
  { id: "TXN-4520", type: "Deposit", asset: "USDT", amount: 1043.00, status: "Completed", date: "2026-05-14 08:55", txHash: "0x1b2c...9f4d" },
  { id: "TXN-4519", type: "Deposit", asset: "USDT", amount: 1080.00, status: "Completed", date: "2026-04-14 09:10", txHash: "0x3a4b...5c6d" },
  { id: "TXN-4518", type: "Withdrawal", asset: "USDT", amount: 1080.00, status: "Completed", date: "2026-04-16 14:22", txHash: "0x7e8f...9a0b" },
  { id: "TXN-4517", type: "Deposit", asset: "USDT", amount: 1025.00, status: "Completed", date: "2026-03-14 08:45", txHash: "0x1c2d...3e4f" },
  { id: "TXN-4516", type: "Withdrawal", asset: "USDT", amount: 1025.00, status: "Completed", date: "2026-03-15 11:30", txHash: "0x5a6b...7c8d" },
  { id: "TXN-4515", type: "Deposit", asset: "USDT", amount: 1100.00, status: "Completed", date: "2026-02-14 09:20", txHash: "0x9e0f...1a2b" },
  { id: "TXN-4514", type: "Withdrawal", asset: "USDT", amount: 1100.00, status: "Completed", date: "2026-02-16 13:15", txHash: "0x3c4d...5e6f" },
  { id: "TXN-4513", type: "Deposit", asset: "USDT", amount: 980.00, status: "Completed", date: "2026-01-14 08:30", txHash: "0x7g8h...9i0j" },
  { id: "TXN-4512", type: "Withdrawal", asset: "USDT", amount: 980.00, status: "Completed", date: "2026-01-15 10:45", txHash: "0x1k2l...3m4n" },
  { id: "TXN-4511", type: "Deposit", asset: "USDT", amount: 1050.00, status: "Completed", date: "2025-12-14 09:00", txHash: "0x5o6p...7q8r" },
  { id: "TXN-4510", type: "Withdrawal", asset: "USDT", amount: 1050.00, status: "Completed", date: "2025-12-16 12:00", txHash: "0x9s0t...1u2v" },
  { id: "TXN-4509", type: "Deposit", asset: "USDT", amount: 1000.00, status: "Completed", date: "2025-11-14 08:15", txHash: "0x3w4x...5y6z" },
  { id: "TXN-4508", type: "Withdrawal", asset: "USDT", amount: 1000.00, status: "Completed", date: "2025-11-16 11:00", txHash: "0x7a8b...9c0d" },
];

export const recentActivity = [
  { action: "USDT Deposit", amount: "1,100 USDT", value: "$1,100", time: "5 days ago", type: "deposit" as const },
  { action: "USDT Deposit", amount: "1,043 USDT", value: "$1,043", time: "66 days ago", type: "deposit" as const },
  { action: "USDT Withdrawal", amount: "1,080 USDT", value: "$1,080", time: "94 days ago", type: "withdrawal" as const },
  { action: "USDT Deposit", amount: "1,080 USDT", value: "$1,080", time: "96 days ago", type: "deposit" as const },
  { action: "USDT Withdrawal", amount: "1,025 USDT", value: "$1,025", time: "126 days ago", type: "withdrawal" as const },
  { action: "USDT Deposit", amount: "1,025 USDT", value: "$1,025", time: "127 days ago", type: "deposit" as const },
  { action: "USDT Withdrawal", amount: "1,100 USDT", value: "$1,100", time: "155 days ago", type: "withdrawal" as const },
  { action: "USDT Deposit", amount: "1,100 USDT", value: "$1,100", time: "157 days ago", type: "deposit" as const },
  { action: "USDT Withdrawal", amount: "980 USDT", value: "$980", time: "187 days ago", type: "withdrawal" as const },
  { action: "USDT Deposit", amount: "980 USDT", value: "$980", time: "188 days ago", type: "deposit" as const },
];
