/**
 * @vi-environment jsdom
 */
import 'regenerator-runtime/runtime';
import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import SearchPage from '../SearchPage';
import { reducer } from '../../../mocks/mockReducer';
import { Mocked, vi, type Mock } from 'vitest';

describe('SearchPage', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.spyOn(React, 'useEffect').mockImplementation(() => vi.fn());
    reducer(<SearchPage />);
  });

  it('renders header and footer', () => {
    expect(screen.getAllByRole('banner').length).toEqual(2);
  });

  it('renders form', () => {
    expect(screen.getByRole('heading', { name: /Ricerca/i })).toBeInTheDocument();
  });
});
