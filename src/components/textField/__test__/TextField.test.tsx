/**
 * @vi-environment jsdom
 */
import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';
import TextFieldComponent from '../TextFieldComponent';
import { Mocked, vi, type Mock } from 'vitest';

describe('Testfield Component', () => {
  const field = {
    name: 'publicAuthorityName',
    componentType: 'textfield',
    label: 'Codice IPA',
    hidden: false,
    rules: {
      required: 'Error',
    },
    required: false,
  };

  it('renders', () => {
    render(<TextFieldComponent field={field} onBlur={vi.fn} />);
    const component = screen.getByLabelText('Codice IPA');
    expect(component).toBeInTheDocument();
  });
});
