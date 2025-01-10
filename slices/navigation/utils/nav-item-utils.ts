import { NavMainItem, NavMainSubItem } from "@/shared/navigation/types/nav-main"

export const handleAddSubItem = (setNewItem: React.Dispatch<React.SetStateAction<NavMainItem>>) => {
  setNewItem(prev => ({
    ...prev,
    items: [...(prev.items || []), { title: '', url: '' }]
  }))
}

export const handleUpdateSubItem = (
  setNewItem: React.Dispatch<React.SetStateAction<NavMainItem>>,
  index: number,
  field: keyof NavMainSubItem,
  value: string
) => {
  setNewItem(prev => ({
    ...prev,
    items: prev.items?.map((item, i) => i === index ? { ...item, [field]: value } : item) || []
  }))
}

export const handleRemoveSubItem = (
  setNewItem: React.Dispatch<React.SetStateAction<NavMainItem>>,
  index: number
) => {
  setNewItem(prev => ({
    ...prev,
    items: prev.items?.filter((_, i) => i !== index) || []
  }))
}

