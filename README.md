# 📈 CSE Stock Valuation App

A Node.js-based CLI tool for evaluating stocks listed on the Colombo Stock Exchange (CSE) using historical dividend data and current market prices.

---

## 🚀 Features

- ✅ Fetches live trade summaries from CSE API.
- 📊 Loads and uses historical dividend data from CSV.
- 📈 Evaluates stocks using custom logic (dividend average, price trend).
- 🧠 Outputs valuation summary with indicators (overvalued, undervalued, etc.).
- 📁 Exports a detailed valuation report as a CSV file.

---

## 🛠️ Tech Stack

- Node.js
- `csv-parser` for reading CSV data
- `json2csv` for generating CSV reports
- `chalk` for colored terminal output
- Custom CSE API integration

---

## 📂 Project Structure

```
cse-stock-valuation/
├── data/
│ └── dividends.csv # Historical dividend data
├── output/
│ └── valuation_report.csv # Generated report
├── src/
│ ├── index.js # Main runner script
│ ├── api/
│ │ └── cseApi.js # Fetch trade summary from CSE
│ ├── evaluator.js # Core evaluation logic
├── package.json
├── .env
└── README.md
```

## 📥 Installation

1. Clone the repo:

```bash
git clone https://github.com/VirajMadhu/cse-stock-valuation.git
cd cse-stock-valuation
```

2. Install dependencies:

```
pnpm install
```

3. Add your dividend data:
- Place a file named dividends.csv inside the data/ folder. 
- It should have the following columns:

```
symbol,2021,2022,2023,2024,2025
ABC,2.00,2.10,2.15,2.30,2.50
DEF,1.00,1.20,1.30,1.10,0.90
...

```

4. Make .env file using .env.example file

## ▶️ Usage
Run the script:
```
pnpm dev
```

✅ A valuation summary will be printed in your terminal.

📁 A CSV file named valuation_report.csv will be generated in the output/ folder.

## 📌 Evaluation Logic

- Calculate average dividend over the past 5 years (2021–2025).
- If average dividend is 0 → 🟥 Not worth (no dividends).
- If current price > average dividend × 15 → 🟨 Overvalued.
- If today's percentage change < -2% → 🟧 Price dropping.
- Otherwise → 🟩 Worth considering.

## 📌 Notes

- This is not financial advice — it's a simple scoring rule based on historical yield.

- You can enhance this logic by adding dividend trends, price ratios, P/E, or even machine learning.

## 🧠 To-Do / Improvements

- Include P/E, P/B, and ROE ratios
- Add trend-based scoring (dividend growth, price movement)
- Visualize data (bar/line charts)
- Web dashboard version (future scope)
- Export to Excel with styling

## 🪪 License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License.