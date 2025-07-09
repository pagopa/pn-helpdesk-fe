import { fireEvent, render, screen } from '@testing-library/react';
import CustomCard from '../CustomCard';

describe('CustomCard test', () => {
  const actionMocked = jest.fn();
  const cardBodyMock = <p data-testid="mocked-body">Mocked body</p>;
  const cardHeaderMock = {
    title: 'HeaderMocked',
  };
  const cardActionsMock = [
    {
      id: 'mock-action-1',
      component: <button>Mocked button</button>,
      onClick: actionMocked,
    },
  ];
  beforeEach(() => {
    render(
      <CustomCard
        cardId="mocked-card-1"
        cardBody={cardBodyMock}
        cardHeader={cardHeaderMock}
        cardActions={cardActionsMock}
      />
    );
  });

  it('render a custom card', () => {
    const title = screen.getByText(cardHeaderMock.title);
    expect(title).toBeInTheDocument();
    const body = screen.getByTestId('mocked-body');
    expect(body).toBeInTheDocument();
    const action = screen.getByRole('button', { name: 'Mocked button' });
    expect(action).toBeInTheDocument();
  });

  it('click action', () => {
    const action = screen.getByRole('button', { name: 'Mocked button' });
    expect(action).toBeInTheDocument();
    fireEvent.click(action);
    expect(actionMocked).toBeCalled();
  });
});
