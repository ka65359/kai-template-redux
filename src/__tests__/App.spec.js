import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("App() tests", () => {
  it("should render correctly in mode", () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
  });
});
