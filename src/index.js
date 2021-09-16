import React from 'react'
import styles from './styles.module.css'
import Hammer, { Swipe } from "hammerjs"

export class AkbariSideMenu extends React.Component {

  status;
  isSwiped = false;
  ref;
  hammerRef;
  touchType;

  constructor(props) {
    super(props);
    this.state = {
      width: Number(this.props.width),
      side_value: this.props.direction === 'ltr' ? -100 : 100,
      direction: this.props.direction ? this.props.direction : 'ltr',
      showSide: false,
      status: 'close',
      width: this.props.pcWidth,
      pcWidth: this.props.pcWidth,
      mobileWidth: this.props.mobileWidth
    }
    this.status = 'close';
    this.sideRef = React.createRef();

    //  this.onScroll();
  }
  componentDidMount() {
    this.config();
    this.onResize();
  }

  onResize() {
    window.addEventListener('resize', () => {
      if (this.hammerRef) {
        this.hammerRef.destroy();
      }
      this.config();
    })
  }

  componentWillUnmount() {
    if (this.hammerRef) {
      this.hammerRef.destroy();
    }
  }

  onScroll() {


    var timeout;
    setTimeout(() => {

      this.sideRef.current.addEventListener('scroll', (e) => {

        this.isScrolling = true;
        clearTimeout(timeout);
        var timeout = setTimeout(() => {
          this.isScrolling = false
        }, 150)

      }, { passive: true });

      window.addEventListener('touchend', () => {
        //  alert(1)
        this.isScrolling = false;
      });

    }, 100);




  }


  config() {
    if (window.matchMedia('(max-width:773px)').matches && /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
      this.touchType = Hammer.TouchInput;
      this.setState({ width: this.props.mobileWidth ? this.props.mobileWidth : 80 }, () => {
        this.pan();
      })

    }
    else {
      this.touchType = Hammer.MouseInput;
      this.setState({ width: this.props.pcWidth ? this.props.pcWidth : 50 }, () => {
        this.pan();
      })

    }


  }


  pan() {


    setTimeout(() => {
      this.ref = this.sideRef.current;

      this.hammerRef = new Hammer(this.ref, {
        inputClass: this.touchType,
        //   touchAction: 'auto'
      });
      this.hammerRef.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 })
      // this.hammerRef.get('rotate').set({ enable : true })
      // this.hammerRef.get('pinch').set({ enable: true });
      //


      var isStarted = false;
      var side_value = 0;


      var realSide = 0;


      var sideWidth = this.sideRef.current.clientWidth;




      this.hammerRef.on("panright panleft", e => {
        // if(e.pointerType == 'touch' && (Math.abs(e.deltaY) > Math.abs(e.deltaX))){
        //   //alert(15)
        //   return; }

        //   console.log(e)


        this.sideRef.current.style.transitionDuration = '0s';

        var x = e.deltaX;

        side_value = (x / sideWidth) * 100;

        // console.log(side_value)


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
            //console.log(15151)
          }
          else {

            realSide = side_value;
          }
        }

        if (e.isFinal) {
          realSide = side_value;

          this.isScrolling = false;
        }

      });


      var currentScroll = 0;
      var currentScale = 1; //"fully zoomed out" state
      var lastScroll = 0;

      var pan_direction = "panright";
      if (this.state.direction === 'ltr') {
        pan_direction = "panleft";
      }
      else {
        pan_direction = "panright";
      }

      var direction = "";

      this.hammerRef.on("panright press panleft", function (ev) {
        //Set the direction in here
        direction = ev.type;
      });


      this.hammerRef.on("panend", e => {
        realSide = side_value;
        this.isScrolling = false;

        setTimeout(() => {

          if ((this.state.direction === 'rtl' && direction === 'panright') || (this.state.direction === 'ltr' && direction === 'panleft')) {
            if (Math.abs(realSide) > 30) {
              this.close();
            }
            else {
              this.open();
            }
          }

          else {
            if ((this.state.direction === 'rtl' && direction === 'panleft') || (this.state.direction === 'ltr' && direction === 'panright')) {
              this.open();
            }
          }
        }, 1);

      })

    }, 100);


  }


  close_work(e) {

  }


  open() {
    this.sideRef.current.style.transitionDuration = '0.4s';
    this.status = 'open';
    this.setState({ showSide: true });
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

      // console.log(this.sideRef.current)

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
            width: this.state.width + '%',
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
              display: this.props.showCloseButton ? 'flex' : 'none'
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
