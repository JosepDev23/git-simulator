'use client'
import React, { KeyboardEvent, useContext, useRef, useState } from 'react'
import styles from './console.module.css'
import ConsoleService from '@/app/services/console.service'
import { GitSimulationContext } from '@/app/hooks/GitSimulationContext'

export default function Console() {
  const [consoleValue, setConsoleValue] = useState<string>('')
  const [consoleLines, setConsoleLines] = useState<
    { command: string; output?: string }[]
  >([])
  const [lineCounter, setLineCounter] = useState(0)
  const gitSimulationContext = useContext(GitSimulationContext)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleConsoleValueChange(change: string) {
    setConsoleValue(change)
    setLineCounter(consoleLines.length + 1)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      const output = ConsoleService.checkCommand(
        consoleValue,
        gitSimulationContext!
      )
      setConsoleLines((prev) => prev.concat({ command: consoleValue, output }))
      setConsoleValue('')
      setLineCounter(consoleLines.length + 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (lineCounter !== 0) {
        setConsoleValue(consoleLines[lineCounter - 1].command)
        setLineCounter((prev) => prev - 1)
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (lineCounter !== consoleLines.length) {
        setConsoleValue(
          consoleLines[lineCounter + 1]
            ? consoleLines[lineCounter + 1].command
            : ''
        )
        setLineCounter((prev) => prev + 1)
      }
    }
  }

  function handleWrapperClick() {
    inputRef.current?.focus()
  }

  return (
    <div className={styles.console_wrapper} onClick={handleWrapperClick}>
      <div className={styles.console_lines}>
        {consoleLines.map((consoleLine, i) => (
          <div key={`console-line-${i}`}>
            <label key={consoleLine.command + i} className={styles.line}>
              $ {consoleLine.command}
            </label>
            {consoleLine.output && (
              <pre key={consoleLine.output + i}>{consoleLine.output}</pre>
            )}
          </div>
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
