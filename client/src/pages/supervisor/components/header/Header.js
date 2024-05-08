import styles from './Header.module.css';

const Header = () => {
  return (
    <div id={styles.container}>
     <nav>
        <a href='http://localhost:3000/'>
          <img src="/images/logo.png" alt="Logo" />
          <h1>WARZONE ELITE</h1>
        </a>

        <a id={styles.logoutbtn}>
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Header;