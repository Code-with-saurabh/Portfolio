Add-Type -AssemblyName System.Drawing

$public = Join-Path $PSScriptRoot "public"
$src = Join-Path $public "Saurabh.png"

$srcImg = [System.Drawing.Image]::FromFile($src)

function New-Canvas([int]$w, [int]$h) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $g.Clear([System.Drawing.Color]::FromArgb(0, 0, 0))
    return @($bmp, $g)
}

# ---------- 1. OG IMAGE 1200x630 ----------
$og = New-Canvas 1200 630
$ogBmp = $og[0]; $ogG = $og[1]

$photoH = 500
$photoW = [int]($srcImg.Width * $photoH / $srcImg.Height)
$photoX = [int]((1200 - $photoW) / 2)
$ogG.DrawImage($srcImg, $photoX, 0, $photoW, $photoH)

$titleFont = New-Object System.Drawing.Font("Segoe UI", 42, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$subFont = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center

$white = [System.Drawing.Brushes]::White
$gray = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 180, 180))
$yellow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(234, 179, 8))

$ogG.DrawString("Saurabh Sharma", $titleFont, $white, (New-Object System.Drawing.RectangleF(0, 512, 1200, 50)), $sf)
$mdot = [char]0xB7
$ogG.DrawString("Full Stack MERN Developer  $mdot  React  $mdot  Node.js  $mdot  saurabhsharma.is-a.dev", $subFont, $gray, (New-Object System.Drawing.RectangleF(0, 570, 1200, 34)), $sf)

$ogG.DrawLine((New-Object System.Drawing.Pen($yellow, 3)), 540, 505, 660, 505)

$ogBmp.Save((Join-Path $public "og-image.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$ogG.Dispose(); $ogBmp.Dispose()

# ---------- 2. SQUARE CROP (full height, centered horizontally) ----------
$squareW = $srcImg.Height
$squareX = [int](($srcImg.Width - $squareW) / 2)

function Get-Icon([int]$size, [bool]$opaque) {
    $fmt = if ($opaque) { [System.Drawing.Imaging.PixelFormat]::Format32bppRgb } else { [System.Drawing.Imaging.PixelFormat]::Format32bppArgb }
    $bmp = New-Object System.Drawing.Bitmap($size, $size, $fmt)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::FromArgb(0, 0, 0))
    $srcRect = New-Object System.Drawing.Rectangle($squareX, 0, $squareW, $squareW)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $g.DrawImage($srcImg, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    return $bmp
}

# apple-touch-icon (opaque, 180)
$ati = Get-Icon 180 $true
$ati.Save((Join-Path $public "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$ati.Dispose()

# manifest icons
$icon192 = Get-Icon 192 $true
$icon192.Save((Join-Path $public "icon-192.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$icon192.Dispose()

$icon512 = Get-Icon 512 $true
$icon512.Save((Join-Path $public "icon-512.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$icon512.Dispose()

# favicon pngs
$f32 = Get-Icon 32 $false
$f32.Save((Join-Path $public "favicon-32x32.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$f32.Dispose()

$f16 = Get-Icon 16 $false
$f16.Save((Join-Path $public "favicon-16x16.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$f16.Dispose()

# ---------- 3. favicon.ico (multi-size, PNG-encoded entries) ----------
$icoSizes = @(16, 32, 48)
$entries = @()
foreach ($s in $icoSizes) {
    $b = Get-Icon $s $false
    $ms = New-Object System.IO.MemoryStream
    $b.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $entries += , @{ w = $s; data = $ms.ToArray() }
    $b.Dispose()
}

$out = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($out)
$bw.Write([uint16]0)
$bw.Write([uint16]1)
$bw.Write([uint16]$entries.Count)

$offset = 6 + (16 * $entries.Count)
foreach ($e in $entries) {
    $bw.Write([byte]$e.w)
    $bw.Write([byte]$e.w)
    $bw.Write([byte]0)
    $bw.Write([byte]0)
    $bw.Write([uint16]1)
    $bw.Write([uint16]32)
    $bw.Write([uint32]$e.data.Length)
    $bw.Write([uint32]$offset)
    $offset += $e.data.Length
}
foreach ($e in $entries) { $bw.Write($e.data) }
$bw.Flush()
[System.IO.File]::WriteAllBytes((Join-Path $public "favicon.ico"), $out.ToArray())
$bw.Dispose(); $out.Dispose()

$srcImg.Dispose()

Write-Host "DONE: og-image.png, apple-touch-icon.png, icon-192.png, icon-512.png, favicon-16x16.png, favicon-32x32.png, favicon.ico"
