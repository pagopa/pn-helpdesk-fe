import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { it } from "date-fns/locale";
import {Page, UPLOAD_STATUS_ENUM} from "../model";
import {DeliveryDriverDTO, TenderDTO} from "../generated";

function reducer(
  ui: any,
  { preloadedState, store, ...renderOptions }: any = {}
) {
  function Wrapper({ children }: any) {
    const mockStore = configureMockStore([]);
    const store = mockStore({
      response: {
        opened: false,
        responseData: {},
      },
      snackbar: {
        opened: false,
      },
      spinner: {
        opened: false,
      },
      uploadAndDownload: {
        download : {
          loading: false
        },
         upload: {
          loading: false,
          error: undefined,
          status: UPLOAD_STATUS_ENUM.WAITING_FILE
        }
      },
      tenderForm: {
        tenderCode: undefined,
        loading: false,
        allData: {} as Page<DeliveryDriverDTO>,
      },
      tender: {
        loading: false,
        allData: {} as Page<TenderDTO>,
        selected: {} as TenderDTO
      }
    });
    return (
      <LocalizationProvider locale={it} dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <Router>{children}</Router>
        </Provider>
      </LocalizationProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { reducer };
