export function validateNickname(nickname: string): {
  isLengthOk: boolean
  isCharacterOk: boolean
} {
  const isLengthOk = nickname.length >= 2 && nickname.length <= 12
  const isCharacterOk = /^[A-Za-z0-9가-힣]+$/.test(nickname)
  return { isLengthOk, isCharacterOk }
}

export function validateNewPassword(newPassword: string): {
  isMinimumLengthOk: boolean
  isCombinationOk: boolean
} {
  const isMinimumLengthOk = newPassword.length >= 8
  const hasLetter = /[A-Za-z]/.test(newPassword)
  const hasNumber = /\d/.test(newPassword)
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(newPassword)
  const isCombinationOk = hasLetter && hasNumber && hasSpecialCharacter
  return { isMinimumLengthOk, isCombinationOk }
}
