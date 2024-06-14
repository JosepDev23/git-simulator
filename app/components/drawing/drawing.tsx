'use client'
import React, { useContext } from 'react'
import styles from './drawing.module.css'
import { GitSimulationContext } from '@/app/hooks/GitSimulationContext'
import CommitCard from '../commit-card/commit-card'

export default function Drawing() {
  const gitSimulationContext = useContext(GitSimulationContext)

  return (
    <div className={styles.background}>
      <div className={`${styles.stage} ${styles.border_red}`}>
        <h2>Working directory</h2>
        {gitSimulationContext?.workingDirectory.map((line) => (
          <p>{line} (edited)</p>
        ))}
      </div>
      <div className={`${styles.stage} ${styles.border_yellow}`}>
        <h2>Staging area</h2>
        {gitSimulationContext?.stagingArea.map((line) => (
          <p>{line}</p>
        ))}
      </div>
      <div className={`${styles.stage} ${styles.border_green}`}>
        <h2>Repository</h2>
        {gitSimulationContext?.repository.map((commit) => (
          <div className={styles.card_container}>
            <CommitCard commit={commit} />
          </div>
        ))}
      </div>
      <div className={`${styles.stage} ${styles.border_blue}`}>
        <h2>Remote</h2>
        {gitSimulationContext?.remote.map((commit) => (
          <div className={styles.card_container}>
            <CommitCard commit={commit} />
          </div>
        ))}
      </div>
    </div>
  )
}
