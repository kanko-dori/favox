import React, { useState } from 'react';
import CreateItemButton from './CreateItemButton';
import EditItem from './EditItem';

const PostItem: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateItemButton onClick={() => setOpen(true)} />
      <EditItem open={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default PostItem;
