export const isDev =
  typeof window !== 'undefined'
    ? location.hostname === 'localhost'
    : process.env.NODE_ENV === 'development';
