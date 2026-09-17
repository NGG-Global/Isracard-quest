import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            color: '#000000',
            fontFamily: 'Assistant, "Segoe UI", Arial, sans-serif',
            padding: '24px',
            textAlign: 'center',
            direction: 'rtl',
          }}
        >
          <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>אירעה שגיאה בטעינה</p>
          <pre
            style={{
              fontSize: '12px',
              color: '#2221ba',
              background: '#e8e8e8',
              padding: '12px',
              borderRadius: '23px',
              maxWidth: '100%',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
