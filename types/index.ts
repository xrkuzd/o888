//==============================================================================
// Add as you go
//==============================================================================

export interface CategoryItem {
  id: string
  name: string
  draggedOver: boolean
}

//==============================================================================
// State
//==============================================================================

export interface AuthState {
  loading: boolean
  isAuthenticated: boolean
  error?: string
}

export interface SettingsState {
  isOpen: boolean
  previewMarkdown: boolean
  loading: boolean
  darkTheme: boolean
  codeMirrorOptions: { [key: string]: any }
}

//==============================================================================
// API
//==============================================================================

//==============================================================================
// Events
//==============================================================================

export type ReactDragEvent = React.DragEvent<HTMLDivElement>

export type ReactMouseEvent =
  | MouseEvent
  | React.MouseEvent<HTMLDivElement>
  | React.ChangeEvent<HTMLSelectElement>

export type ReactSubmitEvent =
  | React.FormEvent<HTMLFormElement>
  | React.FocusEvent<HTMLInputElement>

//==============================================================================
// Default Types
//==============================================================================

// Taken from TypeScript private declared type within Actions
export type WithPayload<P, T> = T & {
  payload: P
}
