import "regenerator-runtime/runtime"
import React from "react";
import * as reactRedux from "../../../../redux/hook";
import configureStore from "redux-mock-store";
import {UPLOAD_STATUS_ENUM} from "../../../../model";
import {fireEvent, render, screen, act} from "@testing-library/react";
import {DownloadBox} from "../DownloadForm";
import * as  utils from "../../../../helpers/utils";


const initialState = {
  download : {
    loading: false
  },
  upload: {
    loading: false,
      error: undefined,
      status: UPLOAD_STATUS_ENUM.WAITING_FILE
  }
}

describe("TenderPageTest", () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  const mockDownloadFile = jest.fn();
  const mockDispatch = jest.fn();

  const mockingStore  = (state:any) => {
    useSelectorMock.mockReturnValue(state);
    const mockStore = configureStore();
    let updatedStore = mockStore(state);

    useDispatchMock.mockReturnValue(mockDispatch);
    updatedStore.dispatch = mockDispatch;
  }

  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    jest.spyOn(utils, "downloadFile").mockImplementation(mockDownloadFile);
    mockingStore(initialState);
  });

  it("whenDownloadBoxRenderedFirstTime", async () =>{
    render(<DownloadBox/>)
    const buttonCancelState = screen.queryByTestId("button-cancel-state");
    expect(buttonCancelState).not.toBeInTheDocument()

    const progressBar = screen.queryByTestId("progress-bar-download");
    expect(progressBar).not.toBeInTheDocument()

    const buttonDownloadFile = screen.queryByTestId("button-download-exist-file");
    expect(buttonDownloadFile).not.toBeInTheDocument()

    const buttonRequestDownload = screen.getByTestId("button-start-download")
    expect(buttonRequestDownload).toBeInTheDocument()

    fireEvent.click(buttonRequestDownload);
    await act(async () => {
      expect(mockDispatch).toBeCalledTimes(1)
    })

  })

  it("whenStateIsLoadingThenProgressBarShowed", () => {
    const downloadState = {
      ...initialState.download,
      loading: true,
    }

    mockingStore({
      ...initialState,
      download : downloadState
    })

    render(<DownloadBox/>)

    const buttonCancelState = screen.queryByTestId("button-cancel-state");
    expect(buttonCancelState).not.toBeInTheDocument()

    const buttonDownloadFile = screen.queryByTestId("button-download-exist-file");
    expect(buttonDownloadFile).not.toBeInTheDocument()

    const progressBar = screen.getByTestId("progress-bar-download");
    expect(progressBar).toBeInTheDocument()

    const buttonRequestDownload = screen.queryByTestId("button-start-download")
    expect(buttonRequestDownload).not.toBeInTheDocument()
  })

  it("whenHaveADataThenButtonDownloadShowed", async () => {
    const downloadState = {
      ...initialState.download,
      data: "https://google.it",
    }

    mockingStore({
      ...initialState,
      download : downloadState
    })

    render(<DownloadBox/>)

    const buttonCancelState = screen.getByTestId("button-cancel-state");
    expect(buttonCancelState).toBeInTheDocument()

    const buttonDownloadFile = screen.getByTestId("button-download-exist-file");
    expect(buttonDownloadFile).toBeInTheDocument()

    const progressBar = screen.queryByTestId("progress-bar-download");
    expect(progressBar).not.toBeInTheDocument()

    const buttonRequestDownload = screen.queryByTestId("button-start-download")
    expect(buttonRequestDownload).not.toBeInTheDocument()

    fireEvent.click(buttonDownloadFile);
    await act( async () => {
      await expect(mockDownloadFile).toBeCalledTimes(1);
      expect(mockDownloadFile).toBeCalledWith(downloadState.data);
    })

    fireEvent.click(buttonCancelState);
    await act( async () => {
      await expect(mockDispatch).toBeCalledTimes(1);
    })

  })


  it("whenHaveAErrorThenDispatchActions", async () => {
    const downloadState = {
      ...initialState.download,
      error: true,
    }

    mockingStore({
      ...initialState,
      download : downloadState
    })

    render(<DownloadBox/>)

    await act( async () => {
      await expect(mockDispatch).toBeCalledTimes(3);
    })

  })

  it("whenHaveARetryThenDispatchActions", async () => {
    const downloadState = {
      ...initialState.download,
      uid: "12345",
      retry: 1000,
      loading: true
    }
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    mockingStore({
      ...initialState,
      download : downloadState
    })

    render(<DownloadBox/>)

    await act( async () => {
      await expect(setTimeout).toHaveBeenCalledTimes(1);
      await expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), downloadState.retry);
    })

  })



});