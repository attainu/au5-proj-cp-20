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
      let data = res.data;
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

export function articleCall(querry) {
  return (dispatch) => {
    axios({
      method: "get",
      url: `https://www.reddit.com/search.json?q=${querry}&sort=relevance&limit=50&raw_json=1`,
    })
      .then((res) => res.data)
      .then((data) => data.data.children.map((data) => data.data))
      .then((soup) => {
        let arr = [];
        soup.forEach((e) => {
          if (e.preview) {
            let data = {
              title: e.title.substring(0, 150),
              text: e.selftext.substring(0, 150),
              image: e.preview.images[0].source.url,
              post: e.url,
            };
            return arr.push(data);
          }
        });
        console.log(arr);
        dispatch({
          type: "ARTICLE",
          payload: arr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function sendEditProfileData(data) {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "/register/update_profile",
      data,
    })
      .then((res) => {
        dispatch({
          type: "EDIT_PROFILE",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendImageUrl(data) {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "/register/update_profile_pic",
      data,
    })
      .then((res) => {
        dispatch({
          type: "EDIT_PROFILE_PIC",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getAllUsers() {
  return (dispatch) => {
    return axios({
      method: "get",
      url: "/users/all_users",
    })
      .then((res) => {
        dispatch({
          type: "ALL_USERS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendFollowData(data) {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "/users/follow",
      data,
    })
      .then((res) => {
        dispatch({
          type: "FOLLOWERS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendUnfollowData(data) {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `/users/unfollow`,
      data,
    })
      .then((res) => {
        dispatch({
          type: "UNFOLLOWED",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function searchUsers(data) {
  return (dispatch) => {
    return axios({
      method: "post",
      url: "/users/search_users",
      data,
    })
      .then((res) => {
        dispatch({
          type: "SEARCH_RESULTS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getFollowing(data) {
  console.log("Data in following", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "/users/following",
      data,
    })
      .then((res) => {
        dispatch({
          type: "FOLLOWING",
          payload: res.data[0].following,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getFollowers(data) {
  console.log("Data in followers", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "/users/followers",
      data,
    })
      .then((res) => {
        dispatch({
          type: "FOLLOWERS",
          payload: res.data[0].followers,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendUserProfileId(data) {
  console.log("Data in followers", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "/users/user-profile",
      data,
    })
      .then((res) => {
        console.log("User_profile", res.data);
        dispatch({
          type: "GET_USER_PROFILE",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
