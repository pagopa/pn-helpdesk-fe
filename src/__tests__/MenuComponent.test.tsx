/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";

import { render, screen, waitFor, within } from "@testing-library/react";
import MenuComponent from "../Components/MenuComponent";
import { act } from "react-dom/test-utils";

describe("Menu component test", () => {
  it("renders icon of the menu", () => {
    const result = render(<MenuComponent />);
    const icon = result.container.querySelector("svg");
    expect(icon).toBeTruthy();
  });

//   it("render drawer", async() => {
//      const result = render(<MenuComponent />);
//      // const menuBtn = screen.findByRole("button");
//      // (await menuBtn).click();
//     //  const text = screen.findByText("Search Page");
//     //  console.log(text)
//     //  expect(text).toBeDefined();
//     // expect(menuBtn).toBeTruthy(); 
//     // menuBtn.simulate();
//     //  await act(async() => {
//     //     (await menuBtn).click();
//     //     screen.findByText("Search Page").then(res => {
//     //         console.log(res);
//     //         expect(res).toBeTruthy();
//     //     })
//     //  })

//      const button = screen.getByRole("button");
//      button.click();

//        await act(async () => {
//          button.click();
//          await waitFor(async () => {
//            screen.findByText("Search Page").then(res => {
//             console.log(res)
//              expect(res).toBeTruthy();
//            })
          
//          });
//        });
//   })
});
