$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktopPath = [Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktopPath 'HabitFlow.lnk'
$launcherPath = Join-Path $projectPath 'Start-HabitFlow.cmd'
$iconPath = Join-Path $projectPath 'public\habitflow.ico'

# Create a Windows icon using the same dark background and violet flame as the app logo.
Add-Type -AssemblyName System.Drawing
$bitmap = New-Object System.Drawing.Bitmap(256, 256)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.Clear([System.Drawing.Color]::FromArgb(8, 8, 36))
$backgroundBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(167, 139, 250))
$leafPoints = [System.Drawing.Point[]]@(
  (New-Object System.Drawing.Point(128, 38)),
  (New-Object System.Drawing.Point(166, 100)),
  (New-Object System.Drawing.Point(190, 154)),
  (New-Object System.Drawing.Point(128, 214)),
  (New-Object System.Drawing.Point(66, 154)),
  (New-Object System.Drawing.Point(90, 100))
)
$graphics.FillPolygon($backgroundBrush, $leafPoints)
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(245, 243, 255), 10)
$graphics.DrawLine($pen, 106, 174, 151, 117)
$icon = [System.Drawing.Icon]::FromHandle($bitmap.GetHicon())
$iconStream = [System.IO.File]::Create($iconPath)
$icon.Save($iconStream)
$iconStream.Dispose()
$icon.Dispose()
$pen.Dispose()
$backgroundBrush.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $launcherPath
$shortcut.WorkingDirectory = $projectPath
$shortcut.Description = 'Start HabitFlow habit tracker'
$shortcut.IconLocation = "$iconPath,0"
$shortcut.Save()

Write-Host "HabitFlow shortcut created on your Desktop."
