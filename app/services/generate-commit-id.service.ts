export default function generateCommitId(): string {
  const MAX = 4026531840
  return Math.round(Math.random() * MAX).toString(16)
}
