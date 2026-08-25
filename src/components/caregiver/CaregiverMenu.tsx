import React from 'react'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/common/Button'

interface CaregiverMenuProps {
  isOpen: boolean
  onClose: () => void
  onManagePhrases: () => void
  onManageCategories: () => void
  onViewFavorites: () => void
  onViewProgress: () => void
  onSettings: () => void
}

export const CaregiverMenu: React.FC<CaregiverMenuProps> = ({
  isOpen,
  onClose,
  onManagePhrases,
  onManageCategories,
  onViewFavorites,
  onViewProgress,
  onSettings
}) => {
  const menuItems = [
    {
      icon: '📋',
      title: 'FRASES',
      description: 'Administrar todas las frases',
      onClick: onManagePhrases
    },
    {
      icon: '🏷️',
      title: 'CATEGORÍAS',
      description: 'Organizar categorías',
      onClick: onManageCategories
    },
    {
      icon: '⭐',
      title: 'FAVORITOS',
      description: 'Frases importantes',
      onClick: onViewFavorites
    },
    {
      icon: '📊',
      title: 'PROGRESO',
      description: 'Estadísticas y reportes',
      onClick: onViewProgress
    },
    {
      icon: '⚙️',
      title: 'CONFIGURACIÓN',
      description: 'Ajustes de la aplicación',
      onClick: onSettings
    }
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="MENÚ CUIDADOR">
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full bg-dark-tertiary hover:bg-opacity-80 border border-white border-opacity-10 rounded-lg p-4 text-left transition-all duration-200 active:scale-95"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
              </div>
            </div>
          </button>
        ))}

        {/* Separator */}
        <div className="border-t border-white border-opacity-10 my-2" />

        {/* Close Button */}
        <Button
          size="lg"
          variant="secondary"
          onClick={onClose}
          className="w-full"
        >
          Volver al feed
        </Button>
      </div>
    </Modal>
  )
}
