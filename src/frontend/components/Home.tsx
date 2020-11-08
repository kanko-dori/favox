import LoginButton from './LoginButton';
import classes from './Home.module.scss';

const Home: React.FC = () => (
  <div>
    <section className={classes.eyecatch} />
    <section className={classes.form}>
      <p>好きを共有しませんか？</p>
      <h3>What is your favorite?</h3>
      <LoginButton />
    </section>
  </div>
);

export default Home;
