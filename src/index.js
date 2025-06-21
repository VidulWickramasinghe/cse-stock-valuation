const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { fetchTradeSummary } = require('./api/cseApi');
const { evaluateStock } = require('./evaluator');
const chalk = require('chalk');
const { Parser } = require('json2csv');

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

    const results = [];

    for (const stock of filtered) {
        const baseSymbol = stock.symbol.replace('.N0000', '');
        const dividends = dividendData[baseSymbol];

        if (!dividends) continue;

        const result = evaluateStock({
            dividends,
            price: stock.price,
            percentageChange: stock.percentageChange
        });

        // Log to terminal
        console.log(
            `${chalk.yellow(stock.symbol)} - ${stock.name} | Price: ${stock.price} | ${chalk.green(result)}`
        );

        // Prepare for CSV
        results.push({
            symbol: stock.symbol,
            name: stock.name,
            price: stock.price,
            percentageChange: stock.percentageChange,
            dividend_2025: dividends['2025'],
            dividend_2024: dividends['2024'],
            dividend_2023: dividends['2023'],
            dividend_2022: dividends['2022'],
            dividend_2021: dividends['2021'],
            evaluation: result
        });
    }

    // Write to CSV
    const outputPath = path.join(__dirname, '../output/valuation_report.csv');
    const parser = new Parser();
    const csvOutput = parser.parse(results);
    fs.writeFileSync(outputPath, csvOutput);

    console.log(chalk.cyan(`\n✅ Valuation report saved to ${outputPath}`));
}

run();