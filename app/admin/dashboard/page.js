"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('all');
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
            setFilteredRegistrations(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        let result = registrations;

        if (searchTerm) {
            result = result.filter(reg =>
                reg.member_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reg.mobile_number.includes(searchTerm)
            );
        }

        if (paymentFilter !== 'all') {
            result = result.filter(reg => reg.payment_method === paymentFilter);
        }

        setFilteredRegistrations(result);
    }, [searchTerm, paymentFilter, registrations]);

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
                        <div className={styles.actions}>
                            <input
                                type="text"
                                placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select
                                className={styles.filterSelect}
                                value={paymentFilter}
                                onChange={(e) => setPaymentFilter(e.target.value)}
                            >
                                <option value="all">সব পেমেন্ট</option>
                                <option value="bkash">বিকাশ</option>
                                <option value="nagad">নগদ</option>
                                <option value="cash">সরাসরি (শান্ত)</option>
                            </select>
                            <button onClick={fetchRegistrations} className={styles.btnRefresh}>রিফ্রেশ</button>
                        </div>
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
                                        <th>ট্রানজেকশন মোবাইল</th>
                                        <th>ট্রানজেকশন আইডি</th>
                                        <th>তারিখ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRegistrations.map((reg) => (
                                        <tr key={reg.id}>
                                            <td>{reg.member_name}</td>
                                            <td>{reg.mobile_number}</td>
                                            <td>{reg.family_members_12_plus}</td>
                                            <td>{reg.family_members_under_12}</td>
                                            <td>{reg.payment_method}</td>
                                            <td>৳ {reg.total_amount}</td>
                                            <td>{reg.transaction_mobile}</td>
                                            <td><code>{reg.transaction_id}</code></td>
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
