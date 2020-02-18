import MediaPlayer from "./MediaPlayer.js"
import AutoPlay from "./plugins/AutoPlay.js"

const video = document.querySelector("video")
const btnPlayPause = document.querySelector("#btnPlayPause")
const btnMuteUnmute = document.querySelector("#btnMuteUnmute")

const player = new MediaPlayer({el: video, plugins: [
    new AutoPlay()
]})

btnPlayPause.onclick = () => player.togglePlay()
btnMuteUnmute.onclick = () => player.toggleMute()
