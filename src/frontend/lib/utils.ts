export const isDev =
  typeof window !== 'undefined'
    ? location.hostname === 'localhost'
    : process.env.NODE_ENV === 'development';

export const numToHexColor = (num: number): string => {
  if (!(0x000000 <= num && num <= 0xffffff)) throw new Error(`Invalid number ${num}`);
  return '#' + num.toString(16).padStart(6, '0');
};
