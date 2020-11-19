import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Modal    from '@material-ui/core/Modal';
import Fade     from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

export default class ModalImage extends React.PureComponent {
  static styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      display: 'flex',
      flex: 1,
      objectFit: 'contain',
      height: '75vh',
      marginLeft: 50,
      marginRight: 50,
      backgroundColor: 'white',
    },
  });

  render(){
    const { styles } = ModalImage;
    const props = this.props;

    return (
      <Modal
        className={css(styles.modal)}
        open={props.isOpen}
        onClose={props.onModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isOpen}>
          <img
            className={css(styles.image)}
            draggable={false}
            src={props.imageSource}
          />
        </Fade>
      </Modal>
    );
  };
};