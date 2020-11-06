import { Song } from '../../types';

interface Props {
  song: Song;
}

const Cover: React.FC<Props> = (props: Props) => {
  return <section>{props.song.title}</section>;
};

export default Cover;
