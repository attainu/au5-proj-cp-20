let userdata = {
  login: false,
  user: ''
};

function userReducer(state = userdata, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "LOGIN":
      console.log(action)
      stateCopy.login = true
      stateCopy.user = action.payload
      return stateCopy;
    default:
      return stateCopy;
  }
}

export default userReducer;