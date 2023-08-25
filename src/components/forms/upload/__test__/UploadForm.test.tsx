import { screen, render, fireEvent, act, waitFor } from '@testing-library/react';
import React from 'react';
import * as input from '@pagopa/mui-italia/dist/components/SingleFileInput/utils';
import { UploadBox } from '../UploadForm';
import { UPLOAD_STATUS_ENUM } from '../../../../model';
import * as reactRedux from '../../../../redux/hook';

const initialState = {
  download: {
    loading: false,
  },
  upload: {
    loading: false,
    error: undefined,
    status: UPLOAD_STATUS_ENUM.WAITING_FILE,
  },
};

describe('UploadBoxTest', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  const mockDispatch = jest.fn();

  const mockingStore = (state: any) => {
    const reduxStore = {
      uploadAndDownload: state,
    } as any;
    useSelectorMock.mockImplementation((selector: any) => selector(reduxStore));
    useDispatchMock.mockReturnValue(mockDispatch);
  };

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    mockingStore(initialState);
    jest.spyOn(input, 'generateRandomID').mockReturnValue('AAAAAA-AAAAAAA');
  });

  it('whenSelectedFile', async () => {
    render(<UploadBox />);

    const buttonLoadFromPc = screen.getByTestId('loadFromPc');
    expect(buttonLoadFromPc).toBeInTheDocument();
    const fileInput = screen.getByTestId('fileInput');
    expect(fileInput).toBeInTheDocument();

    fireEvent.change(fileInput.children!.item(0) as Element, {
      target: {
        files: {
          0: new File(['(⌐□_□)'], 'chucknorris.xlsx', { type: 'application/vnd.ms-excel' }),
          length: 1,
          item: () =>
            new File(['(⌐□_□)'], 'chucknorris.xlsx', { type: 'application/vnd.ms-excel' }),
        },
      },
    });

    await waitFor(async () => {
      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'uploadingDownloadingSlice/resetStateUpload',
      });
      expect(mockDispatch).toBeCalledWith(expect.any(Function));
    });

    const buttonClearInput = screen.getByTestId('CloseIcon');
    expect(buttonClearInput).toBeInTheDocument();

    fireEvent.click(buttonClearInput);

    await act(async () => {
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'uploadingDownloadingSlice/resetStateUpload',
      });
    });
  });

  it('whenUploadFile', async () => {
    render(<UploadBox />);

    const buttonLoadFromPc = screen.getByTestId('loadFromPc');
    expect(buttonLoadFromPc).toBeInTheDocument();
    const fileInput = screen.getByTestId('fileInput');
    expect(fileInput).toBeInTheDocument();

    fireEvent.change(fileInput.children!.item(0) as Element, {
      target: {
        files: {
          0: new File(['(⌐□_□)'], 'chucknorris.xlsx', { type: 'application/vnd.ms-excel' }),
          length: 1,
          item: () =>
            new File(['(⌐□_□)'], 'chucknorris.xlsx', { type: 'application/vnd.ms-excel' }),
        },
      },
    });

    await waitFor(async () => {
      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'uploadingDownloadingSlice/resetStateUpload',
      });
      expect(mockDispatch).toBeCalledWith(expect.any(Function));
    });
  });

  it('whenStatusIsRetrievingPresignedUrlThenChangeDescription', () => {
    const uploadState = {
      ...initialState.upload,
      status: UPLOAD_STATUS_ENUM.RETRIEVING_PRESIGNED_URL,
    };
    mockingStore({
      ...initialState,
      upload: uploadState,
    });
    render(<UploadBox />);
    const statusString = screen.getByTestId('status-description-upload');
    expect(statusString).toBeInTheDocument();
    expect(statusString.textContent).toEqual('In attesa del url di caricamento');
  });

  it('whenStatusIsUploadingFileThenChangeDescription', () => {
    const uploadState = {
      ...initialState.upload,
      status: UPLOAD_STATUS_ENUM.UPLOADING_FILE_S3,
    };
    mockingStore({
      ...initialState,
      upload: uploadState,
    });
    render(<UploadBox />);
    const statusString = screen.getByTestId('status-description-upload');
    expect(statusString).toBeInTheDocument();
    expect(statusString.textContent).toEqual('Caricamento file in corso');
  });

  it('whenStatusIsErrorPresignedUrlThenChangeDescription', () => {
    const uploadState = {
      ...initialState.upload,
      status: UPLOAD_STATUS_ENUM.ERROR_PRESIGNED_URL,
    };
    mockingStore({
      ...initialState,
      upload: uploadState,
    });
    render(<UploadBox />);
    const statusString = screen.getByTestId('status-description-upload');
    expect(statusString).toBeInTheDocument();
    expect(statusString.textContent).toEqual('Errore con il recupero del url di caricamento');
  });

  it('whenStatusIsErrorUploadingFileThenChangeDescription', () => {
    const uploadState = {
      ...initialState.upload,
      status: UPLOAD_STATUS_ENUM.ERROR_UPLOADING_FILE_S3,
    };
    mockingStore({
      ...initialState,
      upload: uploadState,
    });
    render(<UploadBox />);
    const statusString = screen.getByTestId('status-description-upload');
    expect(statusString).toBeInTheDocument();
    expect(statusString.textContent).toEqual('Errore con il caricamento del file');
  });
});
