import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Loader from 'react-loader-spinner';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MessageA    = React.lazy(() => import('components/MessageA'));
const ImageBanner = React.lazy(() => import('components/ImageBanner'));
const ModalImage  = React.lazy(() => import('components/ModalImage'));

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

  constructor(props){
    super(props);

    this.state = {
      isModalImageOpen    : false,
      selectedImageSource : null ,
      selectedImageBgColor: null,
    };
  };

  _handleOnClickGridItem = ({bgColor, imageSource}) => {
    this.setState({
      isModalImageOpen    : true,
      selectedImageSource : imageSource,
      selectedImageBgColor: bgColor,
    });
  };

  _handleOnModalClose = () => {
    this.setState({isModalImageOpen: false});
  };

  render(){
    const { styles } = App;
    const state = this.state;

    return(
      <div className={css(styles.rootContainer)}>
        <React.Suspense fallback={<Loading/>}>
          <div className={css(styles.sectionWrapper)}>
            <ImageBanner
              onClickGridItem={this._handleOnClickGridItem}
            />
          </div>
          <div className={css(styles.sectionWrapper)}>
            <MessageA/>
          </div>
          <ModalImage
            isOpen     ={state.isModalImageOpen    }
            bgColor    ={state.selectedImageBgColor}
            imageSource={state.selectedImageSource }
            // events
            onModalClose={this._handleOnModalClose}
          />
        </React.Suspense>
      </div>
    );
  };
};
