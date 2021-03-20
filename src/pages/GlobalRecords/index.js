// Globals
import React,{ useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";

// Components
import { Record } from "components/Record";

//pagination 
import ReactPaginate from 'react-paginate';

// MockFetch
import { mockFetch } from "../../util/mockFetch"

//Loader apinner
import PuffLoader from "react-spinners/PuffLoader";

import "./styles.scss"

const PER_PAGE = 10

// Component
function GlobalRecords() {
  const dispatch = useDispatch()
  const global = useSelector(state => state.records)
  const [page,setpage] = useState(0);

  const loadRecords = (page,perPage) => {
    dispatch({
      type: 'LOAD_DATA'
    })
    //calling mockFetch() to load data here and save it to store.
    mockFetch(page,perPage).then(({ data,count }) => {
      dispatch({
        type: 'LOAD_SUCCESS',
        payload: { data,count }
      })
    })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'LOAD_FAIL',
          payload: [err.msg]
        })
      })
  }
  useEffect(() => {
    //Loading records on component first mount
    loadRecords(page,PER_PAGE)
  },[])

  const onChangePage = (page) => {
    setpage(page)
    mockFetch(page,PER_PAGE).then(({ data,count }) => {
      dispatch({
        type: 'LOAD_SUCCESS',
        payload: { data,count }
      })
      console.log("page success", page);
    })
      .catch((err) => {
        console.log("error page",err);
        dispatch({
          type: 'LOAD_FAIL',
          payload: [err.msg]
        })
      })
  }
  return (
    <div className="aura-page aura-global_records">
      <h1>Top Records of 2020</h1>

      <div className="aura-page-content">
        {
          global.loading && <div> <p>Loading</p><PuffLoader /></div>
        }
        {
          !!global.errors.length && !global.loading &&
          <span>
            {global.errors.map((err,index) => <div key={index} className="error-emoji">⚠️ {err}</div>)}
            <br />
            <a className="reload-link" href="/records" onClick={(e) => {
              e.preventDefault()
              loadRecords()
            }}>Reload</a>
          </span>

        }
        {
          !global.loading && !!!global.errors.length && global?.records?.map((record) => {
            return <Record key={record.id} data={record} />;
          })
        }
        {
          !global.loading && !!!global.errors.length && <div className="pagination">
          <ReactPaginate
          pageCount={global.total / PER_PAGE} 
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={(p)=>onChangePage(p.selected)}
          initialPage={page}
          />
        </div>
        }
        
        
      </div>
    </div>
  );
}

export { GlobalRecords };
