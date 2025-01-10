import React from 'react'
import { Trash2 } from 'lucide-react'
import { NavMainSubItem, NavMainItem } from "@/shared/navigation/types/nav-main"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "shared/components/ui/dialog"
import { Input } from "shared/components/ui/input"
import { Label } from "shared/components/ui/label"
import { Switch } from "shared/components/ui/switch"
import { Button } from "shared/components/ui/button"
import { handleAddSubItem, handleUpdateSubItem, handleRemoveSubItem } from '../utils/nav-item-utils'

interface NavDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingItem: NavMainItem | null
  newItem: NavMainItem
  setNewItem: React.Dispatch<React.SetStateAction<NavMainItem>>
  onSubmit: (e: React.FormEvent) => void
  onIconSelect: (iconName: string) => void
}

export function NavDialog({ 
  isOpen, 
  onOpenChange, 
  editingItem, 
  newItem, 
  setNewItem, 
  onSubmit,
  onIconSelect
}: NavDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingItem ? 'Edit Navigation Item' : 'Add New Navigation Item'}</DialogTitle>
          <DialogDescription>
            {editingItem ? 'Update the details of the navigation item.' : 'Enter the details for the new navigation item.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={newItem.url}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              value={newItem.icon || ''}
              onChange={(e) => onIconSelect(e.target.value)}
              placeholder="Enter icon name"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={newItem.isActive}
              onCheckedChange={(checked) => setNewItem({ ...newItem, isActive: checked })}
            />
            <Label htmlFor="isActive">Is Active</Label>
          </div>
          <div className="space-y-2">
            <Label>Sub Items</Label>
            {newItem.items && newItem.items.map((subItem: NavMainSubItem, index: number) => (
              <div key={index} className="flex space-x-2">
                <Input
                  placeholder="Title"
                  value={subItem.title}
                  onChange={(e) => handleUpdateSubItem(setNewItem, index, 'title', e.target.value)}
                />
                <Input
                  placeholder="URL"
                  value={subItem.url}
                  onChange={(e) => handleUpdateSubItem(setNewItem, index, 'url', e.target.value)}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveSubItem(setNewItem, index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => handleAddSubItem(setNewItem)}>
              Add Sub Item
            </Button>
          </div>
          <Button type="submit">{editingItem ? 'Update' : 'Add'} Item</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

