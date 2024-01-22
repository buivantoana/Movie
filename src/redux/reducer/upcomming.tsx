const init = {
  data: [],
}

const upcomming = (state = init, action: any) => {
  switch (action.type) {
    case 'UPCOMMING_SUCCESS':
      return {
        ...state,
        data: action.payload,
      }
    case 'UPCOMMING_FAIL':
      return {
        ...state,
        data: [],
      }

    default:
      return state
  }
}

export default upcomming
