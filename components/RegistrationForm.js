"use client";
import { useState } from 'react';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            member_name: formData.get('member_name'),
            family_members_12_plus: parseInt(formData.get('family_members_12_plus')),
            family_members_under_12: parseInt(formData.get('family_members_under_12')),
            mobile_number: formData.get('mobile_number'),
            payment_method: formData.get('payment'),
            total_amount: parseInt(formData.get('total_amount')),
            transaction_mobile: formData.get('transaction_mobile'),
            transaction_id: formData.get('transaction_id')
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('আপনার নিবন্ধন সফলভাবে সম্পন্ন হয়েছে!');
                e.target.reset();
            } else {
                alert('ত্রুটি: ' + (result.error || 'নিবন্ধন ব্যর্থ হয়েছে'));
            }
        } catch (err) {
            alert('নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।');
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
                                    <input type="number" name="family_members_12_plus" placeholder="সংখ্যা লিখুন" min="0" required />
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

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>নিবন্ধন ফির মোট পরিমাণ *</label>
                                    <input type="number" name="total_amount" placeholder="মোট টাকা" required />
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
