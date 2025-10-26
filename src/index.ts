type Weather = 'summer' | 'rainy' | 'winter'


function changeBg(background: Weather): void {
    const el = document.querySelector('.bg')!
    el.classList.remove('winter', 'summer', 'rainy')
    el.classList.add(background)
}

function onClickWeather(weather: Weather, audio: HTMLAudioElement) {
    changeBg(weather)

    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
    }

    audio.paused ? audio.play() : audio.pause()
    currentAudio = audio
}

function setVolume() {
    if (currentAudio) {
        currentAudio.volume = Number(volume.value) / 100
    }
}

let currentAudio: HTMLAudioElement | null = null
const volume = document.getElementById('volume') as HTMLInputElement
volume?.addEventListener('input', setVolume)

document.querySelectorAll<HTMLButtonElement>('.weather-btn').forEach(button => {
    const weather = button.dataset.weather as Weather
    const audio = document.getElementById(`${weather}-sound`) as HTMLAudioElement
    button.addEventListener('click', () => onClickWeather(weather, audio))
})

