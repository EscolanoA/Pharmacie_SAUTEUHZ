function realtimeClock() {
    let rtClock = new Date();

    let date = rtClock.toLocaleDateString()
    let clock = rtClock.toLocaleTimeString()

    document.getElementById('dateActuelle').innerHTML = date + " " + clock

    setTimeout(realtimeClock, 500)
}