import React, { useState, useEffect } from 'react'
import { Phrase } from '@/types'
import { Button } from '@/components/common/Button'
import { COLORS } from '@/config/theme'
import { useFormValidation, ValidationRule } from '@/hooks/useFormValidation'
import { useToastStore } from '@/store/toastStore'
import { storageService } from '@/services/storageService'

const CATEGORIES = ['Necesidades', 'Deseos', 'Dolor', 'Ayuda', 'Respuestas', 'Saludos', 'Otros']

const validationRules: Record<string, ValidationRule> = {
  text: {
    required: true,
    minLength: 1,
    maxLength: 100
  },
  category: {
    required: true
  },
  keyword: {
    maxLength: 50
  }
}

interface PhraseEditorProps {
  phrase: Phrase | null
  onSave: (phrase: Phrase) => void
  onCancel: () => void
}

export const PhraseEditor: React.FC<PhraseEditorProps> = ({
  phrase,
  onSave,
  onCancel
}) => {
  const { addToast } = useToastStore()
  const [imageUrl, setImageUrl] = useState(phrase?.image.url || '')
  const [isVisible, setIsVisible] = useState(phrase?.isVisible ?? true)
  const [isFavorite, setIsFavorite] = useState(phrase?.isFavorite ?? false)
  const [order, setOrder] = useState(phrase?.order ?? 999)

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = useFormValidation(
    {
      text: phrase?.text || '',
      keyword: phrase?.keyword || '',
      category: phrase?.category || 'Necesidades'
    },
    validationRules,
    async (formValues) => {
      try {
        const newPhrase: Phrase = {
          id: phrase?.id || crypto.randomUUID(),
          text: formValues.text,
          keyword: formValues.keyword,
          category: formValues.category,
          image: { url: imageUrl, alt: formValues.text },
          normalAudio: phrase?.normalAudio || { url: '', duration: 0 },
          slowAudio: phrase?.slowAudio || { url: '', duration: 0 },
          lipVideo: phrase?.lipVideo || null,
          isVisible,
          isFavorite,
          order,
          createdAt: phrase?.createdAt || Date.now(),
          updatedAt: Date.now()
        }

        // Save to IndexedDB
        await storageService.savePhrase(newPhrase)
        addToast(`Frase "${formValues.text}" guardada correctamente`, 'success')
        onSave(newPhrase)
      } catch (error) {
        addToast('Error al guardar la frase', 'error')
        console.error('Save error:', error)
      }
    }
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('La imagen debe ser menor a 5MB', 'error')
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string)
        addToast('Imagen cargada correctamente', 'success')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-dark-bg z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-dark-surface border-b border-white border-opacity-5 p-4 z-50">
        <div className="flex items-center justify-between">
          <button
            onClick={onCancel}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Cancelar"
          >
            ← Cancelar
          </button>
          <h2 className="text-lg font-bold text-white">
            {phrase ? 'EDITAR FRASE' : 'NUEVA FRASE'}
          </h2>
          <div className="w-6" />
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6 pb-24">
          {/* Texto */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Texto de la frase *
          </label>
          <textarea
            name="text"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="QUIERO AGUA"
            maxLength={100}
            className={`w-full bg-dark-tertiary border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.text ? 'border-red-500' : 'border-white border-opacity-10 focus:border-accent-listen'
            }`}
            rows={3}
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-400">{values.text.length} / 100</p>
            {errors.text && <p className="text-xs text-red-400">{errors.text}</p>}
          </div>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Categoría *
          </label>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full bg-dark-tertiary border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
              errors.category ? 'border-red-500' : 'border-white border-opacity-10 focus:border-accent-listen'
            }`}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-400 mt-1">{errors.category}</p>}
        </div>

        {/* Palabra clave */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Palabra clave
          </label>
          <input
            type="text"
            name="keyword"
            value={values.keyword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="agua"
            className={`w-full bg-dark-tertiary border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.keyword ? 'border-red-500' : 'border-white border-opacity-10 focus:border-accent-listen'
            }`}
          />
          {errors.keyword && <p className="text-xs text-red-400 mt-1">{errors.keyword}</p>}
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Imagen
          </label>
          {imageUrl && (
            <div className="mb-3 rounded-lg overflow-hidden border border-white border-opacity-10">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-40 object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full bg-dark-tertiary border border-white border-opacity-10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-listen file:bg-accent-listen file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-1">Máximo 5MB</p>
        </div>

        {/* Audio Normal */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Audio Normal
          </label>
          <div className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 space-y-2">
            <p className="text-xs text-gray-400">Graba la pronunciación normal</p>
            <Button
              size="sm"
              variant="secondary"
              className="w-full"
            >
              🎤 Grabar Audio
            </Button>
          </div>
        </div>

        {/* Audio Lento */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Audio Lento
          </label>
          <div className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 space-y-2">
            <p className="text-xs text-gray-400">Graba la pronunciación lentamente</p>
            <Button
              size="sm"
              variant="secondary"
              className="w-full"
            >
              🎤 Grabar Audio
            </Button>
          </div>
        </div>

        {/* Video Labios */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Video de Labios (Opcional)
          </label>
          <div className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 space-y-2">
            <p className="text-xs text-gray-400">Graba un video mostrando los labios</p>
            <Button
              size="sm"
              variant="secondary"
              className="w-full"
            >
              📹 Grabar Video
            </Button>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 border-t border-white border-opacity-5 pt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className={`w-12 h-6 rounded-full transition-colors ${
                isVisible ? 'bg-accent-listen' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isVisible ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-white">Visible en la app</p>
              <p className="text-xs text-gray-400">
                {isVisible ? 'Visible' : 'Oculta'}
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-12 h-6 rounded-full transition-colors ${
                isFavorite ? 'bg-yellow-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isFavorite ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-white">Favorita</p>
              <p className="text-xs text-gray-400">
                {isFavorite ? 'Es favorita' : 'No es favorita'}
              </p>
            </div>
          </label>
        </div>

        {/* Orden */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Orden en el feed
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value) || 999)}
            min="1"
            max="999"
            className="w-full bg-dark-tertiary border border-white border-opacity-10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-listen"
          />
          <p className="text-xs text-gray-400 mt-1">Menor número = más arriba en el feed</p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-white border-opacity-5 p-4 space-y-2">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? '⏳ Guardando...' : '✓ Guardar'}
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}
