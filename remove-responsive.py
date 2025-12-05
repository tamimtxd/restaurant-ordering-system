import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove all Tailwind responsive utility classes (sm:, md:, lg:, xl:, 2xl:)
# This regex finds space followed by responsive prefix and removes it
content = re.sub(r'\s+(sm|md|lg|xl|2xl):[^\s"]+', '', content)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Removed all responsive Tailwind utilities (sm:, md:, lg:, xl:, 2xl:)")
