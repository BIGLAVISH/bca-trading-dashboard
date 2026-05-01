$DashboardLatestUrl = "https://bca-trading-dashboard.netlify.app/.netlify/functions/latest"
$SignalFileName = "bca_signal.txt"

$common = Join-Path $env:APPDATA "MetaQuotes\Terminal\Common\Files"

if (!(Test-Path $common)) {
  New-Item -ItemType Directory -Force -Path $common | Out-Null
}

$outFile = Join-Path $common $SignalFileName
$lastId = ""

Write-Host "BCA MT4 Relay Running..."
Write-Host "Reading: $DashboardLatestUrl"
Write-Host "Writing: $outFile"

while ($true) {
  try {
    $data = Invoke-RestMethod -Uri $DashboardLatestUrl -Method GET -TimeoutSec 10

    if ($data -and $data.Count -gt 0) {
      $s = $data[0]

      if ($s.id -ne $lastId) {

        $action = "$($s.action)".ToUpper()
        $lot = if ($s.lot) { $s.lot } else { "0.01" }
        $sl = if ($s.sl) { $s.sl } else { "" }
        $tp = if ($s.tp) { $s.tp } else { "" }

        if ($action -eq "BUY" -or $action -eq "SELL" -or $action -eq "CLOSE" -or $action -eq "CLOSEBUY" -or $action -eq "CLOSESELL") {

          $line = "$action|LOT=$lot"

          if ($sl -ne "") { $line += "|SL=$sl" }
          if ($tp -ne "") { $line += "|TP=$tp" }

          Set-Content -Path $outFile -Value $line -Encoding ASCII

          Write-Host "$(Get-Date) -> $line"

          $lastId = $s.id
        }
      }
    }

  } catch {
    Write-Host "Waiting for dashboard signal..."
  }

  Start-Sleep -Seconds 2
}
