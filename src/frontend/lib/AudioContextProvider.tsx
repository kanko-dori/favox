import { createContext, useContext, useEffect, useState } from 'react';

type NullableAudioContext = AudioContext | null;

const AudioContextContext = createContext<NullableAudioContext>(null);

export const AudioContextProvider: React.FC = ({ children }) => {
  const [context, setContext] = useState<NullableAudioContext>(null);
  useEffect(() => setContext(new AudioContext()), []);
  return <AudioContextContext.Provider value={context}>{children}</AudioContextContext.Provider>;
};

export const useAudioContext = (): NullableAudioContext => useContext(AudioContextContext);
