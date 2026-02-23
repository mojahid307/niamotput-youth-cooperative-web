import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>নিয়ামতপুর যুব সমবায় সমিতি লিঃ</div>
            <ul className={styles.navLinks}>
                <li><a href="#event">অনুষ্ঠান</a></li>
                <li><a href="#register">নিবন্ধন</a></li>
                <li><a href="#about">আমাদের সম্পর্কে</a></li>
                <li><a href="#contact">যোগাযোগ</a></li>
            </ul>
        </nav>
    );
}
