import { userAction } from '../actions';

const initState = {
    isLogedIn: false,
    username: '',
    grant_type: 'password',
    password: 'password',
    scope: 'openid',
    refresh_token: '',
    access_token: '',
    token_type: '',
    expires_in: 0,
    user_id: '',
    roles: [],
    fullName: '',
    email: '',
    jti: '',
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userAction.LOG_IN:
            return {
                ...state,
            }
        case userAction.LOG_IN_SUCCESS:
            return {
                isLogedIn: true,
                refresh_token: action.value.refresh_token,
                access_token: action.value.access_token,
                expires_in: action.value.expires_in,
                user_id: action.value.user_id,
                roles: action.value.roles,
                fullName: action.value.fullName,
                email: action.value.email,
                jti: action.value.jti,
                ...state,
            }
        case userAction.LOG_IN_FAIL:
            return {
                isLogedIn: false,
                refresh_token: '',
                access_token: '',
                token_type: '',
                expires_in: 0,
                user_id: '',
                roles: [],
                fullName: '',
                email: '',
                jti: '',
                ...state,
            }
        default:
            return state;
    }
}

export default userReducer;