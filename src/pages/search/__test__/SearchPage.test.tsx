/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'regenerator-runtime/runtime'
import { store } from '../../../redux/store';
import { Provider } from 'react-redux';
import SearchPage from '../SearchPage';

jest.mock('../../../components/forms/search/SearchForm', () => () => <div data-testid="searchForm">Search Form</div>)

describe('SearchPage', () => {


    it('renders component', () => {
      render(
          <Provider store={store}>
              <Router>
                  <SearchPage />
              </Router>
          </Provider>  
      );
      expect(screen.getByTestId("searchForm")).toBeTruthy();  
    });

    it("renders header and footer", () => {
        render(
            <Provider store={store}>
                    <Router>
                        <SearchPage />
                    </Router>
                </Provider> 
        );
        expect(screen.getAllByRole("banner").length).toEqual(2)
    });

    it("renders form", () => {
        render(
            <Provider store={store}>
                    <Router>
                        <SearchPage />
                    </Router>
                </Provider> 
        );
        expect(screen.getByTestId("searchForm")).toBeInTheDocument();
    });

    

   

    

    // it("fill fields and click ricerca button", async () => {
    //     const {getByRole} = render(
    //         <Provider store={store}>
    //                 <Router>
    //                     <SearchPage />
    //                 </Router>
    //             </Provider> 
    //     );

    //     const ticketNumber = document.querySelector("input[id='Numero Ticket']");
    //     const fiscalCode = document.querySelector("input[id='Codice Fiscale']");
    //     const button = getByRole("button", {
    //             name: 'Ricerca',
    //         });
            
    //     fireEvent.change(ticketNumber!, { target: { value: "abc" } });
    //     await waitFor(() => {
    //         expect(ticketNumber).toHaveValue("abc");
    //     });
    //     fireEvent.change(fiscalCode!, { target: { value: "MLLSNT82P65Z404U" } });
    //     await waitFor(() => {
    //         expect(fiscalCode).toHaveValue("MLLSNT82P65Z404U");
    //     });
    //     expect(button.getAttribute('disabled')).toEqual(null);
    //     button.click();
    //     await waitFor(async () => {
    //         expect(jest.fn()).toBeCalledTimes(1);
    //     });
    // });

    // it("runs useEffect", async () => {
    //     jest.spyOn(React, "useEffect").mockImplementation(f => f());
    //     jest.spyOn(auth, "refreshToken");
    //     jest.spyOn(global, 'setTimeout');
    //     render(
    //         <Provider store={store}>
    //                 <Router>
    //                     <SearchPage />
    //                 </Router>
    //             </Provider> 
    //     );
    //     await waitFor(() => {
    //         expect(setTimeout).toHaveBeenCalled()
    //     });
    // });
});


 


