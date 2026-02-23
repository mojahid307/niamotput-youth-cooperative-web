"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin/login');
            } else {
                setUser(user);
                fetchRegistrations();
            }
        };
        checkUser();
    }, []);

    const fetchRegistrations = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching registrations:', error);
        } else {
            setRegistrations(data);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    const totalFees = registrations.reduce((sum, reg) => sum + (reg.total_amount || 0), 0);
    const totalMembers = registrations.length;

    if (!user) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>নিয়ামতপুর যুব সমবায় সমিতি লিঃ - অ্যাডমিন</div>
                <div className={styles.userSection}>
                    <span className={styles.userEmail}>{user.email}</span>
                    <button onClick={handleLogout} className={styles.btnLogout}>লগআউট</button>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>মোট নিবন্ধন</div>
                        <div className={styles.statValue}>{totalMembers} জন</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>মোট সংগৃহীত ফি</div>
                        <div className={styles.statValue}>৳ {totalFees.toLocaleString()}</div>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2>নিবন্ধিত সদস্যদের তালিকা</h2>
                        <button onClick={fetchRegistrations} className={styles.btnRefresh}>রিফ্রেশ</button>
                    </div>

                    {loading ? (
                        <div className={styles.loading}>অপেক্ষা করুন...</div>
                    ) : registrations.length === 0 ? (
                        <div className={styles.empty}>কোন নিবন্ধন পাওয়া যায়নি।</div>
                    ) : (
                        <div className={styles.scrollable}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>সদস্যের নাম</th>
                                        <th>মোবাইল</th>
                                        <th>পরিবার (১২+)</th>
                                        <th>পরিবার (-১২)</th>
                                        <th>পেমেন্ট</th>
                                        <th>পরিমাণ</th>
                                        <th>তারিখ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map((reg) => (
                                        <tr key={reg.id}>
                                            <td>{reg.member_name}</td>
                                            <td>{reg.mobile_number}</td>
                                            <td>{reg.family_members_12_plus}</td>
                                            <td>{reg.family_members_under_12}</td>
                                            <td>{reg.payment_method}</td>
                                            <td>৳ {reg.total_amount}</td>
                                            <td>{new Date(reg.created_at).toLocaleDateString('bn-BD')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
