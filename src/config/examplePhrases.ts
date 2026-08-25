export interface ExamplePhrase {
  id: string
  text: string
  category: string
  imageUrl: string
  keyword: string
}

export const EXAMPLE_PHRASES: ExamplePhrase[] = [
  {
    id: '1',
    text: 'Hola, ¿cómo estás?',
    category: 'Saludos',
    imageUrl: 'https://images.unsplash.com/photo-1516214104703-3e8b8b8b8b8b?w=400&h=400&fit=crop',
    keyword: 'hola'
  },
  {
    id: '2',
    text: 'Buenos días',
    category: 'Saludos',
    imageUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop',
    keyword: 'buenos'
  },
  {
    id: '3',
    text: 'Quiero agua',
    category: 'Necesidades',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    keyword: 'agua'
  },
  {
    id: '4',
    text: 'Me duele la cabeza',
    category: 'Salud',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    keyword: 'dolor'
  },
  {
    id: '5',
    text: 'Gracias',
    category: 'Educación',
    imageUrl: 'https://images.unsplash.com/photo-1537530608828-4d1a8f9f8b8f?w=400&h=400&fit=crop',
    keyword: 'gracias'
  },
  {
    id: '6',
    text: 'Por favor',
    category: 'Educación',
    imageUrl: 'https://images.unsplash.com/photo-1516302752625-fcc13bfbaf10?w=400&h=400&fit=crop',
    keyword: 'por favor'
  },
  {
    id: '7',
    text: 'Tengo hambre',
    category: 'Necesidades',
    imageUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop',
    keyword: 'hambre'
  },
  {
    id: '8',
    text: 'Me llamo Ana',
    category: 'Personal',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    keyword: 'nombre'
  },
  {
    id: '9',
    text: 'Adiós',
    category: 'Saludos',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29ad0ffe62fa?w=400&h=400&fit=crop',
    keyword: 'adios'
  },
  {
    id: '10',
    text: 'Perdón',
    category: 'Educación',
    imageUrl: 'https://images.unsplash.com/photo-1516309591943-4e4b5ef60a1d?w=400&h=400&fit=crop',
    keyword: 'perdon'
  }
]
