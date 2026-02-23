import styles from './About.module.css';

export default function About() {
    return (
        <section className={`${styles.aboutSection} reveal`} id="about">
            <div className={styles.container}>
                <span className={styles.tag}>আমাদের সম্পর্কে</span>
                <h2 className={styles.title}>নিয়ামতপুর যুব সমবায় সমিতি লিঃ</h2>

                <div className={styles.grid}>
                    <div className={styles.visual}>
                        <h2>নিয়ামতপুর যুব সমবায় সমিতি লিঃ</h2>
                        <p>গ্রাম নিয়ামতপুর, বগুড়া</p>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <div className={styles.num}>সক্রিয়</div>
                                <div className={styles.lbl}>সমিতির অবস্থান</div>
                            </div>
                            <div className={styles.stat}>
                                <div className={styles.num}>২০২৬</div>
                                <div className={styles.lbl}>চলতি বছর</div>
                            </div>
                            <div className={styles.stat}>
                                <div className={styles.num}>৪+</div>
                                <div className={styles.lbl}>যোগাযোগ কর্মকর্তা</div>
                            </div>
                            <div className={styles.stat}>
                                <div className={styles.num}>বার্ষিক</div>
                                <div className={styles.lbl}>অনুষ্ঠানের ধরন</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.text}>
                        <p>নিয়ামতপুর যুব সমবায় সমিতি লিঃ গ্রাম নিয়ামতপুর, পোস্টঃ দেওগ্রাম, থানাঃ কাহালু, জেলাঃ বগুড়া'র একটি সক্রিয় সমবায় সংগঠন। এই সমিতি এলাকার যুব সমাজের উন্নয়নে ও সমাজ গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।</p>
                        <p>আমাদের মূল লক্ষ্য হলো সমাজের সকল স্তরের মানুষকে একত্রিত করে পারস্পরিক সহযোগিতা ও উন্নয়নের মাধ্যমে একটি সুন্দর ও সমৃদ্ধ সমাজ গড়ে তোলা।</p>
                        <ul className={styles.featureList}>
                            <li>সামাজিক ও সাংস্কৃতিক কর্মকাণ্ড পরিচালনা</li>
                            <li>যুব সম্প্রদায়ের দক্ষতা উন্নয়ন</li>
                            <li>সদস্যদের পারস্পরিক সহযোগিতা নিশ্চিতকরণ</li>
                            <li>বার্ষিক সামাজিক অনুষ্ঠান আয়োজন</li>
                            <li>পরিবার ও সমাজের উন্নয়নে প্রতিশ্রুতিবদ্ধ</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
