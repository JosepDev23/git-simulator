'use client'
import React, { useContext } from 'react'
import styles from './drawing.module.css'
import { GitSimulationContext } from '@/app/hooks/GitSimulationContext'

export default function Drawing() {
  const gitSimulationContext = useContext(GitSimulationContext)

  return (
    <div className={styles.background}>
      <div className={styles.stage}>
        <h2>Working directory</h2>
        {gitSimulationContext?.workingDirectory.map((line) => (
          <p>{line} (edited)</p>
        ))}
      </div>
      <div className={styles.stage}>
        <h2>Staging area</h2>
        {gitSimulationContext?.stagingArea.map((line) => (
          <p>{line}</p>
        ))}
      </div>
      <div className={styles.stage}>
        <h2>Repository</h2>
        {gitSimulationContext?.repository.map((commit) => (
          <p>{commit.name}</p>
        ))}
      </div>
      <div className={styles.stage}>
        <h2>Remote</h2>
        {gitSimulationContext?.remote.map((commit) => (
          <p>{commit.name}</p>
        ))}
      </div>
    </div>
  )
}
