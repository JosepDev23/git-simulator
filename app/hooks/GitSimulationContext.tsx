'use client'
import React, { ReactNode, createContext, useState } from 'react'
import Commit from '../components/models/commit'

export interface GitSimulationContextType {
  workingDirectory: string[]
  stagingArea: string[]
  repository: Commit[]
  remote: Commit[]
  makeChanges: (file: string) => void
  moveFromWorkingDirectoryToStagingArea: (file: string) => void
  moveAllFromWorkingDirectoryToStagingArea: () => void
}

export const GitSimulationContext = createContext<
  GitSimulationContextType | undefined
>(undefined)

export const GitSimulationProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [workingDirectory, setWorkingDirectory] = useState<string[]>([])
  const [stagingArea, setStagingArea] = useState<string[]>([])
  const [repository, setRepository] = useState<Commit[]>([])
  const [remote, setRemote] = useState<Commit[]>([])

  function makeChanges(file: string) {
    const findedFile: string | undefined = workingDirectory.find(
      (f) => f === file
    )
    if (!findedFile) setWorkingDirectory((prev) => prev.concat(file))
  }

  function moveFromWorkingDirectoryToStagingArea(file: string) {
    const fileIndex: number = workingDirectory.findIndex((f) => f === file)
    if (!fileIndex) throw new Error(`File ${file} does not extist!`)
    else {
      let f: string
      setWorkingDirectory((prev) => {
        f = prev.splice(fileIndex, 1)[0]
        return prev
      })
      setStagingArea((prev) => prev.concat(f))
    }
  }

  function moveAllFromWorkingDirectoryToStagingArea() {
    setStagingArea((prev) => {
      const filesToAdd = workingDirectory.filter((file) => !prev.includes(file))
      return prev.concat(filesToAdd)
    })
    setWorkingDirectory([])
  }

  function commitChanges(commitName: string) {
    if (stagingArea.length === 0)
      throw new Error('On branch master\nnothing to commit, working tree clean')
    setRepository((prev) =>
      prev.concat({ name: commitName, changes: stagingArea })
    )
    setStagingArea([])
  }

  return (
    <GitSimulationContext.Provider
      value={{
        workingDirectory,
        stagingArea,
        repository,
        remote,
        makeChanges,
        moveFromWorkingDirectoryToStagingArea,
        moveAllFromWorkingDirectoryToStagingArea,
      }}
    >
      {children}
    </GitSimulationContext.Provider>
  )
}
