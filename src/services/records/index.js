// records reducer
export const records = (state = { records: [],total: 0,loading: false,errors: [] },action) => {
    console.log(action.type);
    switch (action.type) {
        case 'LOAD_DATA':
            return { 
                ...state,
                loading: true,
                total:0
            }
        case 'LOAD_SUCCESS':
            return { 
                ...state,
                loading: false,
                records: action.payload.data,
                total: action.payload.count,
                errors: [] 
            }
        case 'LOAD_FAIL':
            return { 
                ...state,
                loading: false,
                errors: action.payload,
                total:0
            }
        default: return state
    }
};
