import { Request, Response } from 'express';
import { getToken, getUserInfomation } from './lib/spotify';
import { saveUser, saveSpotifyUser } from './lib/firestore';

export const spotifyCallbackHandler = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;
  const uid = req.query.state as string;
  try {
    const { accessToken, refreshToken } = await getToken(code);
    const userData = await getUserInfomation(accessToken);

    const promises = [] as Promise<unknown>[];
    promises.push(saveUser(uid, userData));
    promises.push(saveSpotifyUser(uid, userData.id, accessToken, refreshToken));
    await Promise.all(promises);
  } catch (e) {
    res.send(e); //FIXME: エラーのときにどうするか考える
    return;
  }
  res.redirect('/loading');
};
