import fetchMock from "fetch-mock";
import { getAStatePropertyVal, sampleFetch } from "../index.js";
//import _ from 'lodash';

// mock must be at top outside tests
/*
jest.mock('lodash');
const actualLodash = jest.requireActual('lodash');
const trueJSONParse = JSON.parse;
*/

describe("sample actions tests", function() {
  afterAll(function() {
    fetchMock.restore();
  });

  describe("getAStatePropertyVal()", function() {
    let expectedRslt;
    let rslt;
    // let findSpy;

    beforeEach(function() {
      /*
      findSpy = _.find.mockImplementation((param, aFunc) => {
        if (aFunc && param === null) {
          return "something_found";
        }
        return actualLodash.find(param, aFunc);
      });
      */
      /*
      parseSpyFunc = (data) => {
        if (data === null) {
          return handleNullParse();
        } else {
          return handleNormalParse(data);
        }
      };
      handleNullParse = () => {
        return {};
      };
      handleNormalParse = (data) => {
        const val = trueJSONParse(_.cloneDeep(data));
        return val;
      };
      parseSpy = jest.spyOn(JSON, "parse").mockImplementation(parseSpyFunc);
      */
      expectedRslt = "expected";
    });

    afterEach(function() {
      // findSpy.mockReset();
      // findSpy = null;
      expectedRslt = null;
      rslt = null;
    });

    afterAll(function() {
      /*
      parseSpy.mockClear();
      parseSpy.mockReset();
      JSON.parse = trueJSONParse;
      */
    });

    test("it handles no params", () => {
      // let payload = trueJSONParse("{}");
      rslt = getAStatePropertyVal();
      expect(rslt).toEqual(expectedRslt);
    });
  });

  describe("sampleFetch()", () => {
    let dispatch;
    let payload;
    let rslt;

    beforeEach(function() {
      payload = {};
      dispatch = jest.fn();
    });

    afterEach(function() {
      dispatch.mockReset();
      dispatch = null;
      payload = null;
      rslt = null;
      fetchMock.reset();
      fetchMock.restore();
    });

    test("it handles no params", () => {
      fetchMock.get("*", {});
      expect(sampleFetch()).toBeUndefined();
    });

    test("it handles internal server errors", (done) => {
      fetchMock.mock("*", 500);
      rslt = sampleFetch(payload)(dispatch);
      expect(rslt).toBeInstanceOf(Promise);
      rslt
        .then(() => {
          done.fail();
        })
        .catch(() => {
          expect(dispatch).not.toHaveBeenCalled();
          done();
        });
    });

    test("it calls dispatch on success with hits", (done) => {
      fetchMock.get("*", {
        ok: true,
        status: 200,
        hits: [1, 2, 3]
      });
      rslt = sampleFetch(payload)(dispatch);
      expect(rslt).toBeInstanceOf(Promise);
      rslt
        .then(() => {
          // expect(someFunc).toHaveBeenCalled();
          done();
        })
        .catch((err) => {
          done.fail(err);
        });
    });
  });

  describe("moreTests()", function() {
    beforeEach(function() {
      /*
      Object.keys(actualLodash).forEach(entry => {
        try {
          _[entry].mockImplementation(actualLodash[entry]);
        } catch (e) {
          // do nothing
        }
      });
      */
    });

    afterEach(function() {});

    xtest("don't run this test", () => {
      expect(true).toBeFalsey();
    });
  });
});
