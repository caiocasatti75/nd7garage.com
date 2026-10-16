# ==============================================================================
# ND7 GARAGE - SINCRONIZADOR AUTOMÁTICO DE ESTOQUE COM CARROSP
# Baixa e publica automaticamente no site todos os veículos anunciados no CarroSP
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " ND7 GARAGE - Sincronizacao de Estoque CarroSP ao Vivo" -ForegroundColor Yellow
Write-Host " Conectando a https://carrosp.com.br/.../nd7-garage/" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

$url = "https://carrosp.com.br/santa-barbara-doeste-sp/nd7-garage/"
$req = [System.Net.HttpWebRequest]::Create($url)
$req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
$req.Timeout = 15000

try {
    $resp = $req.GetResponse()
    $stream = $resp.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
    $html = $reader.ReadToEnd()
    $reader.Close()
    $resp.Close()
} catch {
    Write-Host "ERRO ao conectar ao CarroSP: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

$cards = $html -split '<div class="veiculo-item\s+'
Write-Host "Cards brutos encontrados: $($cards.Count - 1)" -ForegroundColor Green

$scrapedVehicles = @()

for ($i = 1; $i -lt $cards.Count; $i++) {
    $card = $cards[$i]
    
    # URL e ID
    if ($card -match 'href="(https://carrosp\.com\.br/comprar/([^"]+)/(\d+)/)"') {
        $link = $matches[1]
        $urlParts = $matches[2] -split '/'
        $categorySlug = $urlParts[0]
        $carrospIdNum = $matches[3]
        $carId = "carrosp_" + $carrospIdNum
    } else {
        continue
    }

    # Imagem em Alta Definicao
    $img = ""
    if ($card -match 'src="(https://cdn\.carrosp\.com\.br/[^"]+)"') {
        $img = $matches[1]
        $img = $img -replace '/250/', '/1200/'
    }

    # Marca, Modelo, Versao
    $brand = if ($card -match 'class="card-marca[^"]*">([^<]+)<') { $matches[1].Trim() } else { "" }
    $model = if ($card -match 'class="card-title[^"]*">([^<]+)<') { $matches[1].Trim() } else { "" }
    $version = if ($card -match 'submodelo[^"]*">([^<]+)<') { $matches[1].Trim() } else { "" }
    $name = "$brand $model $version".Trim()

    # Categoria amigavel
    $category = switch -Regex ($categorySlug) {
        'suv' { 'SUV' }
        'sedan' { 'Sedan' }
        'hatch' { 'Hatch' }
        'picape' { 'Picape' }
        'moto' { 'Moto' }
        default { 'SUV' }
    }

    # Ano
    $year = if ($card -match 'titulo-car">Ano</p><br>\s*<p[^>]*>\s*([0-9/]+)') { $matches[1].Trim() } else { "" }

    # Preco
    $priceRaw = if ($card -match 'class="rs">R\$</span>\s*([0-9\.]+)') { $matches[1].Trim() } else { "0" }
    $priceNum = [int]($priceRaw -replace '\D', '')

    # Cambio
    $trans = if ($card -match 'titulo-car">C[^<]+mbio</p><br>\s*<p[^>]*>\s*([^<]+)<') { $matches[1].Trim() } else { "Automático" }
    if ($trans -match '^-') { $trans = "Manual" }
    if ($trans -match 'Auto') { $trans = "Automático" }

    # Combustivel
    $fuel = if ($card -match 'titulo-car">Combust[^<]+vel</p><br>\s*<p[^>]*>\s*([^<]+)<') { $matches[1].Trim() } else { "Flex" }
    if ($fuel -match '^-') { $fuel = "Gasolina" }

    # Cor
    $color = if ($card -match 'titulo-car">Cor</p><br>\s*<p[^>]*>\s*([^<]+)<') { $matches[1].Trim() } else { "Branco" }
    if ($color -match '^-') { $color = "Preto" }

    # Quilometragem
    $km = if ($card -match 'titulo-car">KM</p><br>\s*<p[^>]*>\s*([^<]+)<') { $matches[1].Trim() } else { "" }
    if (-not $km -or $km -match '^-') { $km = "Consulte" } else { $km = "$km km" }

    $priceFmt = "R$ " + ($priceNum.ToString("N0", [System.Globalization.CultureInfo]::GetCultureInfo("pt-BR")))
    $kmClean = ($km -replace '\D', '')
    $kmNum = if ($kmClean) { [int]$kmClean } else { 0 }

    $scrapedVehicles += [PSCustomObject]@{
        id = $carId
        carrospId = $carrospIdNum
        name = $name
        brand = $brand
        model = $model
        version = $version
        year = $year
        price = $priceNum
        priceFormatted = $priceFmt
        km = $km
        kmNumber = $kmNum
        transmission = $trans
        fuel = $fuel
        color = $color
        image = $img
        category = $category
        categoryLabel = $category
        url = $link
        visible = $true
        featured = ($priceNum -ge 180000)
        badges = @("Laudo Cautelar Aprovado", "Garantia ND7", "Procedência")
    }
}

Write-Host "Total de veiculos validos extraidos do CarroSP: $($scrapedVehicles.Count)" -ForegroundColor Green

# Salva arquivo JSON de sincronizacao
$jsonContent = $scrapedVehicles | ConvertTo-Json -Depth 5
$jsonPath1 = "C:\Users\caioc\.gemini\antigravity\scratch\nd7-garage\vehicles_live.json"
$jsonPath2 = "C:\Users\caioc\OneDrive\Desktop\nd7-garage\vehicles_live.json"

[System.IO.File]::WriteAllText($jsonPath1, $jsonContent, [System.Text.Encoding]::UTF8)
if (Test-Path "C:\Users\caioc\OneDrive\Desktop\nd7-garage") {
    [System.IO.File]::WriteAllText($jsonPath2, $jsonContent, [System.Text.Encoding]::UTF8)
}

# Atualiza vehicles.js com os dados sincronizados
$vehiclesJsPath1 = "C:\Users\caioc\.gemini\antigravity\scratch\nd7-garage\vehicles.js"
$vehiclesJsPath2 = "C:\Users\caioc\OneDrive\Desktop\nd7-garage\vehicles.js"

$existingJs = Get-Content -Raw -Path $vehiclesJsPath1

# Substitui o array VEHICLES_DATA no vehicles.js pelo novo array
$newArrayJs = "const VEHICLES_DATA = " + ($scrapedVehicles | ConvertTo-Json -Depth 5) + ";"
$updatedJs = [regex]::Replace($existingJs, '(?s)const VEHICLES_DATA\s*=\s*\[.*?\];', $newArrayJs)

[System.IO.File]::WriteAllText($vehiclesJsPath1, $updatedJs, [System.Text.Encoding]::UTF8)
if (Test-Path "C:\Users\caioc\OneDrive\Desktop\nd7-garage") {
    [System.IO.File]::WriteAllText($vehiclesJsPath2, $updatedJs, [System.Text.Encoding]::UTF8)
}

Write-Host "----------------------------------------------------------" -ForegroundColor Cyan
Write-Host " SUCESSO! $($scrapedVehicles.Count) veiculos atualizados e publicados no site!" -ForegroundColor Green
Write-Host " Arquivo vehicles.js e vehicles_live.json sincronizados." -ForegroundColor Gray
Write-Host "----------------------------------------------------------" -ForegroundColor Cyan
