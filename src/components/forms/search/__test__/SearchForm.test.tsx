/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reducer } from '../../../../mocks/mockReducer';
import SearchForm from '../SearchForm';
import apiRequests from '../../../../api/apiRequests';

describe('SearchForm', () => {
  
  beforeEach(async () => {
    const apiSpyGetPersonsLogs = jest.spyOn(apiRequests, 'getPersonsLogs');
    apiSpyGetPersonsLogs.mockImplementation(() => Promise.resolve({ items: [] }));
    const apiSpyGetPersonId = jest.spyOn(apiRequests, 'getPersonId');
    apiSpyGetPersonId.mockImplementation();
    const apiSpyGetSessionId = jest.spyOn(apiRequests, 'getSessionLogs');
    apiSpyGetSessionId.mockImplementation(() => {
      console.log('mock getSessionLogs');
      return Promise.resolve({ items: [] });
    });
  });
  
  afterEach(cleanup);

  it('renders component', async () => {
    reducer(<SearchForm />);
    expect(screen.getByRole('heading', { name: /Ricerca/i })).toBeInTheDocument();
  });

  it('renders input fields', async () => {
    reducer(<SearchForm />);
    const ticketNumber = await screen.findByRole('textbox', {
      name: 'Numero Ticket',
    });
    const fiscalCode = await screen.findByRole('textbox', {
      name: 'Codice Fiscale',
    });
    const recipientTypeRadionGroup = await screen.findByRole('radiogroup');
    const recipientTypeRadionInputs = await screen.findAllByRole('radio');

    expect(ticketNumber).toBeInTheDocument();
    expect(fiscalCode).toBeInTheDocument();
    expect(recipientTypeRadionGroup).toBeInTheDocument();
    expect(recipientTypeRadionInputs.length).toEqual(2);

    recipientTypeRadionInputs.forEach((input) => {
      expect(input.getAttribute('name')).toEqual('recipientType');
      expect(['PF', 'PG'].includes(input.getAttribute('value')!)).toBeTruthy();
    });
  });

  it('renders resetta filtri button', async () => {
    reducer(<SearchForm />);
    const button = await screen.findByRole('button', {
      name: 'Resetta filtri',
    });
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('disabled')).toEqual(null);
  });

  it('renders ricerca button and be disabled', async () => {
    reducer(<SearchForm />);
    const button = await screen.findByRole('button', {
      name: 'Ricerca',
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
  });

  it('fill fields and click ricerca', async () => {
    reducer(<SearchForm />);
    const ticketNumber = await screen.findByRole('textbox', {
      name: 'Numero Ticket',
    });
    const fiscalCode = await screen.findByRole('textbox', {
      name: 'Codice Fiscale',
    });

    const user = userEvent.setup();
    await user.clear(ticketNumber);
    await user.type(ticketNumber, 'abc');
    await user.clear(fiscalCode);
    await user.type(fiscalCode, 'MLLSNT82P65Z404U');
    const button = await screen.findByRole('button', {
      name: 'Ricerca',
    });
    await user.click(button);
    expect(button).not.toBeDisabled();
  });

  it('fill fields and click resetta filtri', async () => {
    reducer(<SearchForm />);
    const ticketNumber = await screen.findByRole('textbox', {
      name: 'Numero Ticket',
    });
    const fiscalCode = await screen.findByRole('textbox', {
      name: 'Codice Fiscale',
    });

    const user = userEvent.setup();
    await user.clear(ticketNumber);
    await user.type(ticketNumber, 'abc');
    await user.clear(fiscalCode);
    await user.type(fiscalCode, 'MLLSNT82P65Z404U');

    const button = await screen.findByRole('button', {
      name: 'Resetta filtri',
    });
    await user.click(button);
    expect(ticketNumber).toHaveValue('');
    expect(fiscalCode).toHaveValue('');
  });

  it('change Tipo estrazione', async () => {
    reducer(<SearchForm />);
    const selectMenu = screen.getByRole('combobox');
    expect(selectMenu).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(selectMenu);
    const ottieniLogCompleti = await screen.findByRole('option', {
      name: 'Ottieni log completi',
    });
    expect(ottieniLogCompleti).toBeInTheDocument();

    await user.click(ottieniLogCompleti);
    expect(selectMenu.textContent).toEqual('Ottieni log completi');
  });

  it('change Tipo estrazione to Ottieni log completi and make request', async () => {
    reducer(<SearchForm />);
    const selectMenu = screen.getByRole('combobox');
    expect(selectMenu).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(selectMenu);
    const ottieniLogCompleti = await screen.findByRole('option', {
      name: 'Ottieni log completi',
    });
    expect(ottieniLogCompleti).toBeInTheDocument();

    await user.click(ottieniLogCompleti);
    expect(selectMenu.textContent).toEqual('Ottieni log completi');

    const ticketNumber = await screen.findByRole('textbox', {
      name: 'Numero Ticket',
    });
    const fiscalCode = await screen.findByRole('textbox', {
      name: 'Codice Fiscale',
    });

    await user.clear(ticketNumber);
    await user.type(ticketNumber, 'abc');
    await user.clear(fiscalCode);
    await user.type(fiscalCode, 'MLLSNT82P65Z404U');
    const button = await screen.findByRole('button', {
      name: 'Ricerca',
    });
    await user.click(button);
  });

  it('change Tipo estrazione to Ottieni log di sessione', async () => {
    reducer(<SearchForm />);

    const selectMenu = screen.getByRole('combobox');
    expect(selectMenu).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(selectMenu);
    const OttieniLogDiSessione = await screen.findByRole('option', {
      name: 'Ottieni log di sessione',
    });
    expect(OttieniLogDiSessione).toBeInTheDocument();

    await user.click(OttieniLogDiSessione);
    expect(selectMenu.textContent).toEqual('Ottieni log di sessione');

    const ticketNumber = await screen.findByRole('textbox', {
      name: 'Numero Ticket',
    });
    expect(ticketNumber).toBeInTheDocument();

    const jti = await screen.findByRole('textbox', {
      name: 'Identificativo di sessione (jti)',
    });
    expect(jti).toBeInTheDocument();

    const checkbox = await screen.findByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    const datePickers = await screen.findByTestId('data-range-picker');
    expect(datePickers).toBeInTheDocument();

    await user.clear(ticketNumber);
    await user.type(ticketNumber, 'abc');
    await user.clear(jti);
    await user.type(jti, 'kj5l-77-abc');
    const button = await screen.findByRole('button', {
      name: 'Ricerca',
    });
    await user.click(button);
  });
});
