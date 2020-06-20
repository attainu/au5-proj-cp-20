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
        window.location.assign("/login");
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
export function sendLoginData(data) {
  console.log("data in action", data);
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
      payload: data,
    });
  };
}

export async function verifyToken() {
  return async () => {
    let token = await localStorage.getItem("auth-token");
    if (token) {
      let instance = await axios.get({
        method: "get",
        url: "localhost:8000/main/home",
        headers: { "auth-token": token },
      });
      console.log(instance);
    }
  };
}

export function sendLoginDataGoogle(data) {
  console.log("Google Data : ", data);
  return (dispatch) => {
    dispatch({
      type: "GOOGLE_LOGIN",
      payload: data,
    });
  };
}
