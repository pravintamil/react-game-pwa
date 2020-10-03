import { Howl } from 'howler'

const gameEnd = new Howl({
  src: ['/sounds/finish.mp3', '/sounds/finish.ogg'],
  volume: 0.5
})

const correct = new Howl({
  src: ['/sounds/correct.mp3', '/sounds/correct.ogg'],
  volume: 0.5
})

const wrong = new Howl({
  src: ['/sounds/gameover.mp3', '/sounds/gameover.ogg'],
  rate: 1.3,
  volume: 0.5
})

const playSound = (type) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case 'game-end':
      gameEnd.play()
      break
    case 'correct':
      correct.play()
      break
    case 'wrong':
      wrong.play()
      break
  }
}
export default playSound;
