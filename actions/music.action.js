import ApiCall from "../API/ApiCall";
//actions
export const music = (musicList) => {
  return { type: 'MUSIC', musicList };
};

// thunk-middleware
// send access_token then generate token for request
export const getMusic = () => {
  let config = {
    url: 'https://loginnative-fa800.firebaseio.com/songs.json',
    header: {},
    body: {}
  };
  return dispatch => {
    return ApiCall.getCall(config)
      .then(response => {
        if (response.status === 200) {
          let newResponse = response.data
          let newList = newResponse.filter((ele) => ele !== null)
          dispatch(
            music(
              newList
            )
          );
        } else {
          handleErrorMessageToastr(LOGINFAILED);
          dispatch(music([]));
        }
      })
      .catch(error => {
        return error;
      });
  };
};
