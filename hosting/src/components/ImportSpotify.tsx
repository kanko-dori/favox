import React, { useState } from 'react';
import ImportSpotifyButton from './ImportSpotifyButton';
import Modal from './Modal';
import classes from './ImportSpotify.module.css';
import { auth } from '../utils/firebase';

type Props = {
  username: string
}
const submitSpotify = (url: string, username: string) => {
  console.log(url) // https://open.spotify.com/playlist/1ZtNC59k667YeEaeWuIMCH?si=ZNfRAi4FS0iG5eL5PBZRBw
  console.log('import spotify');
  const splitURL = url.split('?')[0].split('/')
  const playlistID = splitURL[splitURL.length-1]
  if(!playlistID){
    console.error("not found: playlistID")
    return
  }

  auth.currentUser?.getIdToken().then(token => {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    const body = JSON.stringify({playlistID})
    const method = "POST"
    fetch(`https://us-central1-favoxes.cloudfunctions.net/api/api/${username}/spotify`,{method, headers,body}).then(
      response => response.json()
    ).then(
      data => console.log(data)
    ).catch(
      e => console.error(e)
    )
  })
}
const ImportSpotify: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [spotifyURL, setSpotifyURL] = useState('')
  const onSubmit = () => {};

  return (
    <>
      <ImportSpotifyButton onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <section className={classes.container}>
          <div className={classes.header}>
            <h3>Import from Spotify</h3>
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
              <h3><input type="text" placeholder="Spotify playlist URL" className={classes.title} required value={spotifyURL} onChange={e => setSpotifyURL(e.target.value)}/></h3>
              <p className={classes.footer}>
                <div className={classes.spacer} />
                <div><input type="submit" value="SEND" className={classes.submit} onClick={e => {e.preventDefault();submitSpotify(spotifyURL, props.username)}}/></div>
              </p>
            </div>
          </form>
        </section>
      </Modal>
    </>
  );
};
export default ImportSpotify;
