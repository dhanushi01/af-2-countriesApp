import { render, screen } from '@testing-library/react';
import AboutPage from '../pages/AboutPage';

describe('AboutPage', () => {
  test('renders feature sections', () => {
    render(<AboutPage />);
    
    expect(screen.getByText('Smart Search')).toBeInTheDocument();
    expect(screen.getByText('Detailed Country Profiles')).toBeInTheDocument();
    expect(screen.getByText('Data Visualization')).toBeInTheDocument();
  });

  test('displays images', () => {
    render(<AboutPage />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});