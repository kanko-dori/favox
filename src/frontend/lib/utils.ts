export const isDev =
  typeof window !== 'undefined'
    ? location.hostname === 'localhost'
    : process.env.NODE_ENV === 'development';

export const numToHexColor = (num: number): string => {
  if (!(0x000000 <= num && num <= 0xffffff)) throw new Error(`Invalid number ${num}`);
  return '#' + num.toString(16).padStart(6, '0');
};

export const createGainedAudioNode = (
  context: AudioContext,
  gain: number,
  element: HTMLAudioElement
): { sourceNode: MediaElementAudioSourceNode; gainNode: GainNode } => {
  const sourceNode = context.createMediaElementSource(element);
  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(gain, context.currentTime);
  sourceNode.connect(gainNode);

  return { sourceNode, gainNode };
};

export const getAbsolutePath = (path: string): string => `${process.env.ORIGIN}${path}`;
