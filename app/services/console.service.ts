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
        if (context.workingDirectory.length > 0)
          return (
            `On branch master\n` +
            `Changes not staged for commit:\n` +
            `(use "git add <file>..." to update what will be committed)\n` +
            `(use "git restore <file>..." to discard changes in working directory)\n` +
            context.workingDirectory
              .map((file) => `    modified:   ${file}`)
              .join('\n')
          )
        else return 'Nothing to commit, working tree clean'
      case 'add':
        if (!splittedCommand[2])
          return 'Usage: git add <filename> or git add --all'
        else if (splittedCommand[2] === '--all') {
          context.workingDirectory.forEach((file) => {
            context.moveFromWorkingDirectoryToStagingArea(file)
          })
        }
      default:
        return `git: '${splittedCommand[1]}' is not a git command. See 'git --help'`
    }
  }
}

const ConsoleService = { checkCommand }

export default ConsoleService
