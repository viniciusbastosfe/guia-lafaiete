# 🚀 Guia de Deploy VPS - Guia Lafaiete v2.0.0
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 00:07

---

## 📋 Checklist de Deploy

### 1️⃣ Build Local (Feito ✅)
```bash
npm run build
```
✅ Arquivos gerados em: `dist/`

---

### 2️⃣ Enviar Arquivos para VPS

#### **Opção A: FTP/SFTP**
Use FileZilla, WinSCP ou similar:
- **Host:** seu-ip-vps
- **Usuário:** seu-usuario
- **Envie TODO o conteúdo da pasta `dist/` para:** `/var/www/html/` ou diretório configurado

#### **Opção B: rsync (via SSH)**
```bash
rsync -avz --delete dist/ usuario@ip-vps:/var/www/html/
```

#### **Opção C: Git Deploy**
```bash
# No VPS
git pull origin main
npm install
npm run build
# Copiar dist/ para diretório web
```

---

### 3️⃣ Configurar Servidor Web

#### **🔷 Nginx**
```nginx
server {
    listen 80;
    server_name guia-lafaiete.gehub.supingol.com;
    root /var/www/html;
    index index.html;

    # SPA - Todas as rotas retornam index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Logs
    error_log /var/log/nginx/guia-lafaiete-error.log;
    access_log /var/log/nginx/guia-lafaiete-access.log;
}
```

**Comandos:**
```bash
sudo nano /etc/nginx/sites-available/guia-lafaiete
sudo ln -s /etc/nginx/sites-available/guia-lafaiete /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

#### **🔶 Apache**
Copie o arquivo `.htaccess.example` para a pasta `dist/` e renomeie para `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

**Habilite mod_rewrite:**
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

---

### 4️⃣ Verificações Finais

#### ✅ Checklist:
- [ ] Todos os arquivos da pasta `dist/` foram enviados
- [ ] Arquivo `index.html` está no diretório raiz do site
- [ ] Pasta `assets/` está no mesmo nível do index.html
- [ ] Servidor web configurado para SPA (try_files ou .htaccess)
- [ ] Permissões corretas: `chmod -R 755 /var/www/html`
- [ ] Site acessível via navegador
- [ ] Console do navegador SEM erros de Supabase

#### 🧪 Teste no Console do Navegador:
```javascript
// Abra F12 > Console e digite:
localStorage.clear()
location.reload()
```

---

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"
**Causa:** Build foi feito sem o arquivo `.env`  
**Solução:** 
1. Verifique se `.env` existe localmente
2. Execute `npm run build` novamente
3. Reenvie os arquivos para VPS

---

### Página em branco ou 404
**Causa:** Servidor não configurado para SPA  
**Solução:**
- **Nginx:** Adicione `try_files $uri $uri/ /index.html;`
- **Apache:** Adicione arquivo `.htaccess`

---

### Assets não carregam (404 em /assets/)
**Causa:** Pasta `assets/` não foi enviada ou está no lugar errado  
**Solução:** Certifique-se de enviar TODA a pasta `dist/`

---

## 📊 Estrutura Esperada no VPS

```
/var/www/html/  (ou seu diretório configurado)
├── index.html
├── assets/
│   ├── index-8HylwvOA.js
│   ├── index-rD8s5hV4.css
│   ├── react-vendor-DR_ob6j3.js
│   ├── supabase-vendor-C6t9Nuwy.js
│   └── ui-vendor-sQP4jySR.js
├── Guia-Lafaiete-*.svg
└── .htaccess (se Apache)
```

---

## 🔒 SSL/HTTPS (Recomendado)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d guia-lafaiete.gehub.supingol.com

# Renovação automática
sudo certbot renew --dry-run
```

---

## 📞 Suporte

Se o erro persistir após seguir todos os passos:
1. Verifique os logs do servidor: `sudo tail -f /var/log/nginx/error.log`
2. Teste localmente: `npm run preview`
3. Confirme que o build foi feito COM o arquivo `.env` presente

**Autor:** Vinícius Bastos  
**Site:** https://midias.me  
**Projeto:** Guia Lafaiete v2.0.0
