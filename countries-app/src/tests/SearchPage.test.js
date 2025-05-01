import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('SearchPage', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('renders search input', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/search by/i)).toBeInTheDocument();
  });

  it('searches countries by name', async () => {
    const mockData = [{ 
      name: { common: 'Test Country' }, 
      cca3: 'TC', 
      capital: ['Test Capital'], 
      region: 'Test Region',
      flags: { png: 'test-flag.png' }
    }];
    
    mock.onGet(/name/).reply(200, mockData);

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search by/i), { 
      target: { value: 'test' } 
    });

    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });
  });

  it('filters by region', async () => {
    const mockData = [
      { name: { common: 'Country 1' }, region: 'Europe' },
      { name: { common: 'Country 2' }, region: 'Asia' }
    ];
    
    mock.onGet(/name/).reply(200, mockData);

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search by/i), { 
      target: { value: 'test' } 
    });
    
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Europe' }
    });

    await waitFor(() => {
      expect(screen.getByText('Country 1')).toBeInTheDocument();
      expect(screen.queryByText('Country 2')).not.toBeInTheDocument();
    });
  });

  it('shows error on API failure', async () => {
    mock.onGet(/name/).reply(500);

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search by/i), { 
      target: { value: 'test' } 
    });

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch countries/i)).toBeInTheDocument();
    });
  });
});