import { GitSimulationContextType } from '../hooks/GitSimulationContext'
import generateCommitId from './generate-commit-id.service'

function checkCommand(
  command: string,
  context: GitSimulationContextType
): string | undefined {
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
          'add                   Add file contents to the index\n' +
          'commit -m "<name>"    Record changes to the repository\n'
        )

      case 'editfile':
        if (!splittedCommand[2]) return 'Usage: git editfile <filename>'
        context.makeChanges(splittedCommand[2])
        return `File ${splittedCommand[2]} edited successfully!`

      case 'status':
        let statusResponse = `On branch master\n`
        if (context.repository.length) {
          statusResponse +=
            `Your branch is ahead of 'origin/master' by ${context.repository.length} commit.\n` +
            `  (use "git push" to publish your local commits)\n`
        }
        if (!context.stagingArea.length && !context.workingDirectory.length) {
          statusResponse += 'Nothing to commit, working tree clean'
          return statusResponse
        }
        if (context.stagingArea.length) {
          statusResponse +=
            'Changes to be committed:\n' +
            // '  (use "git restore --staged <file>..." to unstage)\n' +
            context.stagingArea
              .map((file) => `    modified: ${file}`)
              .join('\n')
        }
        if (context.workingDirectory.length) {
          statusResponse +=
            `Changes not staged for commit:\n` +
            `  (use "git add <file>..." to update what will be committed)\n` +
            // `  (use "git restore <file>..." to discard changes in working directory)\n` +
            context.workingDirectory
              .map((file) => `    modified: ${file}`)
              .join('\n')
        }
        return statusResponse

      case 'add':
        if (!splittedCommand[2])
          return 'Usage: git add <filename> or git add --all'
        else if (splittedCommand[2] === '--all') {
          context.moveAllFromWorkingDirectoryToStagingArea()
          return
        } else {
          try {
            context.moveFromWorkingDirectoryToStagingArea(splittedCommand[2])
            return
          } catch (error: any) {
            return error.cause as string
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
          context.commitChanges(commitName, commitId)
          return (
            `[master ${commitId}]\n` +
            `${context.stagingArea.length} files changed, x insertions(+)`
          )
        }
      case 'push':
        const objects = context.repository.length
        if (objects === 0) return 'Everything up-to-date'
        context.push()
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
