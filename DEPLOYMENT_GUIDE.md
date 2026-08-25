# Speech Swipe — Guía de Deployment en Vercel

## 🚀 Deployment en Vercel (5 minutos)

### Opción 1: Con GitHub (Recomendado)

**Paso 1: Subir a GitHub**
```bash
cd speech-swipe

# Inicializar git (si no lo hiciste)
git init
git add .
git commit -m "Initial commit: Speech Swipe MVP + Advanced Features"

# Crear repo en GitHub y pushear
git remote add origin https://github.com/TU_USUARIO/speech-swipe.git
git branch -M main
git push -u origin main
```

**Paso 2: Conectar con Vercel**
```
1. Ir a https://vercel.com/new
2. Importar repo desde GitHub
3. Seleccionar "speech-swipe"
4. Vercel detecta automáticamente:
   - Framework: Vite
   - Build command: npm run build
   - Output directory: dist
5. Click "Deploy"
6. ¡Listo! En ~2 minutos tu app está online
```

**Resultado:**
```
URL: https://speech-swipe.vercel.app
(o tu dominio personalizado)
```

---

### Opción 2: Con Vercel CLI (Sin GitHub)

**Paso 1: Instalar Vercel CLI**
```bash
npm install -g vercel
```

**Paso 2: Deploy**
```bash
cd speech-swipe
vercel
```

**Paso 3: Responder preguntas**
```
? Set up and deploy "~/speech-swipe"? [Y/n] Y
? Which scope should we deploy to? (tu-usuario)
? Link to existing project? [y/N] N
? What's your project's name? speech-swipe
? In which directory is your code? ./
? Want to modify vercel.json? [y/N] N
```

**Resultado:** Tu app está online en ~30 segundos

---

## ⚙️ Configuración Vercel (vercel.json)

**Crear `vercel.json` en raíz del proyecto:**

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "dist",
  "public": true,
  "env": {
    "VITE_SUPABASE_URL": "@vite_supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@vite_supabase_anon_key",
    "VITE_ENABLE_SUPABASE": "false",
    "VITE_ENABLE_VOICE_RECOGNITION": "true"
  },
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/manifest.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        }
      ]
    }
  ]
}
```

---

## 🌐 Configuración Inicial en Vercel Dashboard

**Después de deploy inicial:**

1. **Ir a Settings → Environment Variables**
   - Agregar `VITE_SUPABASE_URL` (si usarás Supabase)
   - Agregar `VITE_SUPABASE_ANON_KEY`

2. **Ir a Domains**
   - Puedes agregar dominio personalizado
   - O usar `https://speech-swipe.vercel.app`

3. **Ir a Analytics**
   - Vercel Analytics (gratis)
   - Edge Network performance

---

## 📱 Resultado Final

**URL pública:** https://speech-swipe.vercel.app

**Características activas:**
- ✅ PWA (installable)
- ✅ Offline support
- ✅ Voice recognition
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Actualizaciones automáticas (git push)

---

## 🔄 Actualizaciones Futuras

**Cada vez que hagas cambios:**

```bash
# Con GitHub
git add .
git commit -m "Update feature..."
git push origin main
# Vercel se redeploya automáticamente

# Con Vercel CLI
vercel --prod
```

---

## 📊 Monitoreo

**En Vercel Dashboard:**
- Analytics de uso
- Build logs
- Deployment history
- Error tracking

---

## 💡 Tips

1. **Dominio personalizado:**
   - Vercel → Domains → Add
   - Costo: $12/año o gratis si es subdominio

2. **Certificado SSL:** Automático y gratis

3. **CDN:** Automático en 180+ ciudades

4. **Preview URLs:** Cada PR genera URL de preview

5. **Rollback:** Un click para volver a versión anterior

---

## 🎉 ¡Listo!

Después de seguir estos pasos, tu app estará:
- ✅ Online públicamente
- ✅ Accesible desde cualquier dispositivo
- ✅ Con HTTPS
- ✅ Con PWA completo
- ✅ Sin costo

**Compartir link:** https://speech-swipe.vercel.app

---

## 🆘 Troubleshooting

**"Build failed"**
- Check: `npm run build` funciona localmente
- Verifica que no hay errores de TypeScript
- Revisa build logs en Vercel Dashboard

**"PWA no funciona"**
- Asegúrate que `/sw.js` y `/manifest.json` están en `public/`
- Service Worker tarda ~30s en activarse
- Intenta: hard refresh (Ctrl+Shift+R)

**"Supabase no conecta"**
- Agrega variables de entorno en Vercel Dashboard
- Verifica que VITE_ENABLE_SUPABASE=true
- Check que Keys de Supabase son correctas

---

**Conclusión:** Con ~5 minutos, tu app está online para todo el mundo. 🚀
