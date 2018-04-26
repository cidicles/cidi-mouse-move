import React, { Component } from 'react';
import './CidiMouseMove.css';

class CidiMouseMove extends Component {
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.updatePosition, false)
    window.addEventListener("deviceorientation", this.updatePosition, true);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.updatePosition, false)
    window.removeEventListener("deviceorientation", this.updatePosition, true);
  }
  updatePosition = (e) => {
    let {distX, distY, oMult} = this.props;

    // Is this a device orientation change?
    let translates = [];
    if(e.type === 'deviceorientation'){
      translates = [
        distY * ((e.srcElement.innerWidth / 2) - (parseInt(e.gamma, 10) * oMult)),
        distX * ((e.srcElement.innerHeight / 2) - (parseInt(e.alpha, 10) * oMult))
      ];
    } else {
      translates = [
        distY * ((e.view.innerWidth / 2) - e.clientX),
        distX * ((e.view.innerHeight / 2) - e.clientY)
      ];
    }

    if ( !this.resizeTimeout ) {
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = null;
        this.setState({
          x: translates[0],
          y: translates[1]
        });
      }, 75);
    }
  }
  render(){
    let {x,y} = this.state;
    console.log(x,y);
    return (
      <div style={{
        transition: 'all 0.5s',
        position: 'relative',
        transform: `translate(${x}px,${y}px)`
      }}>
        { this.props.children }
        {x},{y}
      </div>
    );
  }
}

export default CidiMouseMove;
