
const initialState = {
    listing: []
}

const initialAction = {
    type: "",
    listing: []
}

export function music( state = initialState, action = initialAction ) {
  const { type } = action;
  if(type === 'MUSIC'){
    return Object.assign({}, state, { listing: action.musicList });
  } else {
    return state;
  }

}
