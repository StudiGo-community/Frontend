export const clearAuthClientState = () => {
  localStorage.removeItem('studigo_access_token')

  sessionStorage.clear()

  // TODO: API 연동 시 토큰 키 이름이 바뀌면 수정
  // TODO: refresh token을 localStorage에 저장하게 되면 여기서 같이 삭제
}
