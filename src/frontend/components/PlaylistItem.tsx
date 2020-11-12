import classes from './PlaylistItem.module.scss';

interface Props {
  name: string;
}

const PlaylistItem: React.FC<Props> = (props) => (
  <section className={classes.container}>
    <h3>{props.name}</h3>
  </section>
);

export default PlaylistItem;
