import ColorThief from 'colorthief';

export const getDominantColor = async (url: string): Promise<number> => {
  const [r, g, b] = (await ColorThief.getPalette(url, 2))[0];

  return (r << 16) + (g << 8) + b;
};
