import Link from 'next/link'
import styles from '@/styles/pageStyles/Profile.module.css'


function ProfileDefault(props: any) {
    return (
        <div className={styles.profileContainer}>
            <h2>You don't seem to be logged in!</h2>
            <h3><Link href='api/auth/login' className={styles.login} prefetch={false} >Login</Link> to get started!</h3>
        </div>
    );
}

export default ProfileDefault;