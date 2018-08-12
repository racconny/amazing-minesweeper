function showPauseModal(){
    $(".pauseModal").fadeIn(200);
    clock.pause();
}

function closePauseModal(){
    $(".pauseModal").fadeOut(200);
    clock.start();
}