const initialState = {
  token: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
