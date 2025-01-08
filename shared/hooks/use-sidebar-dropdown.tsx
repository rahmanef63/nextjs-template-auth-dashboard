"use client"

import { useState, useCallback, useEffect } from 'react'
import { useSidebar } from 'shared/components/ui/sidebar'

export function useSidebarDropdown(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const { open } = useSidebar()

  // Close dropdown when hover state changes and sidebar isn't permanently open
  useEffect(() => {
    if (!open) {
      setIsOpen(false)
    }
  }, [open])

  const onOpenChange = useCallback((open: boolean) => {
    // Only allow opening dropdown if sidebar is permanently open or we're hovering
    if (!open || open) {
      setIsOpen(open)
    }
  }, [])

  return {
    isOpen,
    onOpenChange
  }
}
