import { Request, Response } from 'express';
import { getToken, getUserInfomation } from './lib/spotify';
import { saveUserAndSpotifyUser } from './lib/firestore';


export const spotifyCallbackHandler = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;
  const uid = req.query.state as string;
  try {
    const { accessToken, refreshToken } = await getToken(code);
    const userData = await getUserInfomation(accessToken);
    await saveUserAndSpotifyUser(uid, userData, accessToken, refreshToken);
  } catch (e) {
    res.send(e);
    return;
  }
  res.redirect('/');
};
