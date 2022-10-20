
/**
 * @jest-environment jsdom
 */

import React from "react";
import 'regenerator-runtime/runtime'
import { screen } from '@testing-library/react';
import LoginPage from '../Pages/LoginPage';
import 'regenerator-runtime/runtime'
import { reducer } from "./testReducer";

describe('LoginPage', () => {

  beforeEach(() => {
      reducer(<LoginPage setEmail={jest.fn()}/>)
    });
    
  it("includes change password form", () => {
    expect(screen.getByText("LOGIN")).toBeTruthy();
  });


});
 


