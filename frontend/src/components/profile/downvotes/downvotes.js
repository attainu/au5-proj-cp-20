import React from "react";
import "../../../styles/posts_div.css";
import axios from "axios";
import { loggedPostdown } from "../../../actions/register_action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
class DownVote extends React.Component {
  componentDidMount() {
    if (this.props.state.user.email) {
      this.props.loggedPostdown(this.props.state.user.email)
    }
  }
  render() {
    console.log("Up and Down", this.props.state)
    return (
      <div>
        <h4 style={{ color: "whitesmoke", marginTop: "1rem" }}>Your Down Voted Post</h4>
        {this.props.state.logged_dowm.length === 0 ? <div></div> : this.props.state.logged_dowm.map((e, i) => {
          return (
            <div className='posts_div mt-3'>
              <div className='upvote-downvote-div'>
                <div className='col-3'>
                  <i class='fas fa-arrow-alt-circle-up fa-2x green-text'></i>
                </div>
                <div className='col-6 text-center'>{Number(e.upvote.length - e.dvote.length)}</div>
                <div className='col-3'>
                  <i class='fas fa-arrow-alt-circle-down fa-2x red-text'></i>
                </div>
              </div>
              {e.pic &&
                <div className='contents-tools-div'>
                  <div class='post-content-div'>
                    <img
                      src={e.pic}
                      alt='post'
                      width='400'
                      height='300'
                    />
                  </div>
                  <div class='tools'>
                    <span class='badge fa-2x badge-pill amber'>
                      <i class='far fa-comments fa-lg' aria-hidden='true'></i>
                      <span> </span>Comment
                              </span>
                  </div>
                </div>
              }
              {e.text &&
                <div className='contents-tools-div'>
                  <div class='post-content-div'>
                    {ReactHtmlParser(e.text)}
                  </div>
                  <div class='tools'>
                    <span class='badge fa-2x badge-pill amber'>
                      <i class='far fa-comments fa-lg' aria-hidden='true'></i>
                      <span> </span>Comment
                              </span>
                  </div>
                </div>
              }
            </div>
          )
        })}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    state: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loggedPostdown }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DownVote);
