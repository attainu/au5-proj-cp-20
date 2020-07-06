import axios from "axios";

export function sendSignupData(data) {
  // console.log("data in action", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "/register/signup",
      data,
    })
      .then((res) => {
        window.location.assign("/login");
        // console.log(res);
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
  // console.log("data in action", data);
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
      if (res) {
        // console.log("BACKEND", res);
        let data = res.data;
        // console.log("ResDATA", data);
        dispatch({
          type: "LOGIN",
          payload: data,
        });
      } else {
        Promise.reject({ redirectTo: "/no-access" });
        window.location.assign("/forbidden");
      }
    });
  };
}

export function sendLoginDataGoogle(data) {
  // console.log("Google Data : ", data);
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
      url: `https://www.reddit.com/search.json?q=${querry}&sort=popular&limit=50&raw_json=1`,
    })
      .then((res) => res.data)
      .then((data) => data.data.children.map((data) => data.data))
      .then((soup) => {
        // console.log(soup);
        let arr = [];
        soup.forEach((e) => {
          if (e.preview) {
            let data = {
              title: e.title.substring(0, 150),
              text: e.selftext.substring(0, 150),
              image: e.preview.images[0].source.url,
              subreddit: e.subreddit,
              post: e.url,
            };
            // console.log(e.preview.images[0].source);
            return arr.push(data);
          }
        });
        // console.log(arr);
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
        window.location.assign("/profile");
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
        getFollowers();
        getFollowing();
        dispatch({
          type: "FOLLOWED",
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
        getFollowers();
        getFollowing();
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
  // console.log("Data in following", data);
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
  // console.log("Data in followers", data);
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

export function getSelectedUserFollowing(data) {
  // console.log("Data in following", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "/users/selected/following",
      data,
    })
      .then((res) => {
        dispatch({
          type: "SELECTED_FOLLOWING",
          payload: res.data[0].following,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getSelectedUserFollowers(data) {
  // console.log("Data in followers", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "/users/selected/followers",
      data,
    })
      .then((res) => {
        dispatch({
          type: "SELECTED_FOLLOWERS",
          payload: res.data[0].followers,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendUserProfileId(data) {
  console.log("Data in UserProfile actions", data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: "/users/user-profile",
      data,
    })
      .then((res) => {
        console.log("User_profile", res.data[0]);
        dispatch({
          type: "GET_USER_PROFILE",
          payload: res.data[0],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getallPost() {
  return (dispatch) => {
    let token = localStorage.getItem("auth-token");
    return axios({
      method: "get",
      url: "/api/get/all",
      headers: { "auth-token": token },
    })
      .then((res) => {
        // console.log("ALL POST", res)
        dispatch({
          type: "ALLPOST",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function loggedPost(email) {
  return (dispatch) => {
    let token = localStorage.getItem("auth-token");
    let data = { email: email };
    return axios({
      method: "post",
      url: "/api/post/userposts",
      headers: { "auth-token": token },
      data,
    })
      .then((res) => {
        dispatch({
          type: "LOGGEDPOST",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendCommentDataText(data) {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "/api/post/comment/text",
      data,
    })
      .then((res) => {
        getallPost();
        console.log("COMMENTS ACTION", res);
        dispatch({
          type: "COMMENTS",
          payload: res.data,
        });

        getallPost();
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function loggedPostup(email) {
  return (dispatch) => {
    let token = localStorage.getItem("auth-token");
    let data = { email: email };
    return axios({
      method: "post",
      url: "/api/post/userup",
      headers: { "auth-token": token },
      data,
    })
      .then((res) => {
        dispatch({
          type: "LOGGEDUP",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendCommentDataImage(data) {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "/api/post/comment/image",
      data,
    })
      .then((res) => {
        getallPost();
        console.log("COMMENTS ACTION", res);
        dispatch({
          type: "COMMENTS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getCommentDataImage() {
  return (dispatch) => {
    let token = localStorage.getItem("auth-token");
    return axios({
      method: "get",
      url: "/api/get/comment/image",
      headers: { "auth-token": token },
    })
      .then((res) => {
        console.log("Image Post", res.data);
        dispatch({
          type: "COMMENTS_IMAGE",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function loggedPostdown(email) {
  return (dispatch) => {
    let token = localStorage.getItem("auth-token");
    let data = { email: email };
    return axios({
      method: "post",
      url: "/api/post/userdown",
      headers: { "auth-token": token },
      data,
    })
      .then((res) => {
        dispatch({
          type: "LOGGEDDOWN",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getCommentDataText() {
  return (dispatch) => {
    let token = localStorage.getItem("auth-token");
    return axios({
      method: "get",
      url: "/api/get/comment/text",
      headers: { "auth-token": token },
    })
      .then((res) => {
        console.log("text Post", res.data);
        dispatch({
          type: "COMMENTS_TEXT",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
