'use client'

import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface DropdownProps {
  trigger: React.ReactElement
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  align?: 'left' | 'right' | 'center'
  sideOffset?: number
  className?: string
}

export function Dropdown({
  trigger,
  children,
  isOpen,
  onOpenChange,
  align = 'right',
  sideOffset = 8,
  className = ''
}: DropdownProps) {
  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const updatePosition = () => {
    if (!triggerRef.current || !contentRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let top = triggerRect.bottom + sideOffset
    let left = triggerRect.left

    if (align === 'right') {
      left = triggerRect.right - contentRect.width
    } else if (align === 'center') {
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
    }

    // Prevent overflow on the right
    if (left + contentRect.width > viewportWidth - 16) {
      left = viewportWidth - contentRect.width - 16
    }

    // Prevent overflow on the left
    if (left < 16) {
      left = 16
    }

    // Prevent overflow at the bottom
    if (top + contentRect.height > viewportHeight - 16) {
      top = triggerRect.top - contentRect.height - sideOffset
    }

    setPosition({ top, left })
  }

  useEffect(() => {
    if (isOpen) {
      updatePosition()
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition, true)
      
      return () => {
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition, true)
      }
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onOpenChange])

  const clonedTrigger = React.cloneElement(trigger, {
    ...(trigger.props as any),
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      onOpenChange(!isOpen)
      ;(trigger.props as any)?.onClick?.(e)
    }
  })

  const overlayContent = isOpen && (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1000] bg-black/10 backdrop-blur-[2px]"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dropdown Content */}
      <div
        ref={contentRef}
        className={`fixed z-[1001] min-w-[200px] max-w-[400px] bg-white rounded-lg border border-gray-200/80 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] backdrop-blur-lg ${className}`}
        style={{
          top: position.top,
          left: position.left,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  )

  return (
    <>
      {clonedTrigger}
      {typeof window !== 'undefined' && createPortal(overlayContent, document.body)}
    </>
  )
}

export interface DropdownContentProps {
  children: React.ReactNode
  className?: string
}

export function DropdownContent({ children, className = '' }: DropdownContentProps) {
  return (
    <div className={`p-1 ${className}`}>
      {children}
    </div>
  )
}

export interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'default' | 'destructive'
}

export function DropdownItem({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  variant = 'default'
}: DropdownItemProps) {
  const baseClasses = 'flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors'
  const variantClasses = {
    default: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
    destructive: 'text-red-600 hover:bg-red-50 hover:text-red-700'
  }
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  )
}

export interface DropdownSeparatorProps {
  className?: string
}

export function DropdownSeparator({ className = '' }: DropdownSeparatorProps) {
  return <div className={`h-px bg-gray-200 my-1 ${className}`} />
}

export interface DropdownHeaderProps {
  children: React.ReactNode
  className?: string
}

export function DropdownHeader({ children, className = '' }: DropdownHeaderProps) {
  return (
    <div className={`px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      {children}
    </div>
  )
}