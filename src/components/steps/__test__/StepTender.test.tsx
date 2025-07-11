import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import * as router from 'react-router';
import { AxiosError, AxiosResponse } from 'axios';
import { reducer } from '../../../mocks/mockReducer';
import * as reactRedux from '../../../redux/hook';
import { StepTender } from '../StepTender';
import * as paperChannelApi from '../../../api/paperChannelApi';
import { TenderDTOStatusEnum } from '../../../api/paperChannel';

const initialState = {
  activeKey: 1,
  fromUpload: false,
  formTender: {},
  formFsu: {},
  saveWithFile: {
    loading: false,
    result: 'HANDLE',
  },
};

const createdTenderDetailResponseDTO = {
  tender: {
    code: '1',
    name: 'BRT',
    startDate: '01-31-2021 00:00',
    endDate: '01-31-2022 00:00',
    status: TenderDTOStatusEnum.Created,
  },
  result: false,
  code: undefined,
};

const validatedTenderDetailResponseDTO = {
  tender: {
    code: '1',
    name: 'BRT',
    startDate: '01-31-2021 00:00',
    endDate: '01-31-2022 00:00',
    status: TenderDTOStatusEnum.Validated,
  },
  result: false,
  code: undefined,
  status: 404,
  data: {
    detail: 'La gara non può essere modifica!',
  },
};

jest.mock('../../../components/forms/tender/TenderForm', () => ({
  TenderForm: () => <div data-testid="tender-form-mock" />,
}));

describe('StepTenderTest', () => {
  const dispatchMockFn = jest.fn();
  const navigateMockFn = jest.fn();
  const useSelectorSpy = jest.spyOn(reactRedux, 'useAppSelector');
  const useParamsSpy = jest.spyOn(router, 'useParams');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useAppDispatch');
  const useNavigateSpy = jest.spyOn(router, 'useNavigate');
  const retrieveTenderDetailSpy = jest.spyOn(paperChannelApi, 'retrieveTenderDetails');

  const changeStore = (state: any = initialState) => {
    const reduxStore = { tenderForm: state };
    useSelectorSpy.mockImplementation((selector: any) => selector(reduxStore));
  };
  const changeResponse = (response: any, error: boolean) => {
    if (!error) {
      retrieveTenderDetailSpy.mockResolvedValue(response);
    } else {
      retrieveTenderDetailSpy.mockRejectedValue(
        new AxiosError('Error request', '404', undefined, undefined, response)
      );
    }
  };

  beforeEach(() => {
    useParamsSpy.mockReturnValue({ tenderCode: 'ABC' });
    useDispatchSpy.mockReturnValue(dispatchMockFn);
    useNavigateSpy.mockReturnValue(navigateMockFn);
    changeStore();
  });

  afterEach(() => {
    cleanup();
  });

  it('whenTenderDetailIsIsPresentWithStatusCreated', async () => {
    const newState = {
      ...initialState,
      formTender: {
        code: '1',
        name: 'BRT',
        startDate: '01-31-2021 00:00',
        endDate: '01-31-2022 00:00',
        status: TenderDTOStatusEnum.Created,
      },
    };
    changeStore(newState);
    reducer(<StepTender />);

    const tenderForm = screen.getByTestId('tender-form-mock');
    const buttonUpload = screen.getByTestId('btn-upload-tender');
    const buttonForward = screen.getByTestId('btn-go-forward');

    await act(async () => {
      expect(tenderForm).toBeInTheDocument();

      expect(buttonUpload).toBeInTheDocument();
      expect(buttonUpload).not.toBeDisabled();

      expect(buttonForward).toBeInTheDocument();
      expect(buttonForward).not.toBeDisabled();
    });

    fireEvent.click(buttonUpload);

    await waitFor(() => {
      expect(dispatchMockFn).toBeCalledWith({
        payload: undefined,
        type: 'formTenderSlice/goUploadStep',
      });
    });

    fireEvent.click(buttonForward);

    await waitFor(() => {
      expect(dispatchMockFn).toBeCalledWith({
        payload: undefined,
        type: 'formTenderSlice/goFSUStep',
      });
    });
  });

  it('whenTenderDetailIsNotPresent', async () => {
    useParamsSpy.mockReturnValue({ tenderCode: undefined });
    reducer(<StepTender />);

    const tenderForm = screen.getByTestId('tender-form-mock');
    expect(tenderForm).toBeInTheDocument();

    const buttonCarica = screen.getByText('Carica');
    expect(buttonCarica).toBeInTheDocument();
    expect(buttonCarica).toBeDisabled();

    const buttonAvanti = screen.getByText('Avanti');
    expect(buttonAvanti).toBeInTheDocument();
    expect(buttonAvanti).toBeDisabled();
  });

  it('whenRetrieveTenderDetailsReturnTenderWithStatusCreated', async () => {
    changeResponse(createdTenderDetailResponseDTO, false);
    reducer(<StepTender />);

    await waitFor(() => {
      expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: 'spinner/updateSpinnerOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: false,
        type: 'spinner/updateSpinnerOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: createdTenderDetailResponseDTO.tender,
        type: 'formTenderSlice/addedTender',
      });
    });
  });

  it('whenRetrieveTenderDetailsReturnTenderWithStatusValidated', async () => {
    changeResponse(validatedTenderDetailResponseDTO, false);
    reducer(<StepTender />);

    await waitFor(() => {
      expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: 'spinner/updateSpinnerOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: false,
        type: 'spinner/updateSpinnerOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: 'snackbar/updateSnackbarOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: validatedTenderDetailResponseDTO.status,
        type: 'snackbar/updateStatusCode',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: validatedTenderDetailResponseDTO.data.detail,
        type: 'snackbar/updateMessage',
      });
    });

    expect(navigateMockFn).toBeCalledTimes(1);
  });

  it('whenRetrieveTenderDetailsThrowError', async () => {
    const response = {
      status: 404,
      data: {
        detail: 'Gara non trovata !',
      },
    } as AxiosResponse;
    changeResponse(response, true);

    reducer(<StepTender />);

    await waitFor(() => {
      expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: 'spinner/updateSpinnerOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: false,
        type: 'spinner/updateSpinnerOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: 'snackbar/updateSnackbarOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: response.status,
        type: 'snackbar/updateStatusCode',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: response.data.detail,
        type: 'snackbar/updateMessage',
      });
    });
  });

  it('whenButtonCancelActionPositiveIsCalled', async () => {
    useParamsSpy.mockReturnValue({ tenderCode: undefined });
    reducer(<StepTender />);

    const buttonDialog = screen.getByTestId('btn-back-tenders');
    expect(buttonDialog).toBeInTheDocument();

    fireEvent.click(buttonDialog);

    const alertDialog = screen.getByTestId('alert-dialog');
    expect(alertDialog).toBeInTheDocument();

    const buttonSi = screen.getByText('Si');
    expect(buttonSi).toBeInTheDocument();
    fireEvent.click(buttonSi);

    await waitFor(() => {
      expect(navigateMockFn).toBeCalledTimes(1);
      expect(dispatchMockFn).toBeCalledWith({
        payload: undefined,
        type: 'formTenderSlice/clearFormState',
      });
    });
  });
});
