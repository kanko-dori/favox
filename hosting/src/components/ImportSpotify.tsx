import React, { useState } from 'react';
import ImportSpotifyButton from './ImportSpotifyButton';
import Modal from './Modal';
import classes from './ImportSpotify.module.css';

const ImportSpotify: React.FC = () => {
  const [open, setOpen] = useState(false);
  const onSubmit = () => {

  };
  return (
    <>
      <ImportSpotifyButton onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <section className={classes.container}>
          <div className={classes.header}>
            <h3>Post</h3>
            <div className={classes.spacer} />
            <div
              className={classes.close}
              onClick={() => setOpen(false)}
              role="button"
              aria-hidden
              aria-label="close"
            />
          </div>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.textfields}>
              <h3><input type="text" placeholder="Spotify playlist URL" className={classes.title} required /></h3>
              <p className={classes.footer}>
                <div className={classes.spacer} />
                <div><input type="submit" value="SEND" className={classes.submit} /></div>
              </p>
            </div>
          </form>
        </section>
      </Modal>
    </>
  );
};
export default ImportSpotify;
