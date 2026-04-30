param(
  [Parameter(Mandatory=$true)][string]$NetlifyUrl,
  [string]$SignalFile = "$env:APPDATA\MetaQuotes\Terminal\Common\Files\bca_signal.txt",
  [int]$PollSeconds = 2
)
Write-Host "BCA MT4 Relay running..." -ForegroundColor Green
Write-Host "Polling: $NetlifyUrl/.netlify/functions/latest"
Write-Host "Writing: $SignalFile"
New-Item -ItemType Directory -Force -Path (Split-Path $SignalFile) | Out-Null
$lastId = ""
while($true){
  try{
    $s = Invoke-RestMethod -Uri ($NetlifyUrl.TrimEnd('/') + '/.netlify/functions/latest') -UseBasicParsing
    if($s.id -and $s.id -ne $lastId){
      $cmd = $s.action
      if($s.sl){$cmd += "|SL=$($s.sl)"}
      if($s.tp){$cmd += "|TP=$($s.tp)"}
      if($s.lot){$cmd += "|LOT=$($s.lot)"}
      Set-Content -Path $SignalFile -Value $cmd -Encoding ASCII
      Add-Content -Path (Join-Path (Split-Path $SignalFile) 'bca_relay_log.csv') -Value ('"{0}","{1}","{2}","{3}"' -f (Get-Date).ToString('s'),$s.action,$s.symbol,$cmd)
      Write-Host "Wrote signal: $cmd" -ForegroundColor Cyan
      $lastId = $s.id
    }
  } catch { Write-Host "Relay error: $($_.Exception.Message)" -ForegroundColor Yellow }
  Start-Sleep -Seconds $PollSeconds
}
