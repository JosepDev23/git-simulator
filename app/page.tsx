import Console from './components/console/console'
import Drawing from './components/drawing/drawing'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Console />
      <Drawing />
    </main>
  )
}
