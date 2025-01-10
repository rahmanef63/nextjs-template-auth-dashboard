import { useState, useCallback } from 'react'
import { NavMainItem } from "@/shared/navigation/types/nav-main"
import { useNavItems } from '@/shared/hooks/use-nav-items'
import { useIconPicker } from '@/shared/hooks/use-icon-picker'

export function useNavDialog() {
  const { addNavItem, updateNavItem } = useNavItems()
  const { selectedIcon, setSelectedIcon } = useIconPicker()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NavMainItem | null>(null)
  const [newItem, setNewItem] = useState<NavMainItem>({
    title: '',
    url: '',
    icon: null,
    isActive: false,
    items: []
  })

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const itemToSave = {
      ...newItem,
      icon: selectedIcon,
    }
    if (editingItem) {
      updateNavItem(itemToSave)
    } else {
      addNavItem(itemToSave)
    }
    setIsDialogOpen(false)
    setEditingItem(null)
    setNewItem({
      title: '',
      url: '',
      icon: null,
      isActive: false,
      items: []
    })
    setSelectedIcon(null)
  }, [newItem, selectedIcon, editingItem, updateNavItem, addNavItem])

  const handleEdit = useCallback((item: NavMainItem) => {
    setEditingItem(item)
    setNewItem(item)
    setSelectedIcon(item.icon)
    setIsDialogOpen(true)
  }, [])

  return {
    isDialogOpen,
    setIsDialogOpen,
    editingItem,
    newItem,
    setNewItem,
    handleSubmit,
    handleEdit
  }
}

