'use client'
import React from 'react'
import styles from './drawing.module.css'
import CommitCard from '../commit-card/commit-card'
import useGitStore from '@/app/hooks/git-store'

export default function Drawing() {
  const store = useGitStore()

  return (
    <div className={styles.background}>
      <div className={`${styles.stage} ${styles.border_red}`}>
        <h2>Working directory</h2>
        {store.workingDirectory.map((line) => (
          <p>{line} (edited)</p>
        ))}
      </div>
      <div className={`${styles.stage} ${styles.border_yellow}`}>
        <h2>Staging area</h2>
        {store.stagingArea.map((line) => (
          <p>{line}</p>
        ))}
      </div>
      <div className={`${styles.stage} ${styles.border_green}`}>
        <h2>Repository</h2>
        {store.repository.map((commit) => (
          <div className={styles.card_container}>
            <CommitCard commit={commit} />
          </div>
        ))}
      </div>
      <div className={`${styles.stage} ${styles.border_blue}`}>
        <h2>Remote</h2>
        {store.remote.map((commit) => (
          <div className={styles.card_container}>
            <CommitCard commit={commit} />
          </div>
        ))}
      </div>
    </div>
  )
}
