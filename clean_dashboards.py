import re
import os

files = [
    r's:\JanBatch\OnlineAuction\admin-dashboard.html',
    r's:\JanBatch\OnlineAuction\user-dashboard.html'
]

def clean_file(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # 1. Remove the entire <nav class="nav-menu">...</nav> block
    content = re.sub(r'<nav class="nav-menu">.*?</nav>', '<!-- Simplified Navbar -->', content, flags=re.DOTALL)
    
    # 2. Remove the auth buttons block
    content = re.sub(r'<div class="auth-buttons flex hide-mobile"[^>]*>.*?</div>', '', content, flags=re.DOTALL)
    
    # 3. Remove the entire footer block
    content = re.sub(r'<footer class="footer"[^>]*>.*?</footer>', '<!-- Footer Removed -->', content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully cleaned: {filepath}")

for f in files:
    clean_file(f)
