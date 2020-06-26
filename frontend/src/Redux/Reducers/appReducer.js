let userdata = {
  login: false,
  user: "",
  google: "",
  article: null,
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
    default:
      return stateCopy;
  }
}

export default userReducer;
