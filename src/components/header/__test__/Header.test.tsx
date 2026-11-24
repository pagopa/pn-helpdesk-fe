/**
 * @vi-environment jsdom
 */
import { cleanup, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import 'regenerator-runtime/runtime';
import { reducer } from '../../../mocks/mockReducer';
import Header from '../Header';
import { Mocked, vi, type Mock } from 'vitest';

describe('Header Component', () => {
  afterEach(cleanup);

  beforeEach(async () => {
    vi.spyOn(React, 'useEffect').mockImplementation(() => vi.fn());
    reducer(<Header />);
  });

  it('renders header', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders header items', () => {
    expect(screen.getByText('PagoPA S.p.A.')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('show tooltip', async () => {
    expect(screen.getByText('PagoPA S.p.A.')).toBeInTheDocument();
    const button = screen.getAllByRole('button')[1];
    const user = userEvent.setup();
    await act(async () => {
      await user.hover(button);
    });
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  it('simulate log out button click and Anulla after that', async () => {
    const button = screen.getByTestId('logout-button');
    const user = userEvent.setup();
    await user.click(button);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();

    const modalButtons = await within(modal as HTMLElement).findAllByRole('button');
    expect(modalButtons).toHaveLength(2);
    const esciButton = screen.getByRole('button', {
      name: 'Annulla',
    });

    await user.click(esciButton);
  });

  it('simulate log out button click and Esci after that', async () => {
    const button = screen.getByTestId('logout-button');
    const user = userEvent.setup();
    await user.click(button);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();

    const modalButtons = await within(modal).findAllByRole('button');
    expect(modalButtons).toHaveLength(2);
    const esciButton = screen.getByRole('button', {
      name: 'Esci',
    });

    await user.click(esciButton);

    expect(window.location.pathname).toBe('/');
    expect(modal).not.toBeVisible();
  });
});
