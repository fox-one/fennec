import Fennec from "../src";

describe("mixin extension fennec dappf", () => {
  it("fennec should be init properly", () => {
    const fennec = new Fennec();

    expect(fennec.available).toBe(false);
  });
});
