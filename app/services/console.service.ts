function checkCommand(command: string): string | undefined {
  const splittedCommand: string[] = command.split(' ')
  if (splittedCommand[0] === '') return undefined

  if (splittedCommand[0] !== 'git')
    return `Command ${splittedCommand[0]} isn't recognized yet`
  else {
    switch (splittedCommand[1]) {
      case 'status':
        return (
          `On branch master\n` +
          `Changes not staged for commit:\n` +
          `(use "git add <file>..." to update what will be committed)\n` +
          `(use "git restore <file>..." to discard changes in working directory)\n` +
          '    modified:   app/components/console/console.tsx'
        )
      default:
        return `git: '${splittedCommand[1]}' is not a git command. See 'git --help'`
    }
  }
}

const ConsoleService = { checkCommand }

export default ConsoleService
