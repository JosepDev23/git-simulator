import Console from './components/console/console'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Console />
      <div className={styles.drawing}></div>
    </main>
  )
}
