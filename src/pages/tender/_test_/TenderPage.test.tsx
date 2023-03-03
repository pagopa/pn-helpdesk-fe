import TenderPage from "../TenderPage";
import * as reactRedux from "../../../redux/hook";
import configureStore from "redux-mock-store";
import { screen, act, cleanup, within } from "@testing-library/react";
import { reducer } from "../../../mocks/mockReducer";
import * as router from "react-router";
import userEvent from "@testing-library/user-event";
import { Page, Tender } from "../../../model";
import { TenderDTO, TenderDTOStatusEnum } from "../../../api/paperChannel";
import { TenderDetailPage } from "../TenderDetailPage";


describe(TenderPage, () => {

  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  const useNavigate = jest.spyOn(router, 'useNavigate');//.mockImplementation(() => jest.fn())
  const mockingStore  = (state:any) => {
    useSelectorMock.mockReturnValue(state);
    const mockStore = configureStore();
    let updatedStore = mockStore(state);
    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    updatedStore.dispatch = mockDispatch;
  }
  const mockingNavigate  = () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate)
  }

  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    useNavigate.mockClear()

    const tenderState = {
      tender: {
        loading: false,
        allData: {
          page: 1,
          size: 10,
          total: 11,
          content: Array<Tender>({
              code: "1",
              name: "BRT",
              startDate: "01-31-2021 00:00",
              endDate: "01-31-2022 00:00",
              status: TenderDTOStatusEnum.Created
            },
              {
                code: "2",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
                code: "3",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
                code: "4",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
                code: "5",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
                code: "6",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
                code: "7",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
                code: "8",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
                code: "9",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
                code: "10",
                name: "BRT",
                startDate: "01-31-2021 00:00",
                endDate: "01-31-2022 00:00",
                status: TenderDTOStatusEnum.Created
              },
              {
              code: "11",
              name: "BRT",
              startDate: "01-31-2021 00:00",
              endDate: "01-31-2022 00:00",
              status: TenderDTOStatusEnum.Created
            },
          ),
        },
        selected: {},
        pagination: {
          page: 1,
          tot: 10,
          force: false
        }
      }
    }
    mockingStore(tenderState);
    mockingNavigate();
  });

  afterEach(() => {
    cleanup()
  });

  it("Tenders loaded", async () => {
    reducer(<TenderPage />);
    const paginationDataGrid = await screen.findByRole('grid');
    expect(paginationDataGrid).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug(document.body)
  });

  it("Add tender", async () => {
    reducer(<TenderPage />);

    const buttonAggiungi = screen.getByRole(/Button/i, {
      name: "Aggiungi",
    });
    const user = userEvent.setup();
    await act(async () => {
      await user.click(buttonAggiungi);
    });
    //eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug(screen.getAllByRole(/Button/i))
    //eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug(screen.getAllByRole(/grid/i))

    // const buttonPageSize = screen.getByRole(/Button/i, {
    //   name: ":r1: :r0:",
    // });

    // const buttonPageSize = await screen.findByRole("list", {
    //   name: "Rows per page: 10"
    // });
    // await act(async () => {
    //   await user.click(buttonPageSize);
    // });
    const buttonPrevPage = screen.getByRole(/Button/i, {
      name: "Go to previous page",
    });
    const buttonNextPage = screen.getByRole(/Button/i, {
      name: "Go to next page",
    });

    // await act(async () => {
    //   await user.click(buttonNextPage);
    // });
  });
});