export const formatCurrency = (value: number, digits = 2) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

export const formatPercent = (value: number, digits = 2) => `${value >= 0 ? '+' : ''}${value.toFixed(digits)}%`;

export const formatNumber = (value: number, digits = 2) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

export const formatCompact = (value: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value);

export const valueToneClass = (value: number) => (value > 0 ? 'text-accent-green' : value < 0 ? 'text-accent-red' : 'text-text-muted');
