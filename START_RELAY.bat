@echo off
title BCA MT4 Relay - Lavish Gemz
echo Starting BCA MT4 Relay...
echo.
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0BCA_MT4_RELAY.ps1"
echo.
pause
