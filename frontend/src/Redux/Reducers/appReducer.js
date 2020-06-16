let initialState = {};

function appReducerFunction(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "DEFAULT_CASE":
      return stateCopy;
    default:
      return stateCopy;
  }
}

export default appReducerFunction;
