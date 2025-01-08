import { useState } from 'react';
import { useToast } from "shared/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Wireframe {
  id: string;
  title: string;
  description: string;
  image: string;
  lastModified: string;
  status: "draft" | "in-review" | "approved";
}

// Simulated API calls (replace with real API endpoints later)
const fetchWireframes = async (): Promise<Wireframe[]> => {
  console.log('Fetching wireframes...');
  // Simulated API response
  return [
    {
      id: "1",
      title: "Homepage Layout",
      description: "Main landing page wireframe with hero section and feature highlights",
      image: "photo-1488590528505-98d2b5aba04b",
      lastModified: "2024-02-15",
      status: "approved"
    },
    {
      id: "2",
      title: "Dashboard Interface",
      description: "User dashboard with analytics and activity feed",
      image: "photo-1486312338219-ce68d2c6f44d",
      lastModified: "2024-02-14",
      status: "in-review"
    },
    {
      id: "3",
      title: "Mobile Navigation",
      description: "Responsive navigation patterns for mobile devices",
      image: "photo-1581091226825-a6a2a5aee158",
      lastModified: "2024-02-13",
      status: "draft"
    }
  ];
};

export const useWireframes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Query for fetching wireframes
  const { data: wireframes, isLoading, error } = useQuery({
    queryKey: ['wireframes'],
    queryFn: fetchWireframes,
  });

  // Mutation for editing wireframe
  const editMutation = useMutation({
    mutationFn: async (wireframeId: string) => {
      console.log('Editing wireframe:', wireframeId);
      // Simulated API call
      return Promise.resolve();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Wireframe opened in editor",
      });
      queryClient.invalidateQueries({ queryKey: ['wireframes'] });
    },
  });

  // Mutation for previewing wireframe
  const previewMutation = useMutation({
    mutationFn: async (wireframeId: string) => {
      console.log('Previewing wireframe:', wireframeId);
      // Simulated API call
      return Promise.resolve();
    },
    onSuccess: () => {
      toast({
        title: "Preview Mode",
        description: "Loading wireframe preview...",
      });
    },
  });

  const handleEdit = (id: string) => {
    console.log('Handling edit for wireframe:', id);
    editMutation.mutate(id);
  };

  const handlePreview = (id: string) => {
    console.log('Handling preview for wireframe:', id);
    previewMutation.mutate(id);
  };

  const toggleViewMode = () => {
    setViewMode(current => current === 'grid' ? 'list' : 'grid');
    console.log('View mode toggled to:', viewMode === 'grid' ? 'list' : 'grid');
  };

  return {
    wireframes,
    isLoading,
    error,
    viewMode,
    handleEdit,
    handlePreview,
    toggleViewMode,
  };
};