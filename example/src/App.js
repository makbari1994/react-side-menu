import React from 'react'

import 'react-side-menu/dist/index.css'
import { AkbariSideMenu } from 'react-side-menu';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.sideRightRef = React.createRef();
    this.sideLeftRef = React.createRef();


  }

  onOpen(value, event) {


  }
  onClose() {


  }

  openRight() {
    this.sideRightRef.current.open();
  }
  openLeft() {
    this.sideLeftRef.current.open();
  }
  render() {

    return (

      <div>

        <div className="center">
          
          <button type="button" className="left" onClick={this.openLeft.bind(this)} >open left menu</button>

          <button type="button" className="right" onClick={this.openRight.bind(this)} >open right menu</button>


        </div>


        <AkbariSideMenu
          ref={this.sideRightRef}
          width={80}
          onClose={this.onClose.bind(this)}
          onOpen={this.onOpen.bind(this)}
          direction={'rtl'}
          showCloseButton={true}
        >

          <div className="header">
            <div className="one">
              <img src="/assets/img/my.jpg" />
            </div>
            <div className="two">Mohamadreza Akbari</div>

          </div>

          <div className="menu">
            <div className="item">Home</div>
            <div className="item">About</div>
            <div className="item">Contact</div>
            <div className="item">Map</div>

          </div>

        </AkbariSideMenu>


        <AkbariSideMenu
          ref={this.sideLeftRef}
          width={80}
          onClose={this.onClose.bind(this)}
          onOpen={this.onOpen.bind(this)}
          direction={'ltr'}
        >

          <div className="header">
            <div className="one">
              <img src="/assets/img/my.jpg" />
            </div>
            <div className="two">Mohamadreza Akbari</div>

          </div>

          <div className="menu">
            <div className="item">Home</div>
            <div className="item">About</div>
            <div className="item">Contact</div>
            <div className="item">Map</div>

          </div>

        </AkbariSideMenu>
      </div>

    )
  }

}

export default App
