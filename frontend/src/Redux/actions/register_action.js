import axios from "axios";

export function sendSignupData(data) {
  console.log("data in action", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "http://localhost:8000/register/signup",
      data,
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "SIGNUP_RESPONSE",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
