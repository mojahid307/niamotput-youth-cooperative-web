import styles from './Contact.module.css';

export default function Contact() {
    const contacts = [
        { role: 'যোগাযোগ', name: 'মোঃ জুয়েল কবির', phone: '01771677064' },
        { role: 'যোগাযোগ', name: 'মোঃ জিসান মন্ডল', phone: '01779971388' },
        { role: 'যোগাযোগ', name: 'শান্ত', phone: '01743467764' },
        { role: 'যোগাযোগ', name: 'সাকিব', phone: '01569101401' },
    ];

    return (
        <section className={`${styles.contactSection} reveal`} id="contact">
            <div className={styles.container}>
                <span className={styles.tag}>যোগাযোগ করুন</span>
                <h2 className={styles.title}>আমাদের সাথে যোগাযোগ করুন</h2>
                <p className={styles.desc}>যেকোনো তথ্য বা সহযোগিতার জন্য নিচের নম্বরে যোগাযোগ করুন।</p>

                <div className={styles.grid}>
                    {contacts.map((contact, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.role}>{contact.role}</div>
                            <div className={styles.name}>{contact.name}</div>
                            <div className={styles.phone}>📞 {contact.phone}</div>
                        </div>
                    ))}
                </div>

                <div className={styles.emailBlock}>
                    Developed by Mojahid. Contact: <a href="mailto:business.risad@gmail.com">business.risad@gmail.com</a>
                </div>
            </div>
        </section>
    );
}
