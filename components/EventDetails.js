import styles from './EventDetails.module.css';

export default function EventDetails() {
    return (
        <section className={`${styles.eventSection} reveal`} id="event">
            <div className={styles.container}>
                <span className={styles.tag}>অনুষ্ঠানের বিবরণ</span>
                <h2 className={styles.title}>অনুষ্ঠান নিবন্ধন ২০২৬</h2>
                <p className={styles.desc}>নিয়ামতপুর সরকারি প্রাথমিক বিদ্যালয় মাঠে আয়োজিত আমাদের বার্ষিক অনুষ্ঠানে আপনাকে ও আপনার পরিবারকে স্বাগতম।</p>

                <div className={styles.grid}>
                    <div className={styles.infoCards}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>📍</div>
                            <div>
                                <h4>স্থান</h4>
                                <p>নিয়ামতপুর সরকারি প্রাথমিক বিদ্যালয় মাঠ প্রাঙ্গণ</p>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>🕙</div>
                            <div>
                                <h4>সময়</h4>
                                <p>সকাল ১০ টা হতে সন্ধ্যা ৬ টা পর্যন্ত (দ্বিতীয় দিন)</p>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>📋</div>
                            <div>
                                <h4>নিবন্ধনের শেষ সময়</h4>
                                <p>০৫ই মে ২০২৬, রাত ১১ টা ৫৯ মিনিট পর্যন্ত</p>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>👶</div>
                            <div>
                                <h4>শিশু সদস্য</h4>
                                <p>১২ বছরের উপরে বাচ্চা থাকলে রেজিস্ট্রেশন করতে হবে</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.feeBox}>
                        <h3>💰 নিবন্ধন ফি বিবরণ</h3>
                        <div className={styles.feeRow}>
                            <span className={styles.feeLabel}>সমিতি সদস্য রেজিস্ট্রেশন</span>
                            <span className={styles.feeAmount}>৳ ১,০০০</span>
                        </div>
                        <div className={styles.feeRow}>
                            <span className={styles.feeLabel}>পরিবারের সদস্য রেজিস্ট্রেশন</span>
                            <span className={styles.feeAmount}>৳ ৫০০</span>
                        </div>
                        <div className={styles.paymentMethods}>
                            <h4>পেমেন্ট পদ্ধতি</h4>
                            <div className={styles.paymentBadges}>
                                <span className={styles.payBadge}>📱 বিকাশ: 01743467764</span>
                                <span className={styles.payBadge}>💚 নগদ: 01632269384</span>
                                <span className={styles.payBadge}>💵 সরাসরি নগদ (শান্ত)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
