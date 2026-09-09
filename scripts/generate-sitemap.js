# -*- coding: utf-8 -*-
import os

def generate_robots_txt():
    content = """User-agent: *
Allow: /
Sitemap: https://your-username.github.io/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
"""
    return content

def generate_sitemap_xml():
    # 注意：这里需要替换成实际的 GitHub Pages 域名
    base_url = "https://your-username.github.io"
    
    xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{base}/</loc>
    <lastmod>2026-09-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>{base}/about</loc>
    <lastmod>2026-09-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
""".format(base(base_url))
    
    return xml

if __name__ == "__main__":
    os.makedirs("dist", exist_ok=True)
    
    with open("dist/robots.txt", "w") as f:
        f.write(generate_robots_txt())
    
    with open("dist/sitemap.xml", "w") as f:
        f.write(generate_sitemap_xml())
    
    print("Generated robots.txt and sitemap.xml")
