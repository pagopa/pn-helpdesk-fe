/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime';
import { screen } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { reducer } from '../../../mocks/mockReducer';

describe('LoginPage', () => {
  beforeEach(() => {
    reducer(<LoginPage />);
  });

  it('includes login form', () => {
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });
});
