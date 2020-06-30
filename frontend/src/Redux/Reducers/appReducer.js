let userdata = {
  login: false,
  user: "",
  google: "",
  article: null,
  all_users: [],
  searched_users: [],
  following: [],
  followers: [],
  user_profile: "",
};

function userReducer(state = userdata, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "LOGIN":
      console.log(action);
      stateCopy.login = true;
      stateCopy.user = action.payload;
      return stateCopy;

    case "GOOGLE_LOGIN":
      console.log("in reducer", action);
      stateCopy.login = true;
      stateCopy.google = action.payload;
      return stateCopy;
    case "LOGOUT":
      console.log(action);
      stateCopy.login = false;
      stateCopy.user = action.payload;
      return stateCopy;
    case "ARTICLE":
      console.log("article", action);
      stateCopy.article = action.payload;
      return stateCopy;

    case "ALL_USERS":
      stateCopy.all_users = action.payload;
      return stateCopy;

    case "SEARCH_RESULTS":
      stateCopy.searched_users = action.payload;
      return stateCopy;

    case "FOLLOWING":
      // console.log("following", action.payload);
      stateCopy.following = action.payload;
      return stateCopy;

    case "FOLLOWERS":
      // console.log("followers", action.payload);
      stateCopy.followers = action.payload;
      return stateCopy;

    case "GET_USER_PROFILE":
      stateCopy.user_profile = action.payload;
      console.log("user_profile", stateCopy.user_profile);
      return stateCopy;

    default:
      return stateCopy;
  }
}

export default userReducer;
