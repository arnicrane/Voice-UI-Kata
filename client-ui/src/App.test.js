import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App mounting and routing", () => {
  it("renders the HeaderBar child component by default", () => {
    const appComponent = shallow(<App />);
    expect(appComponent.find(HeaderBar)).toHaveLength(1);
  });

  it("renders the BookingDetails child component if boolingdetails are present", () => {
    const appComponent = shallow(<App />);
    appComponent.instance().setState({bookingDetails: 'valid details in JSON'})
    expect(appComponent.find(BookingDetails)).toHaveLength(1);
  });
});
