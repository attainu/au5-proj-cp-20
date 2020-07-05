let userdata = {
  login: false,
  user: "",
  google: "",
  article: null,
  all_users: [],
  searched_users: [],
  following: [],
  followers: [],
  selected_following: [],
  selected_followers: [],
  user_profile: "",
  show_follow: true,
  all_posts: "",
  comments_text: [],
  comments_image: [],
  logged_all: "",
  logged_up: "",
  logged_dowm: "",
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
      stateCopy.article = action.payload;
      return stateCopy;

    case "ALL_USERS":
      console.log("IN SEARCHED USERS", stateCopy.user.email, action.payload);

      const resultArray = action.payload;
      for (let i in action.payload) {
        if (resultArray[i].email === stateCopy.user.email) {
          resultArray.splice(i, 1);
          console.log("filteredAry", resultArray);
          stateCopy.all_users = resultArray;
          break;
        }
      }

      return stateCopy;

    case "SEARCH_RESULTS":
      const resultArray2 = action.payload;
      for (let i in action.payload) {
        if (resultArray2[i].email === stateCopy.user.email) {
          resultArray2.splice(i, 1);
          console.log("filteredAry2", resultArray2);
          stateCopy.searched_users = resultArray2;
          break;
        }
      }

      return stateCopy;

    case "FOLLOWING":
      // console.log("following", action.payload);
      stateCopy.following = action.payload;
      return stateCopy;

    case "FOLLOWERS":
      // console.log("followers", action.payload);
      stateCopy.followers = action.payload;
      return stateCopy;

    case "SELECTED_FOLLOWING":
      console.log("S_following", action.payload);
      stateCopy.selected_following = action.payload;
      return stateCopy;

    case "SELECTED_FOLLOWERS":
      console.log("S_followers", action.payload);
      stateCopy.selected_followers = action.payload;
      return stateCopy;

    case "GET_USER_PROFILE":
      stateCopy.user_profile = action.payload;
      const followStatus = stateCopy.user.following.includes(
        action.payload._id
      );
      if (followStatus === true) {
        stateCopy.show_follow = false;
      } else {
        stateCopy.show_follow = true;
      }
      return stateCopy;

    case "ALLPOST":
      console.log("allpost", action.payload);
      let arr = action.payload;
      let allpost = [];
      arr.forEach((el) => {
        allpost.push(...el.textposts);
        allpost.push(...el.imageposts);
        allpost.push(...el.pollposts);
      });
      stateCopy.all_posts = allpost;
      console.log(stateCopy.all_posts);
      return stateCopy;

    case "COMMENTS_TEXT":
      console.log("Red Comments1 text", action.payload.comments);

      stateCopy.comments_text = action.payload;
      return stateCopy;

    case "COMMENTS_IMAGE":
      stateCopy.comments_image = action.payload;
      return stateCopy;

    case "LOGGEDPOST":
      console.log("Logged Post", action.payload);
      stateCopy.logged_all = action.payload;
      return stateCopy;
    case "LOGGEDUP":
      console.log("Logged Post UP", action.payload);
      stateCopy.logged_up = action.payload;
      return stateCopy;
    case "LOGGEDDOWN":
      console.log("Logged Post DOWN", action.payload);
      stateCopy.logged_down = action.payload;
      return stateCopy;
    default:
      return stateCopy;
  }
}

export default userReducer;
