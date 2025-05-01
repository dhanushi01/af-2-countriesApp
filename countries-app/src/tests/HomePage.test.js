import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  test('renders welcome message', () => {
    render(<HomePage />);
    expect(screen.getByText('Welcome to GEOATLAS')).toBeInTheDocument();
  });

  test('displays feature cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Country Search')).toBeInTheDocument();
    expect(screen.getByText('Detailed Info')).toBeInTheDocument();
  });
});