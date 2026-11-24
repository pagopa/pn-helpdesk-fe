/**
 * @vi-environment jsdom
 */
import React from 'react';
import 'regenerator-runtime/runtime';
import { fireEvent, screen } from '@testing-library/react';
import { FieldsProps } from '../../formFields/FormFields';
import DatePickerComponent from '../DatePickerComponent';
import { reducer } from '../../../mocks/mockReducer';
import { vi, type Mock } from 'vitest';

const field: FieldsProps = {
  name: 'referenceMonth',
  componentType: 'datePicker',
  label: 'Mese',
  hidden: false,
  view: ['month', 'year'],
  type: 'month',
  format: 'yyyy-MM',
  required: false,
};

const november2022 = new Date(2022, 10, 1);

describe('DatePickerComponent', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        media: query,
        matches: query === '(pointer: fine)',
        onchange: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        addListener: () => { },
        removeListener: () => { },
        dispatchEvent: () => false,
      }),
    });
  });

  it('renders date picker component with value', () => {
    reducer(
      <DatePickerComponent
        field={field}
        value={november2022}
        onChange={vi.fn()}
        onBlur={vi.fn()}
      />
    );
    const input = screen.getByRole('textbox', {
      name: 'Mese',
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('2022-11');
  });

  it('test changing value', async () => {
    let emittedValue = '';
    const handleChange = vi.fn((value: string) => {
      emittedValue = value;
    });
    const handleBlur = vi.fn();

    const rendered = reducer(
      <DatePickerComponent
        field={field}
        value={'2022-09'}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
    const input = await screen.findByRole('textbox', {
      name: 'Mese',
    });

    fireEvent.change(input, {
      target: { value: '2022-11' },
    });
    expect(input).toHaveValue('2022-11');
    expect(handleChange).toHaveBeenCalled();
    expect(emittedValue).toBe('2022-11-01T00:00:00.000Z');

    rendered.rerender(
      <DatePickerComponent
        field={field}
        value={emittedValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );

    expect(await screen.findByRole('textbox', { name: 'Mese' })).toHaveValue('2022-11');
  });
});
