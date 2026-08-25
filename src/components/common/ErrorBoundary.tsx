import React, { ReactNode, ErrorInfo } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-dark-bg">
          <div className="max-w-sm mx-4 bg-dark-surface border border-red-500 border-opacity-50 rounded-lg p-6 text-center space-y-4">
            <div className="text-4xl">⚠️</div>
            <h2 className="text-xl font-bold text-white">Algo salió mal</h2>
            <p className="text-sm text-gray-400">
              {this.state.error?.message || 'Ha ocurrido un error inesperado'}
            </p>
            <div className="space-y-2">
              <Button
                size="lg"
                onClick={this.handleReset}
                className="w-full"
              >
                Reintentar
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Recargar página
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
