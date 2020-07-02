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
    items: 2,
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
            className='carousel'
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition='all .5'
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
                        <img src={el.image} />
                        <div className='info' id='info-landing'>
                          <p>{el.title}</p>
                          <a
                            className='btn btn-green'
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

        <div className='row'>
          <div className='col-8 main'>
            <Posts />
          </div>
          <div className='col-4 side'></div>
        </div>
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
