setInterval(() => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let milliseconds = time.getMilliseconds();
    let hourRotation = (hours % 12 + minutes / 60) * 30;
    let minuteRotation = minutes * 6 + seconds*0.1+ (milliseconds) *0.0001;
    let secondRotation = seconds * 6 + milliseconds * 0.006; 
    document.querySelector(".hour-box").style.transform = "rotate(" + hourRotation + "deg)";
    document.querySelector(".minute-box").style.transform = "rotate(" + minuteRotation + "deg)";
    document.querySelector(".second-box").style.transform = "rotate(" + secondRotation + "deg)";
}, 0.1);
