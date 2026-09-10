# 🚀 Final Setup Instructions

El proyecto está completamente estructurado y listo. Sigue estos pasos finales para:

1. **Hacer push a GitHub**
2. **Configurar Vercel**
3. **Desplegar la aplicación**

## 📤 Hacer Push a GitHub

### Opción 1: GitHub CLI (Recomendado)

```bash
# Instalar GitHub CLI si no lo tienes
# https://cli.github.com

# Autenticarse
gh auth login

# Hacer push
git push origin main
```

### Opción 2: Personal Access Token

```bash
# Crear token en GitHub Settings > Developer settings > Personal access tokens
# https://github.com/settings/tokens

# Reemplaza TOKEN con tu token
git remote remove origin
git remote add origin https://TOKEN@github.com/HOM05/routing-games.git
git push origin main
```

### Opción 3: SSH Keys

```bash
# Generar clave SSH si no la tienes
ssh-keygen -t ed25519 -C "tu@email.com"

# Agregar clave a GitHub
# https://github.com/settings/keys

# Cambiar remote a SSH
git remote remove origin
git remote add origin git@github.com:HOM05/routing-games.git
git push origin main
```

## 🌐 Desplegar en Vercel

### Frontend en Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Navegar al directorio del proyecto
cd routing-games

# Deploy
vercel

# Para cada prompt:
# - Set up and deploy "routing-games"? Y
# - Which scope? Select your account
# - Link to existing project? N
# - Project name: routing-games
# - Framework: Vite
# - Root directory: ./packages/frontend
```

### Backend en Heroku, Railway, o Render

```bash
# Opción 1: Railway (Recomendado para Node.js)
# 1. Ir a https://railway.app
# 2. Connect GitHub repo
# 3. Seleccionar rama main
# 4. Agregar variables de entorno
# 5. Deploy

# Opción 2: Render
# 1. Ir a https://render.com
# 2. New > Web Service
# 3. Connect GitHub repo
# 4. Configurar start command: npm run start --workspace=packages/backend
```

## 🔧 Configuración de Variables de Entorno

### Frontend (.env en Vercel)
```
VITE_API_URL=https://tu-backend-url.com
```

### Backend
```
PORT=3000
NODE_ENV=production
CLIENT_URL=https://tu-frontend-url.vercel.app
DATABASE_URL=postgresql://user:pass@host/db
```

## ✅ Checklist de Despliegue

- [ ] Código pusheado a GitHub
- [ ] Repositorio público (visible en github.com)
- [ ] Frontend desplegado en Vercel
- [ ] Backend desplegado en Railway/Render
- [ ] Variables de entorno configuradas
- [ ] WebSocket conectando correctamente
- [ ] Leaderboard funcional
- [ ] Probar juego en producción

## 🎮 Comenzar a Jugar

1. Abre https://tu-frontend.vercel.app
2. Ingresa tu nombre
3. ¡Comienza a jugar!

## 📊 Monitoreo

### Vercel
- Dashboard: https://vercel.com/dashboard
- Logs: Click en tu proyecto > Deployments > View Logs

### Railway/Render
- Dashboard del servicio
- Logs en tiempo real

## 🆘 Troubleshooting

### WebSocket no conecta
```bash
# Verificar que el backend está corriendo
curl https://tu-backend-url/api/health

# Verificar configuración de CORS en backend
# Ver packages/backend/src/index.ts línea ~13
```

### Errores de compilación
```bash
# Limpiar y reconstruir
rm -rf node_modules
npm install
npm run build
```

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Vercel/Railway
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que el backend está corriendo

---

**Próximos pasos opcionales:**
- [ ] Agregar base de datos real (PostgreSQL)
- [ ] Implementar autenticación de usuarios
- [ ] Agregar más tipos de problemas de ruteo
- [ ] Crear dashboard de estadísticas
- [ ] Integración con APIs de mapas (Mapbox, Google Maps)
