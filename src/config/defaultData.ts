import { Phrase } from '@/types'

export const DEFAULT_PHRASES: Phrase[] = [
  {
    id: '1',
    text: 'QUIERO AGUA',
    keyword: 'agua',
    category: 'Necesidades',
    image: {
      url: 'https://images.unsplash.com/photo-1545514106-c60a147b53f9?w=400&h=250&fit=crop',
      alt: 'Vaso de agua'
    },
    normalAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 2000
    },
    slowAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 3000
    },
    lipVideo: null,
    isVisible: true,
    isFavorite: false,
    order: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '2',
    text: 'TENGO HAMBRE',
    keyword: 'hambre',
    category: 'Necesidades',
    image: {
      url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop',
      alt: 'Plato de comida'
    },
    normalAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 2200
    },
    slowAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 3300
    },
    lipVideo: null,
    isVisible: true,
    isFavorite: false,
    order: 2,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '3',
    text: 'ME DUELE',
    keyword: 'duele',
    category: 'Dolor',
    image: {
      url: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=250&fit=crop',
      alt: 'Persona sosteniendo su cabeza'
    },
    normalAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 1500
    },
    slowAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 2250
    },
    lipVideo: null,
    isVisible: true,
    isFavorite: false,
    order: 3,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '4',
    text: 'NECESITO AYUDA',
    keyword: 'ayuda',
    category: 'Ayuda',
    image: {
      url: 'https://images.unsplash.com/photo-1576091160550-2173197671e2?w=400&h=250&fit=crop',
      alt: 'Personas ayudándose'
    },
    normalAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 2400
    },
    slowAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 3600
    },
    lipVideo: null,
    isVisible: true,
    isFavorite: false,
    order: 4,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '5',
    text: 'SÍ',
    keyword: 'sí',
    category: 'Respuestas',
    image: {
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop',
      alt: 'Gesto de aprobación'
    },
    normalAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 500
    },
    slowAudio: {
      url: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      duration: 750
    },
    lipVideo: null,
    isVisible: true,
    isFavorite: false,
    order: 5,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
]
