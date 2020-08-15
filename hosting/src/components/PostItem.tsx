import React, { useState } from 'react';
import CreateItemButton from './CreateItemButton';

const PostItem: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateItemButton onClick={() => setOpen(true)} />
    </>
  );
};
export default PostItem;
