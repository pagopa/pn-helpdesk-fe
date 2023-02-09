import {DataInfo} from "../DataInfo";
import {cleanup, screen} from "@testing-library/react";
import {tenderRowsInfo} from "../rows";
import React from "react";
import {Page} from "../../../model";
import {TenderDTO, TenderDTOStatusEnum} from "../../../generated";
import {reducer} from "../../../mocks/mockReducer";


describe(DataInfo, () => {
  const tenderState = {
    loading: false,
    allData: {} as Page<TenderDTO>,
    selected: {code: "1", name: "UPS", startDate: "01-31-2023 00:00", endDate: "01-31-2024 00:00", status: TenderDTOStatusEnum.Created} as TenderDTO
  };
  afterEach(cleanup);
  beforeEach(() => {
    reducer(<DataInfo data={tenderState.selected} rows={tenderRowsInfo}/>);
  });

  it("verify data inserted row", async () => {
    expect(screen.getByText("UPS")).toBeInTheDocument();
    expect(screen.getByText("01-31-2023 00:00")).toBeInTheDocument();
    expect(screen.getByText("01-31-2024 00:00")).toBeInTheDocument();
    expect(screen.getByText(TenderDTOStatusEnum.Created)).toBeInTheDocument();
  })
})