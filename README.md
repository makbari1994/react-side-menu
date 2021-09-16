## akbari-side-menu - React-Side-Menu
React side menu 

This is the best React Side Menu with ability Swipe and Touch . Rtl and Ltr Direction .  



## Demo 

 [Demo](http://react.sidemenu.akbar-baba.ir/)

 ![demo](https://akbar-baba.ir/side_590x300.png)

## How To Install Step By Step

## Step-One

run 

``` 
npm install hammerjs 
``` 

## Step-Two

run 

``` 
npm install akbari-side-menu 
``` 

## Step-Three

import these lines in **App.js** . **App.js** is in **Src/App.js**   &nbsp; of react project .

``` 
import { AkbariSideMenu } from 'akbari-side-menu/dist/index';
import 'akbari-side-menu/dist/index.css';

```

dont forget top lines specially css file 

## Step-Four

simple example of use 

``` 

  <AkbariSideMenu
     ref={this.rightSideMenu}
     pcWidth={50}
     mobileWidth={80}
     onClose={this.onClose.bind(this)}
     onOpen={this.onOpen.bind(this)}
     direction={'rtl'}
     showCloseButton={true}
   >

                //// you can write any html and react and css code here 

  </AkbariSideMenu>

```

## full example of code

``` 

import React from 'react'; 

import { AkbariSideMenu } from 'akbari-side-menu/dist/index';
import 'akbari-side-menu/dist/index.css';


export default class Home extends React. Component {

    constructor() {
        super();
        this.sideRef = React.createRef();

    }

 

    openSideMenu() {
        this.sideRef.current.open();

    }

    onOpen() {

    }

    onClose() {

    }

    render() {
        return (
            <>

      <button type="button" className="right" onClick={this.openSideMenu.bind(this)} >open side menu </button>

             

                <AkbariSideMenu
                    ref={this.sideRef}
                     pcWidth={50}
                     mobileWidth={80}
                     onClose={this.onClose.bind(this)}
                     onOpen={this.onOpen.bind(this)}
                     direction={'rtl'}
                    showCloseButton={true}
                >

                    <div className="header">
                        <div className="one">
                            <img src="./assets/img/my.jpg" />
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

            </>
        )

    }

}

``` 

## how to open and close Side Menu 

first you have to create ref for AkbariSideMenu 

html code 

``` 

<AkbariSideMenu
 ref={this.sideRef}
</AkbariSideMenu>

``` 

js code 

``` 

 constructor() {
        super(); 
        this.sideRef = React.createRef(); 

    }

``` 

then you can call open and close method in AkbariSideMenu

``` 

open(){
 this.sideRef.current.open(); 
}
close(){
   this.sideRef.current.close(); 
}

``` 

## props

## pcWidth  => type = number  => this is percent of width in pc  that you have to set a number between 0 and 100 

Example 

``` 
   <AkbariSideMenu

      pcWidth={60}

   </AkbariSideMenu>

``` 

this example means 60% of window width

## mobileWidth  => type = number  => this is percent of width in mobile devices  that you have to set a number between 0 and 100 

Example 

``` 
   <AkbariSideMenu

      mobileWidth={60}

   </AkbariSideMenu>

``` 

this example means 60% of window width

## direction => type = string => direction of side menu = > values => 'rtl' or 'ltr'

you can set side menu open from right or left .

``` 
   <AkbariSideMenu

      direction={'rtl'}

   </AkbariSideMenu>

``` 

## showCloseButton => type = boolean = > values = true or false 

this prop is for  show close button or hide close button 

``` 
   <AkbariSideMenu

      showCloseButton={true}

   </AkbariSideMenu>

``` 

## onOpen

this prop is for detect side menu opened

html 
``` 
   <AkbariSideMenu

      onOpen={this.onOpen.bind(this)}

   </AkbariSideMenu>

``` 
js

``` 
onOpen(event){

}

``` 

## onClose

this prop is for detect side menu closed

html 
``` 
   <AkbariSideMenu

     onClose={this.onClose.bind(this)}

   </AkbariSideMenu>

``` 
js

``` 
onClose(event){

}

``` 

## finally

hope to enjoy it ; 

report  bugs to makbarics@gmail.com
