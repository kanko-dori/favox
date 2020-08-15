import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const styles = {
  modal: {
    content: {
      borderRadius: 0,
      padding: 0,
      border: 0,
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0, 0.4)',
    },
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Modal: React.FC<Props> = (props: Props) => (
  <ReactModal
    style={{ content: { ...styles.modal.content, ...props.style }, overlay: styles.modal.overlay }}
    isOpen={props.open}
    onRequestClose={props.onClose}
  >
    { props.children }
  </ReactModal>
);

Modal.defaultProps = {
  style: {},
};

export default Modal;
