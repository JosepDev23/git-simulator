import React from 'react'
import styles from './commit-card.module.css'
import Commit from '../models/commit'

interface CommitCardProps {
  commit: Commit
}

export default function CommitCard(props: CommitCardProps) {
  const { commit } = props
  return (
    <div className={styles.card_wrapper}>
      <h3 className={styles.card_title}>{commit.name}</h3>
      <h5>ID: {commit.id}</h5>
      <h4>Changes:</h4>
      {commit.changes.map((change) => (
        <h5>-{change}</h5>
      ))}
    </div>
  )
}
