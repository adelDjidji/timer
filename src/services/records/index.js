export const records = (state={records:[], loading:false, errors:[]}, action) => {
    console.log(action.type);
    switch(action.type){
        case 'LOAD_DATA':
            
            return {...state, loading:true}
        case 'LOAD_SUCCESS':
            return {...state, loading:false, records:action.payload, errors:[]}
        case 'LOAD_FAIL':
            return {...state, loading:false, errors:action.payload}
        default : return state
    }
};
