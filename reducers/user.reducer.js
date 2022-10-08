import { userAction } from '../actions';
import { setLocalData, getLocalData } from '../services/localStorage';

const isLogedIn = getLocalData('is_loged_in');
const userId = getLocalData('user_id');
const fullName = getLocalData('full_name');
const email = getLocalData('email');
const refreshToken = getLocalData('refresh_token');
const accessToken = getLocalData('access_token');
const tokenType = getLocalData('token_type');
const expiresIn = getLocalData('expires_in');
const roles = getLocalData('roles');
const jti = getLocalData('jti');

const initState = {
    isLogedIn: isLogedIn != null ? isLogedIn : false, 
    username: '',
    grantType: 'password',
    password: '',
    scope: 'openid',
    fullName: fullName != null ? fullName : '',
    email: email != null ? email : '',
    refreshToken: refreshToken != null ? refreshToken : '',
    accessToken: accessToken != null ? accessToken : '',
    tokenType: tokenType != null ? tokenType : '',
    expiresIn: expiresIn != null ? expiresIn : 0,
    userId: userId != null ? userId : 0,
    roles: roles != null ? roles : [],
    jti: jti != null ? jti : '',
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userAction.LOG_IN:
            return {
                ...state,
            }
        case userAction.LOG_IN_SUCCESS:
            setLocalData('is_loged_in', true);
            setLocalData('user_id', action.value.user_id);
            setLocalData('full_name', action.value.fullName);
            setLocalData('email', action.value.email);
            setLocalData('refresh_token', action.value.refresh_token);
            setLocalData('access_token', action.value.access_token);
            setLocalData('token_type', action.value.token_type);
            setLocalData('expires_in', action.value.expires_in);
            setLocalData('roles', action.value.roles);
            setLocalData('jti', action.value.jti);
            return {
                ...state,
                isLogedIn: true,
                refreshToken: action.value.refresh_token,
                accessToken: action.value.access_token,
                tokenType: action.value.token_type,
                expiresIn: action.value.expires_in,
                userId: action.value.user_id,
                roles: action.value.roles,
                fullName: action.value.fullName,
                email: action.value.email,
                jti: action.value.jti,
            }
        case userAction.LOG_IN_FAIL:
            setLocalData('is_loged_in', false);
            setLocalData('user_id', 0);
            setLocalData('full_name', '');
            setLocalData('email', '');
            setLocalData('refresh_token', '');
            setLocalData('access_token', '');
            setLocalData('token_type', '');
            setLocalData('expires_in', 0);
            setLocalData('roles', []);
            setLocalData('jti', '');
            return {
                ...state,
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
            }
        case userAction.LOG_OUT:
            setLocalData('is_loged_in', false);
            setLocalData('user_id', 0);
            setLocalData('full_name', '');
            setLocalData('email', '');
            setLocalData('refresh_token', '');
            setLocalData('access_token', '');
            setLocalData('token_type', '');
            setLocalData('expires_in', 0);
            setLocalData('roles', []);
            setLocalData('jti', '');
            return {
                ...state,
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
            }
        default:
            return state;
    }
}

export default userReducer;