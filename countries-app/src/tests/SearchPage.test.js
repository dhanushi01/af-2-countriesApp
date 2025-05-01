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

  const popularCountriesMock = [
    {
      name: { common: 'France' },
      cca3: 'FRA',
      capital: ['Paris'],
      region: 'Europe',
      flags: { png: 'france.png' }
    },
    {
      name: { common: 'South Korea' },
      cca3: 'KOR',
      capital: ['Seoul'],
      region: 'Asia',
      flags: { png: 'korea.png' }
    }
  ];

  it('renders search input and filter buttons', async () => {
    mock.onGet(/alpha\?codes=/).reply(200, popularCountriesMock);

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(await screen.findByPlaceholderText(/search by/i)).toBeInTheDocument();

    // Check filter buttons
    ['Name', 'Code', 'Capital', 'Currency', 'Language'].forEach(label => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });

    // Check popular countries render
    expect(await screen.findByText(/France/)).toBeInTheDocument();
    expect(await screen.findByText(/South Korea/)).toBeInTheDocument();
  });

  it('searches countries by name and shows result', async () => {
    mock.onGet(/name\/test/).reply(200, [
      {
        name: { common: 'Test Country' },
        cca3: 'TC',
        capital: ['Testville'],
        region: 'Test Region',
        flags: { png: 'test-flag.png' }
      }
    ]);

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search by/i), {
      target: { value: 'test' }
    });

    await waitFor(() => {
      expect(screen.getByText(/Test Country/)).toBeInTheDocument();
    });
  });

  it('filters countries by region', async () => {
    mock.onGet(/name\/test/).reply(200, [
      {
        name: { common: 'Europe Country' },
        cca3: 'EU1',
        region: 'Europe',
        capital: ['Capital 1'],
        flags: { png: 'flag1.png' }
      },
      {
        name: { common: 'Asia Country' },
        cca3: 'AS1',
        region: 'Asia',
        capital: ['Capital 2'],
        flags: { png: 'flag2.png' }
      }
    ]);

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
      expect(screen.getByText(/Europe Country/)).toBeInTheDocument();
      expect(screen.queryByText(/Asia Country/)).not.toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    mock.onGet(/name\/test/).reply(500);

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

  it('clears error when typing after failure', async () => {
    mock.onGet(/name\/fail/).reply(500);
    mock.onGet(/name\/recover/).reply(200, [
      {
        name: { common: 'Recovery Country' },
        cca3: 'RC',
        capital: ['Recovery'],
        region: 'Europe',
        flags: { png: 'recovery.png' }
      }
    ]);

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search by/i), {
      target: { value: 'fail' }
    });

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch countries/i)).toBeInTheDocument();
    });

    // Typing again should clear error
    fireEvent.change(screen.getByPlaceholderText(/search by/i), {
      target: { value: 'recover' }
    });

    await waitFor(() => {
      expect(screen.queryByText(/failed to fetch countries/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Recovery Country/)).toBeInTheDocument();
    });
  });

  it('switches filter method when button clicked', async () => {
    mock.onGet(/alpha\/TC/).reply(200, {
      name: { common: 'Code Country' },
      cca3: 'TC',
      capital: ['Code City'],
      region: 'Code Region',
      flags: { png: 'flag.png' }
    });

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    // Click filter by "Code"
    fireEvent.click(screen.getByRole('button', { name: 'Code' }));

    fireEvent.change(screen.getByPlaceholderText(/search by code/i), {
      target: { value: 'tc' }
    });

    await waitFor(() => {
      expect(screen.getByText(/Code Country/)).toBeInTheDocument();
    });
  });
});
