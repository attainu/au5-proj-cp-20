import React from "react";
import "../../styles/posts_div.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactHtmlParser from 'react-html-parser';
class Postdiv extends React.Component {
  render() {
    console.log(this.props.state.all_posts, this.state)
    return (
      <div>
        {this.props.state.all_posts.length === 0 ? <div></div> :
          this.props.state.all_posts.map((e) => {
            return (
              <div className='posts_div'>
                <div className='contents-tools-div'>
                  <div className='title-div'>
                    <h4>{e.title}</h4>
                  </div>
                  {e.pic &&
                    <div class='post-content-div'>
                      <img
                        id='post-image'
                        src={e.pic}
                        alt='REDDIT'
                      />
                    </div>
                  }
                  {e.text &&
                    <div class='post-content-div'>{ReactHtmlParser(e.text)}</div>
                  }
                  <div class='tools'>
                    <div id='up-arrow'>
                      <i class='fas fa-arrow-up fa-2x'></i>
                    </div>
                    <div id='count'>
                      <span class='badge badge-pill badge-light'>2.5k</span>
                    </div>
                    <div id='down-arrow'>
                      <i class='fas fa-arrow-down fa-2x'></i>
                    </div>
                    <div id='comments'>
                      <span className='badge badge-light'>
                        <i class='fas fa-comment-alt black-text'></i>{" "}
                        <strong>Comments</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Postdiv)
