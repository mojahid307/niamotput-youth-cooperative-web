"use client";
import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: '--',
        hours: '--',
        minutes: '--',
        seconds: '--'
    });

    useEffect(() => {
        const deadline = new Date('2026-05-05T23:59:00').getTime();

        const timer = setInterval(() => {
            const now = Date.now();
            const diff = deadline - now;

            if (diff <= 0) {
                setTimeLeft({ days: '০', hours: '০', minutes: '০', seconds: '০' });
                clearInterval(timer);
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            // Simple Bengali number conversion
            const toBengali = (num) => {
                const bengaliNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
                return num.toString().split('').map(digit => bengaliNums[digit] || digit).join('');
            };

            setTimeLeft({
                days: toBengali(d),
                hours: toBengali(h),
                minutes: toBengali(m),
                seconds: toBengali(s)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.countdownSection}>
            <div className={styles.label}>নিবন্ধনের শেষ সময় পর্যন্ত বাকি</div>
            <div className={styles.grid}>
                <div className={styles.box}>
                    <div className={styles.num}>{timeLeft.days}</div>
                    <div className={styles.unit}>দিন</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.num}>{timeLeft.hours}</div>
                    <div className={styles.unit}>ঘন্টা</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.num}>{timeLeft.minutes}</div>
                    <div className={styles.unit}>মিনিট</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.num}>{timeLeft.seconds}</div>
                    <div className={styles.unit}>সেকেন্ড</div>
                </div>
            </div>
        </div>
    );
}
