$ErrorActionPreference = "Stop"
$destDir = "c:\Users\Admin\Desktop\Online Auction Website\assets\images"
if (!(Test-Path -Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

function Download-Image {
    param([string]$url, [string]$filename)
    $path = Join-Path $destDir $filename
    if (!(Test-Path $path)) {
        Write-Host "Downloading $filename..."
        Invoke-WebRequest -Uri $url -OutFile $path -UserAgent "Mozilla/5.0"
    } else {
        Write-Host "Skipping $filename (exists)"
    }
}

function Copy-Local-Image {
    param([string]$source, [string]$filename)
    $path = Join-Path $destDir $filename
    if (Test-Path $source) {
        if (!(Test-Path $path)) {
            Write-Host "Copying $filename..."
            Copy-Item -Path $source -Destination $path
        } else {
             Write-Host "Skipping $filename (exists)"
        }
    } else {
        Write-Host "Warning: Source not found for $filename ($source)"
    }
}

# --- Copy Local Artifacts ---
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\73d24dd4-bad5-4c48-91c9-38642192d97d\royal_antique_1768024838626.png" "royal_antique.png"
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\73d24dd4-bad5-4c48-91c9-38642192d97d\classic_violin_1768024885622.png" "classic_violin.png"
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\73d24dd4-bad5-4c48-91c9-38642192d97d\space_memorabilia_1768024865389.png" "space_memorabilia.png"
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\9b01799b-96c1-46b2-8de5-07d44bd87fdd\jewelry_category_1768218953178.png" "jewelry_category.png"
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\73d24dd4-bad5-4c48-91c9-38642192d97d\electronics_category_1768024910870.png" "electronics_category.png"
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\73d24dd4-bad5-4c48-91c9-38642192d97d\vehicles_category_1768025068676.png" "vehicles_category.png"
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\9b01799b-96c1-46b2-8de5-07d44bd87fdd\art_category_1768218970875.png" "art_category.png"
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\9b01799b-96c1-46b2-8de5-07d44bd87fdd\furniture_category_1768218991928.png" "furniture_category.png"
Copy-Local-Image "C:\Users\Admin\.gemini\antigravity\brain\9b01799b-96c1-46b2-8de5-07d44bd87fdd\coins_category_1768219008201.png" "coins_category.png"

# --- Download External Images ---
# Unsplash Auction Items
Download-Image "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800" "rolex_daytona.jpg"
Download-Image "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800" "great_gatsby.jpg"
Download-Image "https://images.unsplash.com/photo-1547841243-eacb14453cd9?q=80&w=800" "bronze_sculpture.jpg"
Download-Image "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800" "workstation.jpg"
Download-Image "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=800" "gold_chronograph.jpg"
Download-Image "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800" "art_deco_sunlight.jpg"

# Additional About/Services images
Download-Image "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1200" "service_appraisal.jpg"
Download-Image "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200" "about_team.jpg"
Download-Image "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800" "team_ceo.jpg"
Download-Image "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=800" "team_product.jpg"
Download-Image "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800" "team_tech.jpg"

# Avatars
Download-Image "https://i.pravatar.cc/150?u=sarah" "avatar_sarah.jpg"
Download-Image "https://i.pravatar.cc/150?u=michael" "avatar_michael.jpg"
Download-Image "https://i.pravatar.cc/150?u=elena" "avatar_elena.jpg"
Download-Image "https://i.pravatar.cc/150?u=david" "avatar_david.jpg"
Download-Image "https://i.pravatar.cc/150?u=sophia" "avatar_sophia.jpg"
Download-Image "https://i.pravatar.cc/150?u=james" "avatar_james.jpg"
Download-Image "https://i.pravatar.cc/150?u=john" "avatar_john.jpg"
Download-Image "https://i.pravatar.cc/150?u=a" "avatar_admin_a.jpg"
Download-Image "https://i.pravatar.cc/150?u=b" "avatar_admin_b.jpg"
Download-Image "https://i.pravatar.cc/300?u=ceo" "avatar_ceo.jpg"
Download-Image "https://i.pravatar.cc/300?u=product" "avatar_product.jpg"
Download-Image "https://i.pravatar.cc/300?u=tech" "avatar_tech.jpg"
Download-Image "https://ui-avatars.com/api/?name=Admin+Root&background=DB2777&color=fff" "avatar_admin_root.png"

# Icons
Download-Image "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" "visa.svg"
Download-Image "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" "mastercard.svg"
Download-Image "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" "paypal.svg"

Write-Host "Image migration complete."
