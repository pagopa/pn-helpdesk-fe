import {screen, render, fireEvent, cleanup} from "@testing-library/react";
import UploadBox from "../UploadForm";
import {reducer} from "../../../../mocks/mockReducer";
import React from "react";


describe(UploadBox, () => {

  afterEach(cleanup);

  beforeEach(() => {
    reducer(<UploadBox />);
    // render(<UploadBox/>);
  });


  it("verify component UploadBox is into the page", () => {
    const singleFileInputElement = screen.getByLabelText("Documento (richiesto)");
    expect(singleFileInputElement).toBeInTheDocument();
  })

  it("verify component SingleFileInput value is empty", () => {
    const singleFileInputElement = screen.getByLabelText("Documento (richiesto)");
    expect(singleFileInputElement).getAttribute("value").toBeFalsy();
  })

  it("verify component SingleFileInput has a value after clicked load button", () => {
    const singleFileInputElement = screen.getByLabelText("Documento (richiesto)");
    fireEvent.click(singleFileInputElement);
    const fileValue = singleFileInputElement.getAttribute("value");
    expect(fileValue).toBeTruthy();
  })
})
