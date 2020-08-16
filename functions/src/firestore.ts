import {
  Change, EventContext, firestore, logger,
} from 'firebase-functions';
import * as vision from '@google-cloud/vision';
import { Item } from './types/items';
import { db } from './utils/firebase';

// eslint-disable-next-line import/prefer-default-export
export const documentOnUpdate = (
  change: Change<firestore.DocumentSnapshot>,
  context: EventContext,
):void => {
  logger.log('users/{userId}/items/{itemId}');
  logger.log(change.after.data());
  // const before = change.before.data() as Item;
  const after = change.after.data() as Item;
  const { userId, itemId } = context.params;
  if (after.color !== '') {
    logger.log('alreadly exists: ', after.color);
  }
  // console.log(after.title, after.imageURL);
  const client = new vision.ImageAnnotatorClient();
  client.imageProperties(after.imageURL).then(
    ([result]) => {
      logger.log(result.imagePropertiesAnnotation?.dominantColors);
      if (result.imagePropertiesAnnotation?.dominantColors == null || undefined) {
        return;
      }
      const { colors } = result.imagePropertiesAnnotation.dominantColors;
      if (colors == null || undefined) {
        return;
      }
      let maxscore = 0;
      let maxscorered = 0;
      let maxscoregreen = 0;
      let maxscoreblue = 0;
      let downbrightR = 0;
      let downbrightG = 0;
      let downbrightB = 0;
      // let maxFractionred,maxFractiongreen,maxFractionblue;
      maxscore = 0;
      colors.forEach((color) => {
        if (color.score == null || undefined) {
          return;
        }
        if (color.color == null || undefined) {
          return;
        }
        if (color.color.red == null || undefined) {
          return;
        }
        if (color.color.green == null || undefined) {
          return;
        }
        if (color.color.blue == null || undefined) {
          return;
        }
        if (color.score >= maxscore) { // 焦点に当てたい物のRGB値を取得
          maxscore = color.score;
          logger.log(`maxscore=${maxscore}`);
          maxscorered = color.color.red;
          maxscoregreen = color.color.green;
          maxscoreblue = color.color.blue;
        }
        // if(color.pixelFraction >= maxFraction){ //一番使われている色のRGB値を取得
        //     maxFraction = color.pixelFraction;
        //     console.log("maxFraction=" + maxFraction);
        //     maxFractionred = color.color.red;
        //     maxFractiongreen = color.color.green;
        //     maxFractionblue = color.color.blue
        // }
      });
      //    //補色の計算
      //     let max = Math.max(maxFractionred, Math.max(maxFractiongreen, maxFractionblue));
      //     let min = Math.min(maxFractionred, Math.min(maxFractiongreen, maxFractionblue));
      //     let sum = max + min;
      //     let compR = sum - maxFractionred;
      //     let compG = sum - maxFractiongreen;
      //     let compB = sum - maxFractionblue;

      // 明度を落とした判定
      // eslint-disable-next-line max-len
      if (Math.abs(maxscorered - maxscoregreen) < 10 && Math.abs(maxscorered - maxscoreblue) < 10 && maxscorered < 100) { // 黒なら明度を上げる
        downbrightR = Math.round(2.5 * maxscorered);
        downbrightG = Math.round(2.5 * maxscoregreen);
        downbrightB = Math.round(2.5 * maxscoreblue);
      } else {
        downbrightR = Math.round(maxscorered * 0.8); // そうでないなら明度は下げる
        downbrightG = Math.round(maxscoregreen * 0.8);
        downbrightB = Math.round(maxscoreblue * 0.8);
      }

      logger.log(`背景色に明度を落とした色を提案｛R:${downbrightR},G:${downbrightG},B:${downbrightB}}`);

      const colorcode = `#${downbrightR.toString(16)}${downbrightG.toString(16)}${downbrightB.toString(16)}`;
      logger.log(colorcode);
      db.collection('users')
        .doc(userId)
        .collection('items')
        .doc(itemId)
        .update({ color: colorcode })
        .then(
          () => logger.log('successfully updated.', after.title, colorcode),
        )
        .catch(
          (e) => logger.error('error: ', e, after.title),
        );
    },
  ).catch((e) => logger.error('visonAPI failed.', e));
};
