import axios from "axios";

export function sendLoginData(data) {
  console.log("data in action", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "http://localhost:8000/register/login",
      data,
    })
      .then(function (res) {
        console.log(res);

        window.localStorage.setItem("auth-token", res.headers["auth-token"]);
        // console.log(window.localStorage.getItem("auth-token"));

        dispatch({
          type: "LOGIN_RESPONSE",
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
