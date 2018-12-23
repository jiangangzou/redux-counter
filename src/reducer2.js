const defaultState = 0;
const reducer = ( state = defaultState,action) => {
    switch (action.type) {
        case 'ADD':
            return state
        default:
            return state+action.payload
    }
}

const actions = [
    {
        type: 'j',payload: 0
    },
    {
        type: 'jj',payload: 1
    },
    {
        type: 'jjjj',payload: 2
    },
    {
        type: 'jjjjj',payload: 3
    },
]

const total = actions.reduce(reducer,0)

console.log(total)