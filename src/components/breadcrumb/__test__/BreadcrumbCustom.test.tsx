import {BreadcrumbCustom} from "../BreadcrumbCustom";
import React from "react";
import {reducer} from "../../../mocks/mockReducer";
import {cleanup, screen, within} from "@testing-library/react";

describe(BreadcrumbCustom, () => {

  afterEach(cleanup);
  beforeEach(() => {
    reducer(<BreadcrumbCustom/>)
  });

  it("verify BreadcrumbCustom is rendered", () => {
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();
  })

  it("verify HomeOutlinedIcon", () => {
    const homeIcon = screen.getByTestId("HomeOutlinedIcon");
    expect(homeIcon).toBeInTheDocument();
  })

  it("verify Anchor", () => {
    const link = screen.getByRole("link");
    expect(link.getAttribute('href')).toBe('/');
  })
})