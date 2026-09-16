$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktopPath = [Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktopPath 'HabitFlow.lnk'
$launcherPath = Join-Path $projectPath 'Start-HabitFlow.cmd'
$iconPath = Join-Path $projectPath 'public\habitflow.ico'

# Create a Windows icon using the same dark background and lime leaf as the app logo.
Add-Type -AssemblyName System.Drawing
$bitmap = New-Object System.Drawing.Bitmap(256, 256)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.Clear([System.Drawing.Color]::FromArgb(15, 23, 42))
$backgroundBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 242, 100))
$leafPoints = [System.Drawing.Point[]]@(
  (New-Object System.Drawing.Point(54, 142)),
  (New-Object System.Drawing.Point(118, 118)),
  (New-Object System.Drawing.Point(174, 74)),
  (New-Object System.Drawing.Point(184, 146)),
  (New-Object System.Drawing.Point(126, 204))
)
$graphics.FillPolygon($backgroundBrush, $leafPoints)
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(236, 252, 203), 12)
$graphics.DrawLine($pen, 64, 190, 174, 92)
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
