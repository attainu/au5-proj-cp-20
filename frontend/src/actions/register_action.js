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

export function verifyToken() {
  return (dispatch) => {
    let token = localStorage.getItem("auth-token");
    return axios({
      method: "get",
      url: "/main/home",
      headers: { "auth-token": token },
    }).then((res) => {
      console.log("BACKEND", res);
      let data = { name: res.data.name, email: res.data.email };
      console.log("ResDATA", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
    });
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

export function logoutAgain() {
  localStorage.clear();
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
      payload: "",
    });
  };
}
