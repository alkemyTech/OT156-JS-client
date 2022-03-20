let initialState = {};

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_REQUEST":
      return {
        ...state,
        [action.name]: action.data,
      };

    case "POST_REQUEST":
      return {
        ...state,
      };

    default:
      return state;
  }
}
