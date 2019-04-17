
const DEFAULT_STATE = {
    auth: false,
    username: ''
}

const exampleAction = {
    type: 'LOG_USER_IN',
    username: 'JimBobJones'
}

function userReducer(state = DEFAULT_STATE, action) {
    switch(action.type) {
        default:
            return state;
    }
}

export default userReducer;
