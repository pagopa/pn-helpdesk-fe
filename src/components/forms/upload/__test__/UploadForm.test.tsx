import {screen, render, fireEvent, cleanup} from "@testing-library/react";
import UploadBox from "../UploadForm";
import {reducer} from "../../../../mocks/mockReducer";
import React from "react";


describe(UploadBox, () => {

  afterEach(cleanup);
  beforeEach(() => {
    reducer(<UploadBox />);
  });


  it("verify UploadBox is rendered", () => {
    const singleFileInputElement = screen.getByLabelText("Documento (richiesto)");
    expect(singleFileInputElement).toBeInTheDocument();
  })

  it("verify SingleFileInput value is empty", () => {
    const singleFileInputElement = screen.getByLabelText("Documento (richiesto)");
    expect(singleFileInputElement).getAttribute("value").toBeFalsy();
  })

  // it("verify SingleFileInput is not empty", () => {
  //   const singleFileInputElement = screen.getByLabelText("Documento (richiesto)");
  //   fireEvent.click(singleFileInputElement);
  //   const fileValue = singleFileInputElement.getAttribute("value");
  //   expect(fileValue).toBeTruthy();
  // })
})
