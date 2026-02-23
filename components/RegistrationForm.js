"use client";
import { useState } from 'react';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [num12Plus, setNum12Plus] = useState(0);
    const [totalAmount, setTotalAmount] = useState(1000);

    const handleNumChange = (e) => {
        const val = parseInt(e.target.value) || 0;
        setNum12Plus(val);
        setTotalAmount(1000 + (val * 500));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData(e.target);
        const data = {
            member_name: formData.get('member_name'),
            family_members_12_plus: parseInt(formData.get('family_members_12_plus')),
            family_members_under_12: parseInt(formData.get('family_members_under_12')) || 0,
            mobile_number: formData.get('mobile_number'),
            payment_method: formData.get('payment'),
            total_amount: totalAmount,
            transaction_mobile: formData.get('transaction_mobile'),
            transaction_id: formData.get('transaction_id')
        };

        // Simple validation
        if (data.mobile_number.length < 11 || data.transaction_mobile.length < 11) {
            setMessage({ type: 'error', text: 'সঠিক মোবাইল নাম্বার প্রদান করুন (১১ ডিজিট)' });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'আপনার নিবন্ধন সফলভাবে সম্পন্ন হয়েছে!' });
                e.target.reset();
                setNum12Plus(0);
                setTotalAmount(1000);
            } else {
                setMessage({ type: 'error', text: 'ত্রুটি: ' + (result.error || 'নিবন্ধন ব্যর্থ হয়েছে') });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={`${styles.regSection} reveal`} id="register">
            <div className={styles.container}>
                <span className={styles.tag}>নিবন্ধন ফর্ম</span>
                <h2 className={styles.title}>এখনই নিবন্ধন করুন</h2>
                <p className={styles.desc}>নিচের ফর্মটি পূরণ করে আপনার আসন নিশ্চিত করুন। সকল তারকা (*) চিহ্নিত ঘর পূরণ করা আবশ্যক।</p>

                <div className={styles.regContainer}>
                    <div className={styles.regHeader}>
                        <h3>অনুষ্ঠান নিবন্ধন ফর্ম</h3>
                        <p>নিয়ামতপুর যুব সমবায় সমিতি লিঃ | ২০২৬</p>
                    </div>
                    <div className={styles.formBody}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>সমিতির সদস্যের নাম *</label>
                                <input type="text" name="member_name" placeholder="আপনার পুরো নাম লিখুন" required />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>পরিবারের সদস্য সংখ্যা (১২+ বছর) *</label>
                                    <input
                                        type="number"
                                        name="family_members_12_plus"
                                        placeholder="সংখ্যা লিখুন"
                                        min="0"
                                        value={num12Plus}
                                        onChange={handleNumChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>১২ বছরের নিচে পরিবার সদস্য সংখ্যা </label>
                                    <input type="number" name="family_members_under_12" placeholder="সংখ্যা লিখুন" min="0" />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>রেজিস্ট্রেশন কারির মোবাইল নাম্বার *</label>
                                <input type="tel" name="mobile_number" placeholder="01XXXXXXXXX" required />
                            </div>

                            <div className={styles.paymentSectionForm}>
                                <h4>নিবন্ধন ফি প্রদান করুন *</h4>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="payment" value="bkash" required />
                                        বিকাশ (01743467764)
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="payment" value="nagad" />
                                        নগদ (01632269384)
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="payment" value="cash" />
                                        সরাসরি নগদ (শান্ত)
                                    </label>
                                </div>
                            </div>

                            <div className={styles.transactionSection}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>নিবন্ধন ফির মোট পরিমাণ (স্বয়ংক্রিয়)</label>
                                        <input type="number" name="total_amount" value={totalAmount} readOnly className={styles.readOnlyInput} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>ট্রানজেকশন মোবাইল নাম্বার *</label>
                                        <input type="tel" name="transaction_mobile" placeholder="01XXXXXXXXX" required />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>ট্রানজেকশন আইডি নাম্বার দিন *</label>
                                    <input type="text" name="transaction_id" placeholder="ট্রানজেকশন আইডি লিখুন" required />
                                </div>
                            </div>

                            {message.text && (
                                <div className={`${styles.feedback} ${styles[message.type]}`}>
                                    {message.text}
                                </div>
                            )}

                            <button type="submit" className={styles.btnSubmit} disabled={loading}>
                                {loading ? 'প্রক্রিয়াকরণ চলছে...' : '✅ নিবন্ধন সম্পন্ন করুন'}
                            </button>
                            <p className={styles.formNote}>আপনার তথ্য সম্পূর্ণ নিরাপদ। নিবন্ধন সফল হলে আপনার মোবাইলে নিশ্চিতকরণ পাঠানো হবে।</p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
