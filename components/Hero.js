import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero} id="home">
            <div className={styles.container}>
                <div className={styles.badge}>📅 অনুষ্ঠান নিবন্ধন চলছে</div>
                <h1 className={styles.title}>নিয়ামতপুর যুব সমবায় সমিতি লিঃ</h1>
                <p className={styles.subTitle}>গ্রাম নিয়ামতপুর, পোস্টঃ সেংগ্রাম, থানাঃ কাহালু, জেলাঃ বগুড়া</p>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.val}>৳১০০০</div>
                        <div className={styles.lbl}>সমিতি সদস্য ফি</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.val}>৳৫০০</div>
                        <div className={styles.lbl}>পরিবার সদস্য ফি</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.val}>৫ মে</div>
                        <div className={styles.lbl}>নিবন্ধনের শেষ তারিখ</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.val}>সকাল ১০টা</div>
                        <div className={styles.lbl}>অনুষ্ঠান শুরুর সময়</div>
                    </div>
                </div>

                <a href="#register" className={styles.btnRegister}>এখনই নিবন্ধন করুন →</a>
            </div>
        </section>
    );
}
