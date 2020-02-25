import MediaPlayer from "../MediaPlayer";

class AutoPause {
    threshold: number;
    player: MediaPlayer

    constructor() {
        this.threshold = 0.25
        this.handlerIntersection = this.handlerIntersection.bind(this)
        this.handlerVisibilityChange = this.handlerVisibilityChange.bind(this)
    }
    
    run(player) {
        this.player = player

        const observer = new IntersectionObserver(this.handlerIntersection, {
            threshold: this.threshold,
        })

        observer.observe(player.media)

        document.addEventListener("visibilitychange", this.handlerVisibilityChange)
    }

    private handlerIntersection(entries: IntersectionObserverEntry[]) {
        const entry = entries[0]

        const isVisible = entry.intersectionRatio >= this.threshold

        if (isVisible) {
            // Este método está siendo llamado por la clase IntersectionObserver, por lo que el "this" apunta hacia ella.
            // Para evitar esto, le asignamos al método el mismo pero con bind a la clase AutoPause.
            this.player.play()
        } else {
            this.player.pause()
        }
    }

    private handlerVisibilityChange() {
        const isVisible = document.visibilityState === "visible"

        if (isVisible) {
            this.player.play()
        } else {
            this.player.pause()
        }
    }
}

export default AutoPause