import { GitSimulationContextType } from '../hooks/GitSimulationContext'

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
          'add                   Add file contents to the index\n'
        )

      case 'editfile':
        if (!splittedCommand[2]) return 'Usage: git editfile <filename>'
        context.makeChanges(splittedCommand[2])
        return `File ${splittedCommand[2]} edited successfully!`

      case 'status':
        let statusResponse = `On branch master\n`
        if (
          context.stagingArea.length === 0 &&
          context.workingDirectory.length === 0
        ) {
          statusResponse += 'Nothing to commit, working tree clean'
          return statusResponse
        }
        if (context.stagingArea.length > 0) {
          statusResponse +=
            'Changes to be committed:\n' +
            '  (use "git restore --staged <file>..." to unstage)' +
            context.stagingArea.map((file) => `    modified: ${file}`)
        }
        if (context.workingDirectory.length > 0) {
          statusResponse +=
            `Changes not staged for commit:\n` +
            `  (use "git add <file>..." to update what will be committed)\n` +
            `  (use "git restore <file>..." to discard changes in working directory)\n` +
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
          return 'Usage: git commit -m <commit-name>'
        else if (!splittedCommand[3])
          return 'Usage: git commit -m <commit-name>'
        else {
        }
      default:
        return `git: '${splittedCommand[1]}' is not a git command. See 'git --help'`
    }
  }
}

const ConsoleService = { checkCommand }

export default ConsoleService
