function evaluateStock({ dividends, price, percentageChange }) {
  const years = ['2025', '2024', '2023', '2022', '2021'];
  const values = years.map(year => parseFloat(dividends[year]) || 0);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  if (avg === 0) return '🟥 Not worth (no dividends)';
  if (price > avg * 15) return '🟨 Overvalued';
  if (percentageChange < -2) return '🟧 Price dropping';
  return '🟩 Worth considering';
}

module.exports = { evaluateStock };