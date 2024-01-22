const init = {
  data: [],
}

const gender = (state = init, action: any) => {
  switch (action.type) {
    case 'GENDER_SUCCESS':
      return {
        ...state,
        data: action.payload,
      }
    case 'GENDER_FAIL':
      return {
        ...state,
        data: [],
      }

    default:
      return state
  }
}

export default gender
