class MediaPlayer {
    constructor(config) {
        this.media = config.el
        this.plugins = config.plugins || []

        this._initPlugins()
    }

    _initPlugins() {
        const player = {
            play: () => this.play(),
            pause: () => this.pause(),
            media: this.media,
            get muted() {
                /* En este bloque "this" hace referencia al objeto player (aquí no existe la key "media"),
                por lo que debemos asignarla al objeto fuera del get y set */
                return this.media.muted
            },
            set muted(value) {
                this.media.muted = value
            },
        }

        this.plugins.forEach(plugin => {
            plugin.run(player)
        })
    }

    play() {
        this.media.play()
    }

    pause() {
        this.media.pause()
    }

    togglePlay() {
        (this.media.paused)
            ? this.play()
            : this.pause()
    }

    mute() {
        this.media.muted = true
    }

    unmute() {
        this.media.muted = false
    }

    toggleMute() {
        (this.media.muted)
            ? this.unmute()
            : this.mute()
    }
}

export default MediaPlayer