import { fireEvent, RenderResult, screen, waitFor } from '@testing-library/react';
import * as hookRouter from 'react-router';
import { reducer } from '../../../mocks/mockReducer';
import * as hook from '../../../redux/hook';
import * as hookPaperChannel from '../../../hooks/usePaperChannel';
import { TenderDTO } from '../../../api/paperChannel';
import { ButtonsActionTenderTable } from '../ButtonsActionTenderTable';
import { CREATE_TENDER_ROUTE, TENDER_DETAIL_ROUTE } from '../../../navigation/router.const';
import * as hookPermission from '../../../hooks/useHasPermissions';
import { vi, type Mock } from 'vitest';

const tenderCreated: TenderDTO = {
  code: 'ABC-tender-created',
  endDate: '',
  name: '',
  startDate: '',
  status: 'CREATED',
};

const tenderValidated: TenderDTO = {
  code: 'ABC-tender-validated',
  endDate: '',
  name: '',
  startDate: '',
  status: 'VALIDATED',
};

const tenderProgress: TenderDTO = {
  code: 'ABC-tender-validated',
  endDate: '',
  name: '',
  startDate: '',
  status: 'IN_PROGRESS',
};

describe('ButtonActionsTenderTable Test', () => {
  let mockDispatchFn: Mock;
  let mockDeleteFn: Mock;
  let mockNavigateFn: Mock;
  let mockChangeStautsFn: Mock;

  const setHasPermission = (value: boolean = true) => {
    const spyUsePermission = vi.spyOn(hookPermission, 'useHasPermissions');
    spyUsePermission.mockReturnValue(value);
  };

  beforeEach(async () => {
    const scenario = await doPrepareTestScenario();
    mockDispatchFn = scenario.mockDispatchFn;
    mockDeleteFn = scenario.mockDeleteFn;
    mockNavigateFn = scenario.mockNavigateFn;
    mockChangeStautsFn = scenario.mockChangeStatusFn;
    setHasPermission();
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('whenButtonRendered', async () => {
    reducer(<ButtonsActionTenderTable value={tenderCreated} />);
    const element = screen.getByTestId('menu-button-tender');
    const menuElement = screen.queryByTestId('action-menu-button-tender');

    expect(menuElement).toBeNull();
    expect(element).toBeInTheDocument();
  });

  it('whenClickButtonShowMenuOnlyItemTenderCREATED', async () => {
    reducer(<ButtonsActionTenderTable value={tenderCreated} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();
    expect(screen.getByTestId('edit-tender')).toBeInTheDocument();
    expect(screen.getByTestId('detail-tender')).toBeInTheDocument();
    expect(screen.getByTestId('validated-tender')).toBeInTheDocument();
    expect(screen.getByText('Convalida')).toBeInTheDocument();
    expect(screen.getByTestId('delete-tender')).toBeInTheDocument();
  });

  it('whenClickButtonShowMenuOnlyItemTenderCREATEDWithPermissionFalse', async () => {
    setHasPermission(false);
    reducer(<ButtonsActionTenderTable value={tenderCreated} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-tender')).not.toBeInTheDocument();
    expect(screen.getByTestId('detail-tender')).toBeInTheDocument();
    expect(screen.queryByTestId('validated-tender')).not.toBeInTheDocument();
    expect(screen.queryByTestId('delete-tender')).not.toBeInTheDocument();
  });

  it('whenClickButtonShowMenuOnlyItemTenderVALIDATED', async () => {
    reducer(<ButtonsActionTenderTable value={tenderValidated} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-tender')).not.toBeInTheDocument();
    expect(screen.getByTestId('detail-tender')).toBeInTheDocument();
    expect(screen.getByTestId('validated-tender')).toBeInTheDocument();
    expect(screen.getByText('Torna in Bozza')).toBeInTheDocument();
    expect(screen.queryByTestId('delete-tender')).not.toBeInTheDocument();
  });

  it('whenClickButtonShowMenuOnlyItemTenderVALIDATEDWithPermissionFalse', async () => {
    setHasPermission(false);
    reducer(<ButtonsActionTenderTable value={tenderValidated} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-tender')).not.toBeInTheDocument();
    expect(screen.getByTestId('detail-tender')).toBeInTheDocument();
    expect(screen.queryByTestId('validated-tender')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Torna in Bozza')).not.toBeInTheDocument();
    expect(screen.queryByTestId('delete-tender')).not.toBeInTheDocument();
  });

  it('whenClickButtonShowMenuOnlyItemTenderIN_PROGRESS', async () => {
    reducer(<ButtonsActionTenderTable value={tenderProgress} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-tender')).not.toBeInTheDocument();
    expect(screen.getByTestId('detail-tender')).toBeInTheDocument();
    expect(screen.queryByTestId('validated-tender')).not.toBeInTheDocument();
    expect(screen.queryByTestId('delete-tender')).not.toBeInTheDocument();
  });

  it('whenClickShowDetailMenuItemTender', async () => {
    reducer(<ButtonsActionTenderTable value={tenderCreated} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();

    const detailMenuItem = screen.getByTestId('detail-tender');
    expect(detailMenuItem).toBeInTheDocument();

    fireEvent.click(detailMenuItem);
    await waitFor(async () => {
      expect(mockDispatchFn).toBeCalledTimes(1);
      expect(mockDispatchFn).toBeCalledWith({
        payload: {
          ...tenderCreated,
        },
        type: 'tenderSlice/addSelected',
      });
      expect(mockNavigateFn).toBeCalledTimes(1);
      expect(mockNavigateFn).toBeCalledWith(TENDER_DETAIL_ROUTE);
    });
  });

  it('whenClickEditMenuItemTender', async () => {
    reducer(<ButtonsActionTenderTable value={tenderCreated} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();

    const editMenuItem = screen.getByTestId('edit-tender');
    expect(editMenuItem).toBeInTheDocument();

    fireEvent.click(editMenuItem);
    await waitFor(async () => {
      expect(mockNavigateFn).toBeCalledTimes(1);
      expect(mockNavigateFn).toBeCalledWith(CREATE_TENDER_ROUTE + '/' + tenderCreated.code);
    });
  });

  it('whenClickDeleteMenuItemTender', async () => {
    reducer(<ButtonsActionTenderTable value={tenderCreated} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();

    const deleteMenuItem = screen.getByTestId('delete-tender');
    expect(deleteMenuItem).toBeInTheDocument();

    fireEvent.click(deleteMenuItem);
    await waitFor(async () => {
      expect(mockDeleteFn).toBeCalledTimes(1);
      expect(mockDeleteFn).toBeCalledWith(tenderCreated.code);
    });
  });

  it('whenClickChangeStatusMenuItemTender', async () => {
    reducer(<ButtonsActionTenderTable value={tenderCreated} />);
    const element = screen.getByTestId('menu-button-tender');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-tender')).toBeInTheDocument();

    const changeStatusMenu = screen.getByTestId('validated-tender');
    expect(changeStatusMenu).toBeInTheDocument();

    fireEvent.click(changeStatusMenu);
    await waitFor(async () => {
      expect(mockChangeStautsFn).toBeCalledTimes(1);
      expect(mockChangeStautsFn).toBeCalledWith(tenderCreated.code, tenderCreated.status);
    });
  });
});

type TestScenario = {
  result?: RenderResult;
  mockDispatchFn: Mock;
  mockDeleteFn: Mock;
  mockNavigateFn: Mock;
  mockChangeStatusFn: Mock;
};

async function doPrepareTestScenario(): Promise<TestScenario> {
  const mockDispatchFn = vi.fn(() => ({
    then: () => Promise.resolve(),
  }));

  const mockNavigateFn = vi.fn();

  const mockDeleteFn = vi.fn();
  const mockChangeStatusFn = vi.fn();

  // mock dispatch
  const useDispatchSpy = vi.spyOn(hook, 'useAppDispatch');
  useDispatchSpy.mockReturnValue(mockDispatchFn as any);

  const useNavigateRouter = vi.spyOn(hookRouter, 'useNavigate');
  useNavigateRouter.mockReturnValue(mockNavigateFn as any);

  const mockUsePaperChannelHook = vi.spyOn(hookPaperChannel, 'usePaperChannel');
  mockUsePaperChannelHook.mockReturnValue({
    deleteCost(): Promise<void> {
      return Promise.resolve(undefined);
    },
    changeStatusTender: mockChangeStatusFn,

    deleteDriver(): Promise<void> {
      return Promise.resolve(undefined);
    },
    deleteTender: mockDeleteFn,
  });

  return { mockDispatchFn, mockDeleteFn, mockNavigateFn, mockChangeStatusFn };
}
