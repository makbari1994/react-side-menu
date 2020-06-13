import React from 'react'
import styles from './styles.module.css'
import Hammer from "hammerjs"

export class AkbariSideMenu extends React.Component {

  status;
  isSwiped = false;
  constructor(props) {
    super(props);
    this.state = {
      width: Number(this.props.width),
      side_value: this.props.direction === 'ltr' ? -100 : 100,
      direction: this.props.direction ? this.props.direction : 'ltr',
      showSide: false,
      status: 'close'
    }
    this.status = 'close';
    this.sideRef = React.createRef();

    this.pan();
  }


  pan() {

    setTimeout(() => {
      const viewerImage = this.sideRef.current;
      const hammertime = new Hammer(viewerImage);


      var sideWidth = this.sideRef.current.clientWidth;

      

      var isStarted = false;
      var side_value = 0;

  
      var realSide = 0;


      hammertime.on("pan", e => {
        // console.log(e);

        var element = e.target;


      
        this.sideRef.current.style.transitionDuration = '0s';

        var x = e.deltaX;

        side_value = (x / sideWidth) * 100;

      //  console.log(this.sideRef.current.style.transform.split('(')[1].split(')')[0].split('%')[0]);




        if (this.state.direction === 'rtl') {
          this.sideRef.current.style.transform = "translateX(" + side_value + "%)";
          if (Number(this.sideRef.current.style.transform.split('(')[1].split(')')[0].split('%')[0]) < 0) {
            this.sideRef.current.style.transform = "translateX(0%)";
          }
          else {
            realSide = side_value;
          }
        }
        if (this.state.direction === 'ltr') {


          this.sideRef.current.style.transform = "translateX(" + side_value + "%)";
          if (Number(this.sideRef.current.style.transform.split('(')[1].split(')')[0].split('%')[0]) > 0) {
            this.sideRef.current.style.transform = "translateX(0%)";
          }
          else {
            realSide = side_value;
          }
        }

        if (e.isFinal) {
        }

      });

      hammertime.on("panend", e => {

        if (this.isSwiped == false) {
          // alert(8)
          setTimeout(() => {
            if (Math.abs(realSide) > 30) {
              this.close();
            }
            else {
              this.open();
            }
          }, 1);
        }

      })

  

      hammertime.on("swipe", e => {
        this.isSwiped = true;
        setTimeout(() => {
          if (Math.abs(realSide) > 30) {
            this.close();
          }
          else {
            this.open();
          }
          this.isSwiped = false;
        }, 2);
      });







    }, 100);




  }




  open() {
    this.sideRef.current.style.transitionDuration = '0.4s';
    this.status = 'open';
    this.setState({ showSide: true })
    var side_value = 0;
    this.sideRef.current.style.transform = "translateX(" + side_value + "%)"

    if (this.props.onOpen) {
      this.props.onOpen(true);
    }
  }

  

  close() {
    this.sideRef.current.style.transitionDuration = '0.4s';
    this.status = 'close';
    this.setState({ showSide: false })
    var side_value = this.state.direction === 'rtl' ? 100 : -100;
    this.sideRef.current.style.transform = "translateX(" + side_value + "%)"
    // this.setState({ side_value: this.state.direction === 'rtl' ? 100 : -100 });
    if (this.props.onClose) {
      this.props.onClose(true);
    }

  }

  close_side_menu() {
    window.addEventListener('click', (event) => {

      var ref = this.sideRef.current

      if (!ref.contains(event.target)) {
        this.setState({ side_value: this.props.side_value })
      }

      console.log(this.sideRef.current)

    })



  }

  setTransform() {
    var value = 0;
    if (this.state.direction === 'rtl') {

      value = 0;

    }
    else {
      value = 0;
    }

    return value;

  }

  render() {
    return (

      <React.Fragment>


        <div id="fd" className={styles.akbariSideMenu} ref={this.sideRef}
          style={{
            width: this.props.width + '%',
            direction: this.props.direction,
            right: this.state.direction === 'rtl' ? '0' : 'auto',
            left: this.state.direction === 'ltr' ? '0' : 'auto',
            transform: 'translateX(' + this.state.side_value + '%' + ')',
            boxShadow: this.state.direction === 'rtl' ? '-2px 0 4px rgba(0,0,0,0.2)' : '2px 0 4px rgba(0,0,0,0.2)'
          }}
        >

          <div className={styles.akbariClose}
            style={{
              left: this.state.direction === 'rtl' ? '10px' : 'auto',
              right: this.state.direction === 'ltr' ? '10px' : 'auto',
              display: this.props.showCloseButton ? 'flex':'none'
            }}
            onClick={this.close.bind(this)}   >&times;</div>
       

          {this.props.children}

        </div>

        <div className={styles.akbar_back_drop}
          style={{ display: this.state.showSide ? 'block' : 'none' }}
          onClick={this.close.bind(this)}
        ></div>


      </React.Fragment>
    )
  }

} 
