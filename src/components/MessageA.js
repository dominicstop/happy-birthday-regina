import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { motion } from "framer-motion";

import Button from '@material-ui/core/Button';

import VisibilitySensor from 'react-visibility-sensor';
import ConfettiOverlay from './ConfettiOverlay';

export default class MessageA extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      overflow: 'hidden',
      height: 'inherit',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    message: {
      fontFamily: 'roboto',
      fontWeight: 600,
      // small screen width
      fontSize: '20vw',
      marginBottom: 10,
      // big screen width
      '@media only screen and (min-width: 900px)': {
        fontSize: '10vw',
        marginBottom: 5,
      },
    },
    buttonContainer: {
      marginTop: 15,
    },
  });

  constructor(props){
    super(props);

    this.state = {
      mount: false,
      mountConfetti: false
    };
  };

  _handleOnClickMessageButton = (event) => {
    alert(
        "Congratulatins, you've just won a brand new iPhone 12"
      + "\n\n Char lang! HAHAHHAHHAHA Miss you brad, see u after covid and stay safe 😘"
      + "\n\n\n💖"
    );
  };

  _handleVisibilityOnChange = (isVisible) => {
    const { mount } = this.state;
    if(!mount && isVisible){
      this.setState({
        mount: true,
      });
    };
  };

  _handleOnMessageAnimationComplete = () => {
    const { mountConfetti } = this.state;
    if(!mountConfetti){
      this.setState({
        mountConfetti: true,
      });
    };
  };

  render(){
    const { styles } = MessageA;
    const state = this.state;

    return(
      <VisibilitySensor onChange={this._handleVisibilityOnChange}>
        <div className={css(styles.rootContainer)}>
          {state.mountConfetti && (
            <ConfettiOverlay/>
          )}
          {state.mount && (
            <React.Fragment>
              <motion.label 
                className={css(styles.message)}
                initial={{opacity: 0, translateY: 25}}
                animate={{opacity: 1, translateY: 0}}
                transition={{duration: 0.25, delay: 0.7}}
              >
                {'Happy'}
              </motion.label>
              <motion.label 
                className={css(styles.message)}
                initial={{opacity: 0, translateY: 25}}
                animate={{opacity: 1, translateY: 0}}
                transition={{duration: 0.5, delay: 0.8}}
              >
                {'Birthday'}
              </motion.label>
              <motion.label
                className={css(styles.message)}
                initial={{opacity: 0, translateY: 25}}
                animate={{opacity: 1, translateY: 0}}
                transition={{duration: 0.75, delay: 0.9}}
                onAnimationComplete={this._handleOnMessageAnimationComplete}
              >
                {'Regina'}
              </motion.label>
              <motion.div
                className={css(styles.buttonContainer)}
                initial={{opacity: 0, translateY: 25}}
                animate={{opacity: 1, translateY: 0}}
                transition={{duration: 0.75, delay: 1.2}}
              >
                <Button 
                  size={'large'}
                  onClick={this._handleOnClickMessageButton}
                >
                  {'✨ ( Hey There ) ✨'}
                </Button>
              </motion.div>
            </React.Fragment>
          )}
        </div>
      </VisibilitySensor>
    );
  };
};