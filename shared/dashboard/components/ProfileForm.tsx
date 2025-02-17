'use client';

import { useEffect, useState } from 'react';
import { Button } from 'shared/components/ui/button';
import { Input } from 'shared/components/ui/input';
import { useAuth } from 'shared/hooks/useAuth';
import { apiClient } from 'shared/lib/apiClient';

export function ProfileForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiClient.put('/api/users/profile', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={formData.email}
          disabled
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}