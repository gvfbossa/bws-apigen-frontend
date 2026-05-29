# 🚀 BWS APIGEN - Deployment Guide

This document explains how to build and deploy the BWS APIGEN frontend to Firebase Hosting and configure a custom domain.

---

# 📦 1. Prerequisites

Before deploying, make sure you have:

- Node.js installed
- Firebase CLI installed:
```bash
npm install -g firebase-tools

Logged into Firebase:

firebase login

# 📁 2. Project Build

This project is built using Angular.

To generate the production build, add to package.json a new run script:
`"deploy": "rm -rf dist/ && ng build --configuration production && cp src/sitemap.xml dist/bws-apigen/ && cp src/robots.txt dist/bws-apigen/ && firebase deploy"`

This will generate the /dist folder.

# 🔥 3. Initialize Firebase (first time only)
If Firebase is not yet initialized:

`firebase init`

Select:

Hosting
Use existing project (bws-apigen)
Public directory: dist/<your-project-name>
Configure as SPA: Yes
Set up automatic builds: No (optional)

# 🚀 4. Deploy to Firebase Hosting

After build:

`firebase deploy`

Your app will be available at:

`https://bws-apigen.web.app/`

# 🌐 5. Custom Domain Setup

Step 1 - Add domain in Firebase

Go to:
Firebase Console → Hosting → Add custom domain

Follow the instructions provided by Firebase to enter the domain on Registro.br

Step 2 - Configure DNS (Registro.br)

Go to your domain provider (Registro.br) and add the records provided by Firebase:

TXT record (verification)
Type: TXT
Name: bwsapigen
Value: google-site-verification=xxxxxxx
A record (hosting)
Type: A
Name: bwsapigen
Value: (provided by Firebase)
Optional CNAME (www)
Type: CNAME
Name: www.bwsapigen
Value: ghs.googlehosted.com
Step 3 - Wait for verification

DNS propagation may take from 5 minutes to 24 hours.

Firebase will automatically:

verify domain ownership
issue SSL certificate (HTTPS)

# 6. sitemap.xml and robots.txt

After the domain is registered properly, you have to create 2 files on src/: sitemap.xml and robots.txt with the following contents:

sitemap.xml:

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://bwsapigen.bossawebsolutions.com.br/</loc>
    <priority>1.0</priority>
  </url>

</urlset>


robots.txt:

User-agent: *
Allow: /

Sitemap: https://bwsapigen.bossawebsolutions.com.br/sitemap.xml


# 7. Lembrar-se das configurações do Google para métricas:
Configurar app.component.ts conforme este

Lembrar-se de trocar a tag e o domínio para o endereço correto.
Lembrar de pegar a tag no Google Analytics -> Data Stream



# 🔁 8. Redeploy Updates

After code changes:

npm run deploy

