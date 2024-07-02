'use client'
import { create } from 'zustand'
import Commit from '../components/models/commit'

export type GitStore = {
  workingDirectory: string[]
  stagingArea: string[]
  repository: Commit[]
  remote: Commit[]
  makeChanges: (file: string) => void
  moveFromWorkingDirectoryToStagingArea: (file: string) => void
  moveAllFromWorkingDirectoryToStagingArea: () => void
  commitChanges: (commitName: string, commitId: string) => void
  push: () => void
}

const useGitStore = create<GitStore>()((set) => ({
  workingDirectory: [],
  stagingArea: [],
  repository: [],
  remote: [],
  makeChanges: (file) =>
    set((state) => {
      const findedFile: string | undefined = state.workingDirectory.find(
        (f) => f === file
      )
      if (!findedFile)
        return { workingDirectory: [...state.workingDirectory, file] }
      return state
    }),
  moveFromWorkingDirectoryToStagingArea: (file) =>
    set((state) => {
      const fileIndex: number = state.workingDirectory.findIndex(
        (f) => f === file
      )
      if (fileIndex === -1) {
        throw new Error(`File ${file} does not extist!`)
      }
      const updatedWorkingDirectory = [...state.workingDirectory]
      const fileToMove = updatedWorkingDirectory.splice(fileIndex, 1)[0]
      return {
        workingDirectory: updatedWorkingDirectory,
        stagingArea: [...state.stagingArea, fileToMove],
      }
    }),
  moveAllFromWorkingDirectoryToStagingArea: () =>
    set((state) => ({
      stagingArea: [...state.stagingArea, ...state.workingDirectory],
      workingDirectory: [],
    })),
  commitChanges: (commitName: string, commitId: string) =>
    set((state) => {
      if (state.stagingArea.length === 0)
        throw new Error(
          'On branch master\nnothing to commit, working tree clean'
        )
      const newCommit: Commit = {
        id: commitId,
        name: commitName,
        changes: state.stagingArea,
      }
      return {
        repository: [...state.repository, newCommit],
        stagingArea: [],
      }
    }),
  push: () =>
    set((state) => ({
      remote: [...state.repository, ...state.remote],
      repository: [],
    })),
}))

export default useGitStore
