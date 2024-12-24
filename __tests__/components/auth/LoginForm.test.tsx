import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from 'shared/components/auth/LoginForm';
import { useAuth } from 'shared/hooks/useAuth';

// Mock useAuth hook
jest.mock('shared/hooks/useAuth');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      user: null,
      loading: false,
      error: null,
      register: jest.fn(),
      logout: jest.fn(),
    });
  });

  it('renders login form correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const mockLogin = jest.fn().mockResolvedValue(true);
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      user: null,
      loading: false,
      error: null,
      register: jest.fn(),
      logout: jest.fn(),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});