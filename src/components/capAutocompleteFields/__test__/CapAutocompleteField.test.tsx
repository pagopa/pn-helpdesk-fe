import {cleanup, render, screen, act, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import { CapAutocompleteField } from "../CapAutocompleteField";
import * as apis from "../../../api/paperChannelApi";
import {errorMessages} from "../../../helpers/messagesConstants";
import {regex} from "../../../helpers/validations";
import userEvent from "@testing-library/user-event";

const responseDTO = {
  content: [{cap:"1000"}, {cap:"1001"}, {cap:"1002"},{cap:"1003"}]
}


describe("Cap Autocomplete Test", () => {
  const apiSpyCap = jest.spyOn(apis, 'retrieveCaps');
  const mockApiCap = jest.fn();

  afterEach(cleanup);
  beforeEach(() => {
    apiSpyCap.mockImplementation(mockApiCap);
    apiSpyCap.mockResolvedValue(responseDTO);
  });

  it("whenComponentRendered", async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act (async ()=>{
      render(<CapAutocompleteField field={fieldsProps} value={[]} required={true} error={false} onChange={()=>{}}/>)
    })

    expect(screen.getByTestId("caps-autocomplete")).toBeInTheDocument()
    const [button] = screen.getAllByRole('button')
    expect(button).toBeInTheDocument()

    fireEvent.click(button);

    await act(async () => {
      await expect(screen.queryByText("99999")).not.toBeInTheDocument()
      responseDTO.content.map(cap => {
        expect(screen.getByText(cap.cap)).toBeInTheDocument()
        return cap.cap
      })
    })
  })

  it("whenComponentRenderedAndIsFSU", async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act (async ()=>{

      render(<CapAutocompleteField field={{...fieldsProps, fsu: true}}
                                   value={[]} required={true}
                                   error={false} onChange={()=>{}}/>)
    })

    expect(screen.getByTestId("caps-autocomplete")).toBeInTheDocument()
    const [button] = screen.getAllByRole('button')
    expect(button).toBeInTheDocument()
    fireEvent.click(button);
    await act(async () => {
      await expect(screen.getByText("99999")).toBeInTheDocument()
      responseDTO.content.map(cap => {
        expect(screen.getByText(cap.cap)).toBeInTheDocument()
        return cap.cap
      })
    })
  })


  it("whenInputChangeWithNewCap", async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act (async ()=>{
      render(<CapAutocompleteField field={{...fieldsProps}}
                                   value={[]} required={true}
                                   error={false} onChange={()=>{}}/>)
    })

    expect(screen.getByTestId("caps-autocomplete")).toBeInTheDocument()
    const [inputBox] = screen.getAllByRole('combobox')
    expect(inputBox).toBeInTheDocument()

    await userEvent.type(inputBox, '12345')

    await waitFor( async () => {

      await expect(screen.getByText("12345")).toBeInTheDocument()
    });
  })

  it("whenInputChangeWithDefaultCapButNotAFSU", async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act (async ()=>{

      render(<CapAutocompleteField field={{...fieldsProps}}
                                   value={[]} required={true}
                                   error={false} onChange={()=>{}}/>)
    })

    expect(screen.getByTestId("caps-autocomplete")).toBeInTheDocument()
    const [inputBox] = screen.getAllByRole('combobox')
    expect(inputBox).toBeInTheDocument()
    await userEvent.type(inputBox, '99999')
    await waitFor( async () => {
      await expect(screen.queryByText("12345")).not.toBeInTheDocument()
    });
  })


})


const fieldsProps = {
  name: "cap",
  componentType: "capAutocomplete",
  label: "Cap",
  placeholder: "Seleziona o digita Cap",
  hidden: false,
  size: 1,
  required: true,
  rules:{
    validate:{
      validateCaps: (caps: Array<string>) => {
        if (!caps) return errorMessages.CAPS_INVALID
        const error = caps.filter(cap => {
          const regexp = new RegExp(regex.CAP),
            test = regexp.test(cap);
          return !test;
        });
        return error.length === 0 || errorMessages.CAPS_INVALID
      }
    }
  }
}