let time = document.getElementById('time');
function tick() {
    time.innerHTML = new Date().toLocaleString()
}

tick();
setInterval(() => tick(), 8 * 1000);