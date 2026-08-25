export interface ModulePhrase {
  id: string
  text: string
  image: string
}

export interface Module {
  id: string
  name: string
  description: string
  emoji: string
  phrases: ModulePhrase[]
}

export const MODULES: Module[] = [
  {
    id: 'greetings',
    name: 'Saludos',
    description: 'Aprende a saludar',
    emoji: '👋',
    phrases: [
      { id: '1', text: 'Hola', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=500&h=500&fit=crop' },
      { id: '2', text: 'Buenos días', image: 'https://images.pexels.com/photos/3771919/pexels-photo-3771919.jpeg?w=500&h=500&fit=crop' },
      { id: '3', text: '¿Cómo estás?', image: 'https://images.pexels.com/photos/3807514/pexels-photo-3807514.jpeg?w=500&h=500&fit=crop' },
      { id: '4', text: 'Adiós', image: 'https://images.pexels.com/photos/3807513/pexels-photo-3807513.jpeg?w=500&h=500&fit=crop' }
    ]
  },
  {
    id: 'needs',
    name: 'Necesidades',
    description: 'Expresar necesidades básicas',
    emoji: '💧',
    phrases: [
      { id: '5', text: 'Quiero agua', image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=500&h=500&fit=crop' },
      { id: '6', text: 'Tengo hambre', image: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?w=500&h=500&fit=crop' },
      { id: '7', text: 'Estoy cansado', image: 'https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?w=500&h=500&fit=crop' },
      { id: '8', text: 'Por favor', image: 'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?w=500&h=500&fit=crop' }
    ]
  },
  {
    id: 'health',
    name: 'Salud',
    description: 'Expresar molestias de salud',
    emoji: '🏥',
    phrases: [
      { id: '9', text: 'Me duele la cabeza', image: 'https://images.pexels.com/photos/3807516/pexels-photo-3807516.jpeg?w=500&h=500&fit=crop' },
      { id: '10', text: 'Necesito ayuda', image: 'https://images.pexels.com/photos/3807512/pexels-photo-3807512.jpeg?w=500&h=500&fit=crop' },
      { id: '11', text: 'No me siento bien', image: 'https://images.pexels.com/photos/3771919/pexels-photo-3771919.jpeg?w=500&h=500&fit=crop' },
      { id: '12', text: 'Gracias', image: 'https://images.pexels.com/photos/3807514/pexels-photo-3807514.jpeg?w=500&h=500&fit=crop' }
    ]
  },
  {
    id: 'education',
    name: 'Educación',
    description: 'Expresiones educadas',
    emoji: '📚',
    phrases: [
      { id: '13', text: 'Por favor', image: 'https://images.pexels.com/photos/3807513/pexels-photo-3807513.jpeg?w=500&h=500&fit=crop' },
      { id: '14', text: 'Gracias', image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=500&h=500&fit=crop' },
      { id: '15', text: 'De nada', image: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?w=500&h=500&fit=crop' },
      { id: '16', text: 'Disculpa', image: 'https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?w=500&h=500&fit=crop' }
    ]
  }
]
