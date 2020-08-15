import React, { useState } from 'react';
import { Item } from '../types/types';
import Modal from './Modal';

interface Props {
  item: Item;
}

const EditItem: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <section>
        <h3>Post</h3>
      </section>
    </Modal>
  );
};
export default EditItem;
