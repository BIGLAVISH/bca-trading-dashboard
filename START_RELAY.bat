@echo off
set /p URL=Paste your Netlify site URL, then press Enter: 
powershell -ExecutionPolicy Bypass -File "%~dp0BCA_MT4_RELAY.ps1" -NetlifyUrl "%URL%"
pause
