declare module 'colorthief' {
  function getColor(url: string, quality?: number | undefined): Promise<[number, number, number]>;
  function getPalette(
    url: string,
    colorCount?: number,
    quality?: number
  ): Promise<[number, number, number][]>;
}
