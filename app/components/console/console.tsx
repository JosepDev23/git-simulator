'use client'
import React, { KeyboardEvent, useRef, useState } from 'react'
import styles from './console.module.css'
import ConsoleService from '@/app/services/console.service'

export default function Console() {
  const [consoleValue, setConsoleValue] = useState<string>('')
  const [consoleLines, setConsoleLines] = useState<
    { command: string; output?: string }[]
  >([])
  const inputRef = useRef<HTMLInputElement>(null)

  function handleConsoleValueChange(change: string) {
    setConsoleValue(change)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      const output = ConsoleService.checkCommand(consoleValue)
      setConsoleLines((prev) => prev.concat({ command: consoleValue, output }))
      setConsoleValue('')
    }
  }

  function handleWrapperClick() {
    inputRef.current?.focus()
  }

  return (
    <div className={styles.console_wrapper} onClick={handleWrapperClick}>
      <div className={styles.console_lines}>
        {consoleLines.map((consoleLine, i) => (
          <>
            <label key={consoleLine.command + i} className={styles.line}>
              $ {consoleLine.command}
            </label>
            {consoleLine.output && (
              <label key={consoleLine.output + i}>{consoleLine.output}</label>
            )}
          </>
        ))}
      </div>
      <div className={styles.input_wrapper}>
        <label>$ </label>
        <input
          type="text"
          className={styles.console_input}
          value={consoleValue}
          onChange={(event) => handleConsoleValueChange(event.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </div>
    </div>
  )
}
