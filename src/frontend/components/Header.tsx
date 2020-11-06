interface Props {
  title?: string;
}

const Header: React.FC<Props> = (props: Props) => (
  <header>
    <h1>Favox</h1>
    <p>{props.title}</p>
  </header>
);

export default Header;
