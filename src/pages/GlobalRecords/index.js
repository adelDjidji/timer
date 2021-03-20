// Globals
import React,{ useEffect } from "react";

// Components
import { Record } from "components/Record";

// Misc
import { useSelector,useDispatch } from "react-redux";
import { mockFetch } from "../../util/mockFetch"
import PuffLoader from "react-spinners/PuffLoader";

import "./styles.scss"

// Component
function GlobalRecords() {
  const dispatch = useDispatch()
  const global = useSelector(state => state.records)

  const loadRecords = () => {
    dispatch({
      type: 'LOAD_DATA'
    })
    //calling mockFetch() to load data here and save it to store.
    mockFetch().then(data => {
      dispatch({
        type: 'LOAD_SUCCESS',
        payload: data
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
    loadRecords()
  },[])

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
            {global.errors.map((err, index) => <div key={index} className="error-emoji">⚠️ {err}</div>)}
            <br/>
            <a className="reload-link" href="/records" onClick={(e)=>{
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
      </div>
    </div>
  );
}

export { GlobalRecords };
