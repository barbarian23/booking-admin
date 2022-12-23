import { bookingAction } from '../actions';

const initState = {
    bookings: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 1,
    currentAction: '',

    customerName: '',
    customerPhone: '',

    selectedBooking: {},

    isShowDetailBookingModal: false,
}

const bookingReducer = (state = initState, action) => {
    switch (action.type) {
        case bookingAction.GET_PAGGING_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: action.value.list,
                total: action.value.totalRecord,
                totalPage: action.value.totalPage,
            }
        case bookingAction.GET_PAGGING_BOOKINGS_FAIL:
            return {
                ...state,
                bookings: [],
            }
        case bookingAction.CHANGE_ACTION:
            return {
                ...state,
                currentAction: action.value,
            }
        case bookingAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        case bookingAction.SELECT_BOOKING:
            return {
                ...state,
                selectedBooking: action.value,
            }
        //booking detail modal
        case bookingAction.SHOW_DETAIL_BOOKING_MODAL:
            return {
                ...state,
                isShowDetailBookingModal: true,
            }
        case bookingAction.HIDE_DETAIL_BOOKING_MODAL:
            return {
                ...state,
                isShowDetailBookingModal: false,
            }
        default:
            return state;
    }
}

export default bookingReducer;