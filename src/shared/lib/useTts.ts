function useTts() {
  const speak = (text: string, language: 'korean' | 'spanish') => {
    const speechSynthesis = window.speechSynthesis
    speechSynthesis.cancel()

    if (!text) return

    const isKorean = language === 'korean'
    const voice = speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.startsWith(isKorean ? 'ko' : 'es'))

    const utterance = new SpeechSynthesisUtterance(text)
    if (voice) {
      utterance.voice = voice
    }
    utterance.lang = isKorean ? 'ko-KR' : 'es-ES'
    utterance.rate = isKorean ? 1.3 : 1.0
    utterance.pitch = isKorean ? 0.8 : 1.0

    speechSynthesis.speak(utterance)
  }

  return { speak }
}

export default useTts
