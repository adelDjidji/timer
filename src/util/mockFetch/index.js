import { data } from "components/Record/data";

// Util
export function mockFetch(page=0, perPage=10) { // page starts by zero, perPage: number of records by page
  return new Promise((resolve, reject) => {
    const timeout = () => {
      const error = new Error(
        "We're having trouble retrieving that, please try again later"
      );
      error.code = 500;
      error.msg="We're having trouble retrieving that, please try again later"
      const randomDigit = Math.floor(Math.random() * 11);

      randomDigit >= 3 ? resolve({data:data.slice(page*perPage, (page+1)*perPage), count:data.length}) : reject(error);
    };

    // Return promise after timeout
    setTimeout(timeout, 1000);
  });
}
