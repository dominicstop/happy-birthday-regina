import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MessageA    = React.lazy(() => import('components/MessageA'));
const ImageBanner = React.lazy(() => import('components/ImageBanner'));

class Loading extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


  render(){
    const { styles } = Loading;
    return (
      <div className={css(styles.rootContainer)}>
        <Loader
          type="ThreeDots"
          color="black"
          height={100}
          width={100}
        />
      </div>
    );
  };
};

export default class App extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      height: '100vh',
    },
    sectionWrapper: {
      display: 'flex',
      width: '100%',
      height: '100vh',
    },
  });

  render(){
    const { styles } = App;

    return(
      <div className={css(styles.rootContainer)}>
        <React.Suspense fallback={<Loading/>}>
          <div className={css(styles.sectionWrapper)}>
            <ImageBanner/>
          </div>
          <div className={css(styles.sectionWrapper)}>
            <MessageA/>
          </div>
        </React.Suspense>
      </div>
    );
  };
};
