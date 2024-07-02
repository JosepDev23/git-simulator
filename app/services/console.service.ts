import { GitStore } from '../hooks/git-store'
import generateCommitId from './generate-commit-id.service'

function checkCommand(command: string, store: GitStore): string | undefined {
  const splittedCommand: string[] = command.split(' ')
  if (splittedCommand[0] === '') return undefined

  if (splittedCommand[0] !== 'git')
    return `Command ${splittedCommand[0]} isn't recognized yet`
  else {
    switch (splittedCommand[1]) {
      case '--help':
        return (
          'editfile <filename>   Make changes to <filename>\n' +
          'status                Show the working tree status\n' +
          'add --all             Add all files contents to the index\n' +
          'add <filename>        Add file contents to the index\n' +
          'commit -m "<name>"    Record changes to the repository\n' +
          'push                  Update remote refs along with associated objects'
        )

      case 'editfile':
        if (!splittedCommand[2]) return 'Usage: git editfile <filename>'
        store.makeChanges(splittedCommand[2])
        return `File ${splittedCommand[2]} edited successfully!`

      case 'status':
        let statusResponse = `On branch master\n`
        if (store.repository.length) {
          statusResponse +=
            `Your branch is ahead of 'origin/master' by ${store.repository.length} commit.\n` +
            `  (use "git push" to publish your local commits)\n`
        }
        if (!store.stagingArea.length && !store.workingDirectory.length) {
          statusResponse += 'Nothing to commit, working tree clean'
          return statusResponse
        }
        if (store.stagingArea.length) {
          statusResponse +=
            'Changes to be committed:\n' +
            // '  (use "git restore --staged <file>..." to unstage)\n' +
            store.stagingArea
              .map((file) => `    modified: ${file}`)
              .join('\n')
              .concat('\n')
        }
        if (store.workingDirectory.length) {
          statusResponse +=
            `Changes not staged for commit:\n` +
            `  (use "git add <file>..." to update what will be committed)\n` +
            // `  (use "git restore <file>..." to discard changes in working directory)\n` +
            store.workingDirectory
              .map((file) => `    modified: ${file}`)
              .join('\n')
              .concat('\n')
        }
        return statusResponse

      case 'add':
        if (!splittedCommand[2])
          return 'Usage: git add <filename> or git add --all'
        else if (splittedCommand[2] === '--all') {
          store.moveAllFromWorkingDirectoryToStagingArea()
          return
        } else {
          try {
            if (splittedCommand[2])
              store.moveFromWorkingDirectoryToStagingArea(splittedCommand[2])
            return
          } catch (error: any) {
            return error.message as string
          }
        }

      case 'commit':
        if (splittedCommand[2] !== '-m')
          return 'Usage: git commit -m "<commit-name>"'
        else if (!splittedCommand[3])
          return 'Usage: git commit -m "<commit-name>"'
        else {
          const commitName: string = splittedCommand
            .slice(3)
            .join(' ')
            .split('"')[1]
          const commitId: string = generateCommitId()
          try {
            store.commitChanges(commitName, commitId)
            return (
              `[master ${commitId}]\n` +
              `${store.stagingArea.length} files changed, x insertions(+)`
            )
          } catch (error: any) {
            return error.message as string
          }
        }
      case 'push':
        const objects = store.repository.length
        if (objects === 0) return 'Everything up-to-date'
        store.push()
        return (
          `Counting objects: ${objects}, done.\n` +
          `Delta compression using up to 4 threads.\n` +
          `Compressing objects: 100% (${objects}/${objects}), done.\n` +
          `Writing objects: 100% (${objects}/${objects}), 400 bytes | 400.00 KiB/s, done.\n` +
          `Total ${objects} (delta 0), reused 0 (delta 0)\n` +
          `To https://github.com/user/repo.git\n` +
          `  master -> master`
        )

      default:
        return `git: '${splittedCommand[1]}' is not a git command. See 'git --help'`
    }
  }
}

const ConsoleService = { checkCommand }

export default ConsoleService
