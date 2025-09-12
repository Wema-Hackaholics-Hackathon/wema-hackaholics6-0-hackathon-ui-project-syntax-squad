import { ReactNode } from 'react'

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  primaryColor: string
  accentColor: string
  borderRadius: number
  animations: boolean
  shadows: ShadowConfig
}

export interface ShadowConfig {
  intensity: 'subtle' | 'medium' | 'heavy'
  blur: number
  spread: number
  offsetX: number
  offsetY: number
}

export interface ModalConfig {
  id: string
  component: ReactNode
  props?: Record<string, any>
  options: ModalOptions
}

export interface ModalOptions {
  size?: 'small' | 'medium' | 'large' | 'fullscreen'
  closable?: boolean
  backdrop?: boolean
  backdropBlur?: boolean
  zIndex?: number
  animation?: 'fade' | 'slide' | 'scale' | 'none'
  position?: 'center' | 'top' | 'bottom'
  persistent?: boolean
}

export interface OverlayConfig {
  id: string
  type: 'loading' | 'confirmation' | 'alert' | 'menu' | 'custom'
  content: ReactNode | string
  position?: 'center' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  duration?: number
  closable?: boolean
  backdrop?: boolean
}

export interface ToastConfig {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  action?: ToastAction
  position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

export interface ToastAction {
  label: string
  handler: () => void
}

export interface DrawerConfig {
  id: string
  side: 'left' | 'right' | 'top' | 'bottom'
  content: ReactNode
  width?: string | number
  height?: string | number
  backdrop?: boolean
  swipeToClose?: boolean
}

export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
  type?: 'spinner' | 'progress' | 'skeleton'
}

export interface ErrorState {
  hasError: boolean
  error?: Error | string
  errorCode?: string
  retry?: () => void
}

export interface PaginationConfig {
  page: number
  pageSize: number
  total: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface FilterConfig<T = any> {
  field: keyof T
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between'
  value: any
  label: string
}

export interface SortConfig<T = any> {
  field: keyof T
  direction: 'asc' | 'desc'
  label: string
}

export interface TableColumn<T = any> {
  id: string
  field: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T) => ReactNode
}

export interface ActionMenuItem {
  id: string
  label: string
  icon?: ReactNode
  action: () => void
  disabled?: boolean
  destructive?: boolean
  separator?: boolean
}

export interface BreadcrumbItem {
  id: string
  label: string
  href?: string
  icon?: ReactNode
  isActive?: boolean
}

export interface TabItem {
  id: string
  label: string
  content: ReactNode
  icon?: ReactNode
  disabled?: boolean
  badge?: string | number
}

export interface StepperStep {
  id: string
  label: string
  description?: string
  status: 'pending' | 'active' | 'completed' | 'error'
  icon?: ReactNode
}

export interface FormFieldConfig {
  name: string
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'time' | 'datetime-local' | 'file'
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  options?: Array<{ label: string; value: any }>
  validation?: ValidationRule[]
  description?: string
}

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'pattern' | 'custom'
  value?: any
  message: string
}

export interface ViewState {
  isLoading: boolean
  error: ErrorState
  data: unknown
  filters: FilterConfig[]
  sort: SortConfig
  pagination: PaginationConfig
}

export interface QRCodeConfig {
  data: string
  size?: number
  backgroundColor?: string
  foregroundColor?: string
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  margin?: number
  logo?: string
}