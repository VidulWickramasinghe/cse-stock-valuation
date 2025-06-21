const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { fetchTradeSummary } = require('./api/cseApi');
const { evaluateStock } = require('./evaluator');
const chalk = require('chalk');

const dividendData = {};

// Load dividend data into memory
function loadDividendData() {
  return new Promise((resolve) => {
    fs.createReadStream(path.join(__dirname, '../data/dividends.csv'))
      .pipe(csv())
      .on('data', row => {
        dividendData[row.symbol.toUpperCase()] = row;
      })
      .on('end', resolve);
  });
}

async function run() {
  await loadDividendData();

  const tradeData = await fetchTradeSummary();
  const filtered = tradeData.filter(stock => stock.symbol.endsWith('.N0000'));

  for (const stock of filtered) {
    const baseSymbol = stock.symbol.replace('.N0000', '');
    const dividends = dividendData[baseSymbol];

    if (!dividends) continue;

    const result = evaluateStock({
      dividends,
      price: stock.price,
      percentageChange: stock.percentageChange
    });

    console.log(
      `${chalk.yellow(stock.symbol)} - ${stock.name} | Price: ${stock.price} | ${chalk.green(result)}`
    );
  }
}

run();