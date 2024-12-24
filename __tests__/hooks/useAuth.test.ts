import { renderHook, act } from '@testing-library/react';
import { useAuth } from 'shared/hooks/useAuth';
import { apiClient } from 'shared/lib/apiClient';

// Mock apiClient
jest.mock('shared/lib/apiClient');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches user on mount', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
    };

    mockApiClient.get.mockResolvedValueOnce({
      success: true,
      data: mockUser,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('handles login successfully', async () => {
    mockApiClient.post.mockResolvedValueOnce({ success: true });
    mockApiClient.get.mockResolvedValueOnce({
      success: true,
      data: { id: '1', email: 'test@example.com' },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const success = await result.current.login('test@example.com', 'password');
      expect(success).toBe(true);
    });
  });
});