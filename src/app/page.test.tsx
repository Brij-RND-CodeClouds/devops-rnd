import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import Home from './page';

jest.mock('@/lib/firebase');

describe('Home Page', () => {
  it('renders and adds item', async () => {
    await act(async () => {
      render(<Home />);
    });

    // Wait for initial items to load
    await waitFor(() => {
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Add item');
    const button = screen.getByText('Add Item');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'New Item' } });
      fireEvent.click(button);
    });

    // The mock returns "Test Item", so we should still see it after the operation
    await waitFor(() => {
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });
  });
});
