# Speech Swipe 🎤

Aplicación móvil de comunicación asistida y práctica del lenguaje para personas en recuperación logopédica.

## 🚀 Inicio Rápido

### Prerequisites
- Node.js 16+ 
- npm o yarn

### Instalación

```bash
cd speech-swipe
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### Build

```bash
npm run build
```

## 📱 Características MVP

✅ Feed vertical de frases (estilo Tinder + Duolingo)  
✅ Swipe vertical para navegar (arriba = siguiente, abajo = anterior)  
✅ 4 acciones por frase: Escuchar, Escuchar lento, Ver labios, Practicar  
✅ Grabación de intentos de pronunciación  
✅ Marcación de frases favoritas  
✅ Persistencia local (localStorage + IndexedDB)  
✅ Diseño moderno, modo oscuro, accesible  

## 🎨 Design

- **Color scheme:** Negro profundo (#0a0a0a) con acentos en púrpura, turquesa, naranja y rojo
- **Tipografía:** Inter o SF Pro Display
- **Bordes:** Redondeados (24px para tarjetas, 50% para botones)
- **Animaciones:** Suaves y naturales con Framer Motion

## 📚 Documentación

Ver la carpeta `/documentation` para:
- Design System completo
- Arquitectura UX
- Especificaciones técnicas
- Guía de implementación

## 🗂️ Estructura del Proyecto

```
src/
├── components/       # Componentes React
│   ├── common/       # Componentes base (Button, Badge, Modal)
│   ├── feed/         # Pantalla principal
│   └── modals/       # Modales (Video, Grabación)
├── hooks/            # Custom hooks (useAudio, useRecording, useSwipe)
├── store/            # Zustand store para estado global
├── services/         # Servicios (audio, storage)
├── types/            # TypeScript interfaces
├── config/           # Configuración (colores, datos por defecto)
├── styles/           # CSS global
└── main.tsx          # Punto de entrada
```

## 🎯 Checklist MVP

### Feed Principal
- [x] Pantalla principal con tarjeta de frase
- [x] Swipe arriba/abajo para navegar
- [x] 4 botones circulares funcionando
- [x] Reproducción de audio normal
- [x] Reproducción de audio lento
- [x] Modal de video de labios
- [x] Modal de grabación
- [x] Toggling de favoritas
- [x] Contador de frase
- [ ] Persistencia local completa

### Siguiente Fase
- [ ] Menú cuidador (oculto)
- [ ] Gestor de frases
- [ ] Editor de frases
- [ ] Grabador de audio
- [ ] Grabador de video

## 🔧 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **State:** Zustand
- **Styling:** Tailwind CSS + Framer Motion
- **Audio/Video:** Web APIs nativas (MediaRecorder, HTMLAudioElement)
- **Storage:** localStorage + IndexedDB (futuro)

## 📱 Responsive

- **Mobile-first** (375px base)
- Testado en iPhone SE, iPhone 12, Android
- Adapta a tablet (640px+) y desktop (1024px+)

## ♿ Accesibilidad

- WCAG AA compliant
- ARIA labels en botones
- Focus management
- Contraste 5+:1
- Touch targets 72x72px

## 🚢 Deployment

Build para producción:

```bash
npm run build
```

Deploya en Vercel, Netlify o tu host preferido:

```bash
# Vercel
vercel

# Netlify
netlify deploy
```

## 📝 License

MIT

## 👤 Author

Javier del Aguila

---

**¿Necesitas ayuda?** Ver la documentación en `/documentation`
