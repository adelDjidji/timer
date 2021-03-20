// Globals
import React, {useEffect} from "react";

// Components
import { Record } from "components/Record";

// Misc
import { useSelector, useDispatch } from "react-redux";
import { mockFetch } from "../../util/mockFetch"


// Component
function GlobalRecords() {
  const dispatch= useDispatch()
  const global = useSelector(state=>state.records)
  useEffect(()=>{
    dispatch({
      type:'LOAD_DATA'
    })
    mockFetch().then(res=>{
      dispatch({
        type:'LOAD_SUCCESS',
        payload:res
      })
    })
    .catch((err)=>{
      dispatch({
        type:'LOAD_FAIL',
        payload:[err]
      })
      console.log("mock err", err);
    })
  }, [])
  
  return (
    <div className="aura-page aura-global_records">
      <h1>Top Records of 2020</h1>

      <div className="aura-page-content">
        {
          global.loading && <p>Loading</p>
        }
        {
          !!global.errors.length && <p>Error</p>
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
