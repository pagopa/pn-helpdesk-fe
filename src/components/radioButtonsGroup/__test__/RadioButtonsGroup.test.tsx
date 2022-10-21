
/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react';
import RadioButtonsGroup from '../RadioButtonsGroup';

const props = {
    field: {
        name: "recipientType",
        componentType: "radioButtons",
        label: "Tipo personale",
        hidden: false,
        options: [
            {
                option: "Persona Fisica",
                value: "PF"
            }, 
            {
                option: "Persona Giuridica",
                value: "PG"
            }]
    },
    onChange: jest.fn(),
    value: "PF"
}

describe('RadioButtonsGroup Component', () => {

  it('renders component', () => {
    render(<RadioButtonsGroup field={props.field} onChange={props.onChange} value={props.value} />);
    expect(screen.getAllByRole("radiogroup").length).toEqual(1)
  });

});