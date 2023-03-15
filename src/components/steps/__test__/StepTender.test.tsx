import { reducer } from "../../../mocks/mockReducer";
import { act, cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import * as reactRedux from "../../../redux/hook";
import { StepTender } from "../StepTender";
import * as paperChannelApi from "../../../api/paperChannelApi";
import { retrieveTenderDetails } from "../../../api/paperChannelApi";
import { TenderDTOStatusEnum } from "../../../api/paperChannel";
import * as router from "react-router";
import { AxiosError, AxiosResponse } from "axios";


const initialState = {
  activeKey: 1,
  fromUpload: false,
  formTender: { },
  formFsu: {},
  saveWithFile: {
    loading: false,
    result: "HANDLE"
  }
}

const createdTenderDetailResponseDTO = {
  tender: {
    code: "1",
    name: "BRT",
    startDate: "01-31-2021 00:00",
    endDate: "01-31-2022 00:00",
    status: TenderDTOStatusEnum.Created
  },
  result: false,
  code: undefined
}

const validatedTenderDetailResponseDTO = {
  tender: {
    code: "1",
    name: "BRT",
    startDate: "01-31-2021 00:00",
    endDate: "01-31-2022 00:00",
    status: TenderDTOStatusEnum.Validated
  },
  result: false,
  code: undefined,
  status: 404,
  data: {
    detail: "La gara non può essere modifica!"
  }
}

jest.mock("../../../components/forms/tender/TenderForm",
  () => ({
    TenderForm: () => {
      // @ts-ignore
      return <mock-table data-testid="tender-form-mock"/>;
    },
  })
);

describe("StepTenderTest", () => {

  const dispatchMockFn = jest.fn();
  const navigateMockFn = jest.fn();
  const useSelectorSpy = jest.spyOn(reactRedux, 'useAppSelector');
  const useParamsSpy = jest.spyOn(router, 'useParams');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useAppDispatch');
  const useNavigateSpy = jest.spyOn(router, "useNavigate");
  const retrieveTenderDetailSpy = jest.spyOn(paperChannelApi, "retrieveTenderDetails");

  const changeStore = (state:any = initialState) => {
    const reduxStore = { tenderForm: state }
    useSelectorSpy.mockImplementation((selector:any) => selector(reduxStore));
  }
  const changeResponse = (response:any, error:boolean) => {
    if(!error) {
      retrieveTenderDetailSpy.mockResolvedValue(response);
    }
    else {
      retrieveTenderDetailSpy.mockRejectedValue(new AxiosError("Error request", "404", undefined, undefined, response));
    }
  }

  beforeEach(() => {
    useParamsSpy.mockReturnValue({tenderCode: "ABC"})
    useDispatchSpy.mockReturnValue(dispatchMockFn);
    useNavigateSpy.mockReturnValue(navigateMockFn);
    changeStore()
  });

  afterEach(() => {
    cleanup()
  });


  it('whenTenderDetailIsIsPresentWithStatusCreated', async () => {
    const newState = {
      ...initialState,
      formTender: {
        code: "1",
        name: "BRT",
        startDate: "01-31-2021 00:00",
        endDate: "01-31-2022 00:00",
        status: TenderDTOStatusEnum.Created
      }
    }
    changeStore(newState);
    reducer(<StepTender />);

    const tenderForm = screen.getByTestId("tender-form-mock");
    const buttonUpload = screen.getByTestId("btn-upload-tender");
    const buttonForward = screen.getByTestId("btn-go-forward");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      expect(tenderForm).toBeInTheDocument();

      expect(buttonUpload).toBeInTheDocument();
      expect(buttonUpload).not.toBeDisabled()

      expect(buttonForward).toBeInTheDocument();
      expect(buttonForward).not.toBeDisabled()
    })


    fireEvent.click(buttonUpload);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await waitFor(async () => {
      await expect(dispatchMockFn).toBeCalledWith({
        payload: undefined,
        type: "formTenderSlice/goUploadStep"
      })
    })

    fireEvent.click(buttonForward);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await waitFor(async () => {
      await expect(dispatchMockFn).toBeCalledWith({
        payload: undefined,
        type: "formTenderSlice/goFSUStep"
      })
    })
  })

  it('whenTenderDetailIsNotPresent', async () => {
    useParamsSpy.mockReturnValue({tenderCode: undefined})
    reducer(<StepTender />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const tenderForm = screen.getByTestId("tender-form-mock");
      expect(tenderForm).toBeInTheDocument();

      const buttonCarica = screen.getByText("Carica");
      expect(buttonCarica).toBeInTheDocument();
      expect(buttonCarica).toBeDisabled()

      const buttonAvanti = screen.getByText("Avanti");
      expect(buttonAvanti).toBeInTheDocument();
      expect(buttonAvanti).toBeDisabled()
    })
  })

  it("whenRetrieveTenderDetailsReturnTenderWithStatusCreated", async () => {
    changeResponse(createdTenderDetailResponseDTO, false);
    reducer(<StepTender />);

    await waitFor(async () => {
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "spinner/updateSpinnerOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: false,
        type: "spinner/updateSpinnerOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: createdTenderDetailResponseDTO.tender,
        type: "formTenderSlice/addedTender"
      })
    })
  })

  it("whenRetrieveTenderDetailsReturnTenderWithStatusValidated", async () => {
    changeResponse(validatedTenderDetailResponseDTO, false);
    reducer(<StepTender />);

    await waitFor(async () => {
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "spinner/updateSpinnerOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: false,
        type: "spinner/updateSpinnerOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "snackbar/updateSnackbacrOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: validatedTenderDetailResponseDTO.status,
        type: "snackbar/updateStatusCode"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: validatedTenderDetailResponseDTO.data.detail,
        type: "snackbar/updateMessage"
      })
    })

    expect(navigateMockFn).toBeCalledTimes(1);
  })

  it('whenRetrieveTenderDetailsThrowError', async () => {
    const response = {
      status: 404,
      data: {
        detail: "Gara non trovata !"
      }
    } as AxiosResponse
    changeResponse(response, true);

    reducer(<StepTender />);

    await waitFor(async () => {
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "spinner/updateSpinnerOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: false,
        type: "spinner/updateSpinnerOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "snackbar/updateSnackbacrOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: response.status,
        type: "snackbar/updateStatusCode"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: response.data.detail,
        type: "snackbar/updateMessage"
      })
    })
  })

  it("whenButtonCancelActionPositiveIsCalled", async () => {
    useParamsSpy.mockReturnValue({tenderCode: undefined})
    reducer(<StepTender />);

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()

    const buttonDialog = screen.getByTestId("btn-back-tenders");
    expect(buttonDialog).toBeInTheDocument();

    fireEvent.click(buttonDialog);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await waitFor(async () => {
      await expect(navigateMockFn).toBeCalledTimes(1);
      await expect(dispatchMockFn).toBeCalledWith({
          payload: undefined,
          type: "formTenderSlice/clearFormState"
      })
    })
  })

});
