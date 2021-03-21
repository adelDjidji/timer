import { init } from "Internal/store";
import * as redux from ".";

describe("records service", () => {
  // Config
  const store = init({ records: redux.records });
  const { dispatch, getState } = store;

  // Root reducer
  it("has records reducer", () => {
    expect(getState().records).not.toBe(null)
  });

  it("has records data on the store", () => {

    // simulate dispatch adding data records to redux store
    dispatch({
      type: 'LOAD_SUCCESS',
      payload: { data:[{
        id: 123,
        artist: {
          name: 'Some artist',
          id: 456,
        },
        album: {
          title: 'Some record',
          imageSrc: '/some/asset/path.jpg'
        }
      }],count:1 }
    })
    expect(getState().records.records.length).toBe(1)
    expect(getState().records.records.length).toEqual(getState().records.total) // length of records array should equal to total and === 1
  });
});
