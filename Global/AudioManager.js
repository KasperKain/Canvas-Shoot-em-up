export default class AudioManager {
  static soundClips = [
    { name: "hit", src: "Assets/Audio/hit.wav" },
    { name: "start", src: "Assets/Audio/start.wav" },
    { name: "shoot", src: "Assets/Audio/shoot.wav" },
    { name: "destroy", src: "Assets/Audio/destroy.wav" },
  ];
  static musicClips = [
    { name: "game", src: "Assets/Audio/game.mp3", isPlaying: false },
  ];

  static playOneShotSound(name) {
    for (let i = 0; i < this.soundClips.length; i++) {
      if (name === this.soundClips[i].name) {
        let newClip = new Audio(this.soundClips[i].src);
        newClip.play();
        break;
      }
    }
  }
  static playSong(name) {
    for (let i = 0; i < this.musicClips.length; i++) {
      if (name === this.musicClips[i].name && !this.soundClips[i].isPlaying) {
        let newClip = new Audio(this.musicClips[i].src);
        newClip.play();
        newClip.loop = true;
        this.musicClips[i].isPlaying = true;
        break;
      }
    }
  }
}
