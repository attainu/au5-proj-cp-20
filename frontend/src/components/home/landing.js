import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Navbar from "../navbar/navbar";
import "../../styles/landing.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Posts from "../posts_component/posts_component";
var responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
class Land extends React.Component {
  render() {
    console.log("From Landing page", this.props.state);

    return (
      <div className='landing-page'>
        <nav className='mb-2'>
          <Navbar />
        </nav>
        <div className='landing-heading'>
          <h3 style={{ color: "whitesmoke" }}>
            <strong>Trending Today</strong>
          </h3>
        </div>
        <div>
          <Carousel
            additionalTransfrom={0}
            className='carousel'
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1500}
            keyBoardControl={true}
            customTransition='all 1s linear'
            transitionDuration={1500}
            containerClass='carousel-container'
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item-padding-20-px'>
            {this.props.state.user.article == null ? (
              <div></div>
            ) : (
              this.props.state.user.article.map((el, i) => {
                return (
                  <div>
                    <div className='wrapper' id='wrapper3-landing'>
                      <div id='card-landing'>
                        <img src={el.image} alt='' />
                        <div className='info' id='info-landing'>
                          <h2>
                            <span className='logo-title2' id='hash'>
                              #
                            </span>
                            <u>{el.subreddit}</u>
                          </h2>
                          <p>{el.title}</p>
                          <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href={el.post}>
                            See post
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </Carousel>
        </div>
        <div></div>
        {this.props.state.user.article ? (
          <div>
            <div className='landing-heading' style={{ marginBottom: "1rem" }}>
              <h3 style={{ color: "whitesmoke" }}>
                <strong>Recent Posts</strong>
              </h3>
            </div>
            <div className='col-12 main' id='col-12'>
              <Posts />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Land);
