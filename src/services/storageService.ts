import { Phrase } from '@/types'

const DB_NAME = 'speech-swipe'
const DB_VERSION = 1
const PHRASES_STORE = 'phrases'
const RECORDINGS_STORE = 'recordings'

export class StorageService {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'))
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create phrases store
        if (!db.objectStoreNames.contains(PHRASES_STORE)) {
          const phraseStore = db.createObjectStore(PHRASES_STORE, { keyPath: 'id' })
          phraseStore.createIndex('category', 'category', { unique: false })
          phraseStore.createIndex('isVisible', 'isVisible', { unique: false })
          phraseStore.createIndex('order', 'order', { unique: false })
        }

        // Create recordings store
        if (!db.objectStoreNames.contains(RECORDINGS_STORE)) {
          db.createObjectStore(RECORDINGS_STORE, { keyPath: 'id' })
        }
      }
    })
  }

  async savePhrases(phrases: Phrase[]): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PHRASES_STORE], 'readwrite')
      const store = tx.objectStore(PHRASES_STORE)

      // Clear existing data
      store.clear()

      // Add new data
      phrases.forEach(phrase => {
        store.add(phrase)
      })

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(new Error('Failed to save phrases'))
    })
  }

  async getPhrases(): Promise<Phrase[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PHRASES_STORE], 'readonly')
      const store = tx.objectStore(PHRASES_STORE)
      const index = store.index('order')
      const request = index.getAll()

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => reject(new Error('Failed to get phrases'))
    })
  }

  async getPhrase(id: string): Promise<Phrase | undefined> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PHRASES_STORE], 'readonly')
      const store = tx.objectStore(PHRASES_STORE)
      const request = store.get(id)

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => reject(new Error('Failed to get phrase'))
    })
  }

  async savePhrase(phrase: Phrase): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PHRASES_STORE], 'readwrite')
      const store = tx.objectStore(PHRASES_STORE)

      // Check if exists
      const getRequest = store.get(phrase.id)
      getRequest.onsuccess = () => {
        const existingPhrase = getRequest.result
        const saveRequest = existingPhrase
          ? store.put(phrase)
          : store.add(phrase)

        saveRequest.onsuccess = () => resolve()
        saveRequest.onerror = () => reject(new Error('Failed to save phrase'))
      }
    })
  }

  async deletePhrase(id: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PHRASES_STORE], 'readwrite')
      const store = tx.objectStore(PHRASES_STORE)
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error('Failed to delete phrase'))
    })
  }

  async saveRecording(id: string, blob: Blob): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([RECORDINGS_STORE], 'readwrite')
      const store = tx.objectStore(RECORDINGS_STORE)
      const request = store.put({ id, blob, timestamp: Date.now() })

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error('Failed to save recording'))
    })
  }

  async getRecording(id: string): Promise<Blob | undefined> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([RECORDINGS_STORE], 'readonly')
      const store = tx.objectStore(RECORDINGS_STORE)
      const request = store.get(id)

      request.onsuccess = () => {
        resolve(request.result?.blob)
      }

      request.onerror = () => reject(new Error('Failed to get recording'))
    })
  }

  async clearAll(): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PHRASES_STORE, RECORDINGS_STORE], 'readwrite')

      tx.objectStore(PHRASES_STORE).clear()
      tx.objectStore(RECORDINGS_STORE).clear()

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(new Error('Failed to clear database'))
    })
  }
}

export const storageService = new StorageService()
