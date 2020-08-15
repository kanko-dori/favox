/* eslint-disable import/prefer-default-export */
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import { Request, Response } from 'express';
import { addNewPlaylistParams, getParam, getItem } from './types/route';
import { Playlist } from './types/spotify';
import { Items } from './types/items';
import * as repository from './repository';

export const ping = (_request: Request, response: Response): void => {
  functions.logger.info('ping');
  response.sendStatus(200);
};

const fetchPlaylist = (playlistID:string):Promise<Playlist> => new Promise((resolve, reject) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${functions.config().spotify.token}`,
  };
  fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, { headers })
    .then((res) => res.json())
    .then((data: Playlist) => resolve(data))
    .catch((err) => reject(err));
});

export const addNewPlaylist = (
  request: Request<addNewPlaylistParams>,
  response: Response,
): void => {
  const { playlistID } = request.body;
  fetchPlaylist(playlistID).then(
    (data) => {
      const playlist: Items = data.items.map((item) => ({
        imageURL: item.track.album.images[0].url,
        title: item.track.name,
        description: '',
        url: '',
        color: '',
      }));
      return playlist;
    },
  ).then(
    (playlist) => {
      repository.saveItems(request.params.userID, playlist);
      response.json(playlist);
    },
  ).catch((err) => {
    console.error(err);
    response.sendStatus(500);
  });
};

export const getItems = (request: Request<getParam>, response: Response) : void => {
  repository.getItems(request.params.userID).then(
    (items) => {
      response.json(items);
    },
  );
};

export const getItemByNumber = (request: Request<getItem>, response: Response) : void => {
  const number = parseInt(request.params.itemNumber, 10);
  if (Number.isNaN(number)) {
    response.sendStatus(400);
  }
  repository.getItems(request.params.userID).then(
    (items) => {
      const item = items[number];
      response.json(item);
    },
  );
};
