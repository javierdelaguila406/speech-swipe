export interface Phrase {
  id: string
  text: string
  keyword: string
  category: string
  image: {
    url: string
    alt: string
  }
  normalAudio: {
    url: string
    duration: number
  }
  slowAudio: {
    url: string
    duration: number
  }
  lipVideo: {
    url: string
    duration: number
  } | null
  isVisible: boolean
  isFavorite: boolean
  order: number
  createdAt: number
  updatedAt: number
}

export interface RecordingState {
  isRecording: boolean
  recordingTime: number
  audioUrl: string | null
}

export interface AppState {
  phrases: Phrase[]
  currentIndex: number
  favorites: Set<string>
  isPlaying: boolean
  isRecording: boolean
  currentlyPlayingId: string | null
}
