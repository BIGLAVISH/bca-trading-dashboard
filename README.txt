BCA TradingView -> Netlify/GitHub -> MT4 Package

1) Upload this folder to a new GitHub repo.
2) Netlify: Add new site -> Import from GitHub -> Deploy.
3) Open the Netlify site. Copy the Webhook URL.
4) TradingView alert webhook URL: paste that Webhook URL.
5) TradingView alert message examples:
   BUY
   SELL
   CLOSE
   BUY|SL=300|TP=600|LOT=0.01
   SELL|SL=300|TP=600|LOT=0.01

6) MT4: open MetaEditor, create EA, paste mt4/BCA_MT4_AUTO_EXECUTION_EA_V1.mq4, compile.
7) Add EA to your demo chart. Enable AutoTrading.
8) On Windows, double-click relay/START_RELAY.bat and paste your Netlify site URL.

The relay polls Netlify and writes to:
%APPDATA%\MetaQuotes\Terminal\Common\Files\bca_signal.txt

Smoke test:
- Dashboard loads.
- Functions respond.
- Relay script exists.
- MT4 EA source included.
