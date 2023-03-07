import { Page, Tender } from "../../../model";
import { cleanup } from "@testing-library/react";
import React from "react";
import { CapAutocompleteField } from "../CapAutocompleteField";

describe(CapAutocompleteField, () => {

  const setOnChangeMock = jest.fn();

  const tender = {
    loading: false,
    allData: {} as Page<Tender>,
    selected: {} as Tender
  };

  // const newType: FieldsProps = {
  //   field: {},
  //   value: [],
  //   required: false,
  //   error: false,
  //   onChange: setOnChangeMock
  // };

  // const fields: FieldsProps = {
  //   field: {
  //     ...FieldsProps
  //     fsu: false,
  //     label: "",
  //     placeholder: "",
  //   },
  //   value: [],
  //   required: false,
  //   error: false,
  //   onChange: setOnChangeMock
  // }
  afterEach(cleanup);
  beforeEach(() => {
    // reducer(
      // <CapAutocompleteField
      // field={fields}
      // required={fields.required!}
      // onChange={setOnChangeMock}
      // error={fields.error}
      // value={fields.value}/>
    // );
  });

  it("", async() => {

  })


})