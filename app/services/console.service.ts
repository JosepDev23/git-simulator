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
      case 'editfile':
        if (!splittedCommand[2]) return 'Usage: git editfile <filename>'
        context.makeChanges(splittedCommand[2])
        return `File ${splittedCommand[2]} edited successfully!`
      case 'status':
        return (
          `On branch master\n` +
          `Changes not staged for commit:\n` +
          `(use "git add <file>..." to update what will be committed)\n` +
          `(use "git restore <file>..." to discard changes in working directory)\n` +
          context.workingDirectory
            .map((file) => `    modified:   ${file}`)
            .join('\n')
        )
      default:
        return `git: '${splittedCommand[1]}' is not a git command. See 'git --help'`
    }
  }
}

const ConsoleService = { checkCommand }

export default ConsoleService
