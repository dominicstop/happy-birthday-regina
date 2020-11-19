import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { motion, AnimationControls } from "framer-motion";

import * as Helpers from "functions/helpers";
import * as Colors  from "constants/Colors";

import ImageLinkStepper from 'functions/ImageLinkStepper';

import chroma from 'chroma-js';
import { FadeInImage } from './FadeInImage';

class ColorRollover {
  constructor(){
    const colors = [
      Colors.RED    .A700,
      Colors.ORANGE .A700,
      Colors.YELLOW .A700,
      Colors.GREEN  .A700,
      Colors.BLUE   .A700,
      Colors.VIOLET .A700,
      Colors.BLUE   .A700,
      Colors.GREEN  .A700,
      Colors.YELLOW .A700,
      Colors.ORANGE .A700,
    ];

    this.colors = chroma
      .scale(colors)
      .mode('hsl')
      .colors(colors.length * 15);

    this.index = 0;
  };

  getColor(){
    const colorsCount = this.colors.length;

    if(this.index >= colorsCount){
      this.index = 0;
    };

    return this.colors[this.index++];
  };
};

const colorRollover = new ColorRollover();

class GridItem extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      height: '50vh',
      // small screen width
      width: '50vw',
      // big screen width
      '@media only screen and (min-width: 900px)': {
        width: '25vw',
      },
    },
    image: {
      width: 'inherit',
      height: 'inherit',
      objectFit: 'cover',
      filter: 'grayscale(40%) opacity(40%)',
    },
  });

  constructor(props){
    super(props);

    this.imageSource = ImageLinkStepper.getImageLink();
    this.bgColor     = colorRollover.getColor();
  };

  render(){
    const { styles } = GridItem;

    return (
      <motion.div 
        className={css(styles.rootContainer)}
        style={{backgroundColor: this.bgColor}}
        whileHover={{ 
          scale: 1.1 ,
          zIndex: 99,
          'webkit-box-shadow': '10px 10px 48px -7px rgba(0,0,0,0.56)',
          'moz-box-shadow'   : '10px 10px 48px -7px rgba(0,0,0,0.56)',
          'box-shadow'       : '10px 10px 48px -7px rgba(0,0,0,0.56)',
        }}
      >
        <img
          className={css(styles.image)}
          draggable={false}
          src={this.imageSource}
        />
      </motion.div>
    );
  };
};

export default class ImageBanner extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      width: 'inherit',
      height: 'inherit',
      overflow: 'hidden',

    },
    bannerWrapper: {
      width: 'inherit',
      height: 'inherit',
      overflow: 'hidden',
    },
    bannerWrapperB: {
      position: 'absolute',
      top: 0,
    },
    bannerContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: 'inherit',
      flexWrap: 'wrap',
      // small screen width
      width: '400vw',
      // big screen width
      '@media only screen and (min-width: 900px)': {
        width: '200vw',
      },
    },
  });

  constructor(props){
    super(props);

    this.state = {
      mountA: true,
      mountB: false,
    };

    this.gridItems = Helpers.range(1, 16);

    this.animating = true;
    this.isInitial = true;
    
    this.animationContolsRoot   = new AnimationControls();
    this.animationContolsBannerA = new AnimationControls();
    this.animationContolsBannerB = new AnimationControls();
  };

  async componentDidMount(){
    this.animationContolsRoot   .mount();
    this.animationContolsBannerA.mount();
    this.animationContolsBannerB.mount();

    this.animationContolsRoot.start({
      opacity: 1,
      transition: {
        duration: 6,
      },
    });

    this.startAnimation();
  };

  componentWillUnmount(){
    this.animationContolsRoot   .unmount();
    this.animationContolsBannerA.unmount();
    this.animationContolsBannerB.unmount();
  };

  startAnimation = async () => {
    const { mountA, mountB } = this.state;
    if(!this.animating) return;

    const DURATION = 25;

    if(this.isInitial){
      this.isInitial = false;
      await this.animationContolsBannerA.start({
        translateX: '-50%',
        transition: {
          duration: DURATION,
          ease: 'linear',
        },
      });

      await Helpers.setStateAsync(this, {
        mountB: true,
      });

      await Promise.all([
        this.animationContolsBannerA.start({
          translateX: '-100%',
          transition: {
            duration: DURATION,
            ease: 'linear',
          },
        }),
        this.animationContolsBannerB.start({
          translateX: '0%',
          transition: {
            duration: DURATION,
            ease: 'linear',
          },
        })
      ]);

      await Helpers.setStateAsync(this, {
        mountA: false,
      });
      
    } else if(!this.isInitial && !mountA && mountB) {
      await Helpers.setStateAsync(this, {
        mountA: true,
      });

      await Promise.all([
        this.animationContolsBannerA.start({
          translateX: ['50%', '-50%'],
          transition: {
            duration: DURATION * 2,
            ease: 'linear',
          },
        }),
        this.animationContolsBannerB.start({
          translateX: ['0%', '-100%'],
          transition: {
            duration: DURATION * 2,
            ease: 'linear',
          },
        }),
      ]);

      await Helpers.setStateAsync(this, {
        mountB: false,
      });

    } else if(!this.isInitial && mountA && !mountB) {
      await Helpers.setStateAsync(this, {
        mountB: true,
      });

      await Promise.all([
        this.animationContolsBannerA.start({
          translateX: ['-50%', '-100%'],
          transition: {
            duration: DURATION,
            ease: 'linear',
          },
        }),
        this.animationContolsBannerB.start({
          translateX: ['50%', '0%'],
          transition: {
            duration: DURATION,
            ease: 'linear',
          },
        }),
      ]);

      await Helpers.setStateAsync(this, {
        mountA: false,
      });
    };

    if(this.animating) this.startAnimation();
  };

  render(){
    const { styles } = ImageBanner;
    const state = this.state;

    const items = [];
    for (let index = 0; index < 16; index++) {
      items.push(index);
    };

    const gridItems = items.map((index) => (
      <div 
        className={css(styles.bannerGridItem)}
        style={{backgroundColor: (index % 2 == 0)? 'red' :  'blue' }}
      />
    ));

    return (
      <motion.div 
        className={css(styles.rootContainer)}
        animate={this.animationContolsRoot}
        initial={{opacity: 0}}
      >
        {state.mountA && (
          <div className={css(styles.bannerWrapper)}>
            <motion.div 
              className={css(styles.bannerContainer)}
              initial={{ translateX: '0%'}}
              animate={this.animationContolsBannerA}
            >
              {this.gridItems.map(index => (
                <GridItem
                  key={`bannerA-${index}`}
                />
              ))}
            </motion.div>
          </div>
        )}
        {state.mountB && (
          <div className={css(styles.bannerWrapper, styles.bannerWrapperB)}>
            <motion.div 
              className={css(styles.bannerContainer)}
              initial={{ translateX: '50%' }}
              animate={this.animationContolsBannerB}
            >
              {this.gridItems.map(index => (
                <GridItem
                  key={`bannerB-${index}`}
                />
              ))}
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  };
};