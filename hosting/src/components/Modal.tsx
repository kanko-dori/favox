import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const styles = {
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const Modal: React.FC<Props> = (props: Props) => (
  <ReactModal
    isOpen={props.open}
    onRequestClose={props.onClose}
  >
    { props.children }
  </ReactModal>
);

export default Modal;
