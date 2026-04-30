import { AccountSummary, Agent, DataLabMetrics, ExecutionFlow, MarketAsset, Position, RiskMetrics, Strategy, WatchlistItem } from './types';

export const accountSummary: AccountSummary = { equity: 1842701.42, pnl24h: 47842.18, marginUsed: 352118.44, available: 1490582.98, risk: 23.7, latencyMs: 16 };
export const watchlist: WatchlistItem[] = [
  { symbol: 'BTC-PERP', price: 104892.1, change24h: 2.35 },
  { symbol: 'ETH-PERP', price: 3642.18, change24h: 2.11 },
  { symbol: 'SOL-PERP', price: 170.35, change24h: 4.27 },
  { symbol: 'ARB-PERP', price: 1.1327, change24h: -0.47 },
  { symbol: 'LINK-PERP', price: 16.852, change24h: 1.19 }
];
export const marketAssets: MarketAsset[] = watchlist.map((w, i) => ({ symbol:w.symbol, price:w.price, change24h:w.change24h, change7d:[5.9,4.8,12.3,1.6,2.4][i], change30d:[18.4,14.2,27.5,-2.1,8.9][i], volume:[8720000000,3190000000,1180000000,226000000,744000000][i], marketCap:[2050000000000,438000000000,79100000000,4100000000,10200000000][i], tvl:[0,0,6200000000,880000000,3200000000][i], aiSignalScore:[82,77,86,43,69][i], trendSparkline:[62,64,65,68,67,69,71,72,74] }));
export const positions: Position[] = [
  { market:'BTC-PERP', side:'LONG', size:2.25, sizeUnit:'BTC', entryPrice:103201.8, markPrice:104892.1, pnl:3803.21, pnlPercent:1.64, liquidationPrice:93214.7, margin:15412.23, tp:105800, sl:98500, agent:'ALPHA-7' },
  { market:'ETH-PERP', side:'LONG', size:15, sizeUnit:'ETH', entryPrice:3201.67, markPrice:3642.18, pnl:6606.75, pnlPercent:2.89, liquidationPrice:2845.1, margin:9845.21, tp:3850, sl:3050, agent:'ALPHA-7' }
];
export const agents: Agent[] = [
  { name:'ALPHA-7', walletShort:'0xA71...3e21', strategy:'Trend-Follow v2', chain:'Solana', tvl:12500000, return30d:18.72, winRate:68.4, sharpe:2.87, drawdown:6.21, status:'Active', performanceSparkline:[42,44,43,46,48,47,50,53,58] }
];
export const strategies: Strategy[] = [
  { name:'Trend-Follow v2', type:'Momentum', markets:['BTC-PERP','ETH-PERP'], timeframe:'15m', pnl:11622.67, returnPct:2.46, winRate:68.4, sharpe:2.31, drawdown:6.21, status:'Running' }
];
export const riskMetrics: RiskMetrics = { var24h:68421.32, expectedShortfall:94221.14, maxDrawdown:6.21, effectiveLeverage:15, liquidationRisk:23.7, correlationMatrix:{ labels:['BTC','ETH','SOL'], values:[[1,0.86,0.74],[0.86,1,0.79],[0.74,0.79,1]] }, stressTests:[{scenario:'-15% BTC shock',pnlImpact:-94211,riskAfter:31.6},{scenario:'Funding spike',pnlImpact:-18400,riskAfter:27.2}], riskAlerts:[{severity:'MEDIUM',message:'SOL-PERP funding elevated'},{severity:'HIGH',message:'ARB liquidity thinning'}] };
export const dataLabMetrics: DataLabMetrics = { onChainTps:4285, activeAddresses:1820000, derivativesOi:2810000000, fundingRate:0.0031, liquidityScore:76.3, volatilityIndex:41.8, dataFeeds:[{name:'Binance Perps',status:'Live'},{name:'Bybit L2',status:'Live'},{name:'On-chain Oracle',status:'Lagging'}], recentQueries:[{query:'funding_rate zscore sol-perp',time:'15:42:21'},{query:'btc oi/liquidity divergence',time:'15:38:10'}] };
export const executionFlow: ExecutionFlow = { selectedAgent:'ALPHA-7', selectedStrategy:'Trend-Follow v2', direction:'LONG', confidence:82, entryZone:[104820,104910], stopLoss:98500, takeProfit:105800, expectedR:2.1, slippageEstimate:0.06, fees:124.45, portfolioRiskChange:1.3 };
