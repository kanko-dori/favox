import { useUser } from '@/lib/UserProvider';
import Link from 'next/link';
import classes from './Header.module.scss';
import LogoutButton from './LogoutButton';

interface Props {
  title?: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const user = useUser();
  return (
    <header className={classes.header}>
      <Link href={user?.uid ? '/my' : '/'}>
        <a className={classes.favox}>
          <h1>Favox</h1>
        </a>
      </Link>
      {title && (
        <>
          <div className={classes.divider} />
          <h3 className={classes.title}>{title}</h3>
        </>
      )}
      <div className={classes.spacer} />
      {user?.uid && <LogoutButton />}
    </header>
  );
};

export default Header;
