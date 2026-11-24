import * as router from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { UPLOAD_STATUS_ENUM } from '../../../model';
import * as reactRedux from '../../../redux/hook';
import { StepDriverUpload } from '../StepDriverUpload';
import { Mocked, vi, type Mock } from 'vitest';

const initialUploadAndDownloadState = {
  download: {
    loading: false,
    error: false,
    force: false,
  },
  upload: {
    loading: false,
    error: undefined,
    status: UPLOAD_STATUS_ENUM.WAITING_FILE,
    attemptNotify: 0,
  },
};

describe('StepDriverUploadTest', function () {
  const mockDispatchFn = vi.fn();
  const mockNavigateFn = vi.fn();

  const spyUseSelector = vi.spyOn(reactRedux, 'useAppSelector');

  beforeEach(() => {
    const spyUseDispatch = vi.spyOn(reactRedux, 'useAppDispatch');
    const spyUseRouter = vi.spyOn(router, 'useNavigate');
    spyUseRouter.mockReturnValue(mockNavigateFn);
    spyUseDispatch.mockReturnValue(mockDispatchFn);
    changeStore(initialUploadAndDownloadState);
  });

  const changeStore = (tenderFormState: any) => {
    const reduxStore = {
      uploadAndDownload: tenderFormState,
    };
    spyUseSelector.mockImplementation((selector: any) => selector(reduxStore));
  };

  it('whenFirstRendered', async function () {
    render(<StepDriverUpload tenderCode={'1234'} />);
    expect(screen.queryByTestId('error-log-box')).not.toBeInTheDocument();
    const btnSave = screen.getByTestId('btn-save');
    expect(btnSave).toBeInTheDocument();
    expect(btnSave).toBeDisabled();

    const btnBackTender = screen.getByTestId('btn-back-tender');
    expect(btnBackTender).toBeInTheDocument();
    fireEvent.click(btnBackTender);

    expect(mockDispatchFn).toBeCalledWith({
      payload: {
        key: 0,
      },
      type: 'formTenderSlice/changeKey',
    });
  });

  it('whenFileIsSavedShowNextBtn', async function () {
    changeStore({
      ...initialUploadAndDownloadState,
      upload: {
        ...initialUploadAndDownloadState.upload,
        status: UPLOAD_STATUS_ENUM.DATA_SAVED,
      },
    });
    render(<StepDriverUpload tenderCode={'1234'} />);
    expect(screen.queryByTestId('error-log-box')).not.toBeInTheDocument();
    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();
    expect(btnNext).toBeEnabled();

    fireEvent.click(btnNext);

    expect(mockDispatchFn).toBeCalledWith({
      payload: undefined,
      type: 'formTenderSlice/goFinalStep',
    });
  });

  it('whenNotifySendRetry', async function () {
    changeStore({
      ...initialUploadAndDownloadState,
      upload: {
        ...initialUploadAndDownloadState.upload,
        status: UPLOAD_STATUS_ENUM.NOTIFY_IN_PROGRESS,
        uid: 'abc',
        retry: 1000,
      },
    });
    vi.useFakeTimers();
    vi.spyOn(global, 'setTimeout');
    render(<StepDriverUpload tenderCode={'1234'} />);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    expect(screen.queryByTestId('error-log-box')).not.toBeInTheDocument();
    const btnSave = screen.getByTestId('btn-save');
    expect(btnSave).toBeInTheDocument();
    expect(btnSave).toBeDisabled();
  });

  it('whenFileUploadedCallNotifyWithoutUid', async function () {
    changeStore({
      ...initialUploadAndDownloadState,
      upload: {
        ...initialUploadAndDownloadState.upload,
        status: UPLOAD_STATUS_ENUM.UPLOADED_FILE_S3,
      },
    });
    render(<StepDriverUpload tenderCode={'1234'} />);

    expect(screen.queryByTestId('error-log-box')).not.toBeInTheDocument();
    const btnSave = screen.getByTestId('btn-save');
    expect(btnSave).toBeInTheDocument();
    expect(btnSave).toBeEnabled();
    fireEvent.click(btnSave);

    expect(mockDispatchFn).toBeCalledWith({
      payload: true,
      type: 'snackbar/updateSnackbarOpened',
    });

    expect(mockDispatchFn).toBeCalledWith({
      payload: 500,
      type: 'snackbar/updateStatusCode',
    });
  });

  it('whenFileUploadedCallNotify', async function () {
    changeStore({
      ...initialUploadAndDownloadState,
      upload: {
        ...initialUploadAndDownloadState.upload,
        status: UPLOAD_STATUS_ENUM.UPLOADED_FILE_S3,
        uid: 'abs',
      },
    });
    render(<StepDriverUpload tenderCode={'1234'} />);

    expect(screen.queryByTestId('error-log-box')).not.toBeInTheDocument();
    const btnSave = screen.getByTestId('btn-save');
    expect(btnSave).toBeInTheDocument();
    expect(btnSave).toBeEnabled();
    fireEvent.click(btnSave);

    expect(mockDispatchFn).toBeCalledWith(expect.any(Function));
  });

  it('whenHaveErrorValidationExcel', async function () {
    changeStore({
      ...initialUploadAndDownloadState,
      upload: {
        ...initialUploadAndDownloadState.upload,
        status: UPLOAD_STATUS_ENUM.ERROR_VALIDATION_EXCEL,
        uid: 'abs',
        error: errorExcelColumn,
      },
    });
    render(<StepDriverUpload tenderCode={'1234'} />);

    expect(screen.getByTestId('error-log-box')).toBeInTheDocument();
    const btnSave = screen.getByTestId('btn-save');
    expect(btnSave).toBeInTheDocument();
    expect(btnSave).toBeDisabled();

    const errorsLog = screen.getAllByTestId('error-group');
    const errorTitle = screen.getByTestId('detail-error-message');
    expect(errorTitle).toBeInTheDocument();
    expect(errorTitle.textContent).toEqual(errorExcelColumn.detail);
    expect(errorsLog.length).toEqual(errorExcelColumn.errors.length);
  });
});

const errorExcelColumn = {
  detail: "Errore con la validazione dell'excel",
  errors: [
    {
      col: '1',
      row: '1',
      message: 'Partita iva obbligatoria',
    },
  ],
};

vi.mock('../../forms/download/DownloadForm', () => ({
  DownloadBox: () => <div data-testid="download-box-mock" />,
}));

vi.mock('../../forms/upload/UploadForm', () => ({
  UploadBox: () => <div data-testid="upload-box-mock" />,
}));
