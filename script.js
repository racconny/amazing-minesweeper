$("body").on("contextmenu", false);
$(function(){
    showModal();
})

var dimension;
var difficulty;
var arr;
var view_arr;
var mines;
var flags = 0;
var ticks = 0;
var isPaused = false;

function pause(){
    isPaused = !isPaused;
    if (isPaused){
        showPauseModal();
    }
    else {
        closePauseModal();
    }
}

function generateArray(d){
    var f = [];
    for (var i = 0; i < (d + 2); i++){
        f[i] = [];
        for (var j = 0; j < (d + 2); j++){
            f[i][j] = 0;
        }
    }
    console.log("Array created");
    return f;
}

function generateMines(d, a){
    var generated = 0;
    while (generated < a){
        var t1 = Math.floor((Math.random() * d) + 1);
        var t2 = Math.floor((Math.random() * d) + 1)
        if (arr[t1][t2] != "X"){
            arr[t1][t2] = "X";
            generated++;
            renderNumbers(t1, t2);
        }
    }
    //Math.floor((Math.random() * 10) + 1);
}

function syncArray(){
    var content;
        for (var i = 0; i < dimension; i++){
            for (var j = 0; j < dimension; j++){
                content = document.querySelector(".field").childNodes[i].childNodes[j].querySelector(".cell");
                    if (view_arr[i + 1][j + 1] === 1){
                        if (arr[i + 1][j + 1] === "X"){
                            content.innerHTML = "<i class='fas fa-flag'></i>";
                        }
                        else {
                            content.style.backgroundColor = "#ff4f4f";
                            content.style.color = "#fff2e2";
                            content.innerHTML = '<i class="fas fa-times"></i>';
                        }
                    }

                    else if (view_arr[i + 1][j + 1] === 0){
                        if (arr[i + 1][j + 1] === "X"){
                            content.style.backgroundColor = "#fff2e2";
                            content.innerHTML = "<i class='fas fa-skull'></i>";
                        }
                        else if (arr[i + 1][j + 1] === 0){
                            content.style.backgroundColor = "#fff2e2";
                            content.innerHTML = "";
                        }
                        else {
                            content.style.backgroundColor = "#fff2e2";
                            content.innerHTML = "<span style='color: " + designNumber(i + 1, j + 1) + "'>" + arr[i + 1][j + 1] + "</span>";
                        }
                    }
            }
        }
}

function designNumber(x, y){
    var dict = ["", "grey", "green", "blue", "red", "orange", "yellow", "purple", "black"];
    return dict[arr[x][y]]
}

function renderNumbers(x, y){
    if (arr[x - 1][y - 1] !== "X"){
        arr[x - 1][y - 1]++;
    }
    if (arr[x + 1][y + 1] !== "X"){
        arr[x + 1][y + 1]++;
    }
    if (arr[x + 1][y - 1] !== "X"){
        arr[x + 1][y - 1]++;
    }
    if (arr[x - 1][y + 1] !== "X"){
        arr[x - 1][y + 1]++;
    }
    if (arr[x][y + 1] !== "X"){
        arr[x][y + 1]++;
    }
    if (arr[x][y - 1] !== "X"){
        arr[x][y - 1]++;
    }
    if (arr[x + 1][y] !== "X"){
        arr[x + 1][y]++;
    }
    if (arr[x - 1][y] !== "X"){
        arr[x - 1][y]++;
    }
    //syncArray();
}

function renderField(d){
//rendering game field
//@d - field dimension

    var field = document.querySelector(".field");

    for (var i = 1; i <= d; i++){
        var row = document.createElement("tr");
        field.appendChild(row);

        for (var j = 1; j <= d; j++){
            //row is a parent
            var cell = document.createElement("td");
            var btn = document.createElement("button");
            btn.classList.add("cell");
            btn.setAttribute("onclick","makeMove(" + i + "," + j + ")");
            btn.setAttribute("oncontextmenu", "putFlag(" + i + "," + j + ")");
            //btn.toggleClass("flagged");
            cell.appendChild(btn);
            row.appendChild(cell);
        }
    }
    console.log("Field rendered succesfully");
    clock.start();
}

function makeMove(x, y){
        var content = document.querySelector(".field").childNodes[x - 1].childNodes[y - 1].querySelector(".cell");
        console.log("Move made in " + (x + 1) + ", " + (y + 1));
        if (arr[x][y] === "X"){
            syncArray();
            disableAll();
            clock.stop();
            alert("game over");
        }
        else if (arr[x][y] !== 0){
            content.style.backgroundColor = "#fff2e2";
            content.innerHTML = "<span style='color: " + designNumber(x, y) + "'>" + arr[x][y] + "</span>";
            view_arr[x][y] = 2;
        }
        else {
            openCloser(x, y);
        }

        if (flags === mines){
            checkVictory();
        }
    }

function openCloser(x, y){
if((view_arr[x][y] !== 2) 
    && (x > 0) && (y > 0)
    && (x <= dimension) 
    && (y <= dimension) 
    && (view_arr[x][y]) !== 1){
        var content = document.querySelector(".field").childNodes[x - 1].childNodes[y - 1].querySelector(".cell");
        if (arr[x][y] === 0){
            if (view_arr[x][y] === 1){
            content.style.backgroundColor = "#fff2e2";
            content.innerHTML = "<i class='fas fa-flag'></i>";
            view_arr[x][y] = 2;
            }
            else if (view_arr[x][y] === 0){
            content.style.backgroundColor = "#fff2e2";
            content.innerHTML = "";
            view_arr[x][y] = 2;
            }
            openCloser(x - 1, y - 1);
            openCloser(x, y - 1);
            openCloser(x + 1, y - 1);
            openCloser(x - 1, y);
            openCloser(x + 1, y);
            openCloser(x - 1, y + 1);
            openCloser(x, y + 1);
            openCloser(x + 1, y + 1);
        }
        else if (view_arr[x][y] === 1){
            content.style.backgroundColor = "#d6d6d6";
            content.innerHTML = "<i class='fas fa-flag'></i>";
        }
        else {
            content.style.backgroundColor = "#fff2e2";
            content.innerHTML = "<span style='color: " + designNumber(x, y) + "'>" + arr[x][y] + "</span>";
            view_arr[x][y] = 2;
        }
    }   
}

function putFlag(x, y){
    var content = document.querySelector(".field").childNodes[x - 1].childNodes[y - 1].querySelector(".cell");
    var f;
    if (view_arr[x][y] !== 2){
        if (view_arr[x][y] === 0){
            f = 1;
            view_arr[x][y] = 1;
            console.log("Flag put on " + x + ", " + y);
            flags++;
            $(".flags").html(flags);
        }
        else {
            f = 0;
            view_arr[x][y] = 0;
            console.log("Flag taken from " + x + ", " + y);
            flags--;
            $(".flags").html(flags);
        }

        ///---////

        if (f === 1){
            content.innerHTML = "<i class='fas fa-flag'></i>";
        }
        else {
            content.innerHTML = "";
        }

        if (flags === mines){
            checkVictory();
        }
    }
}

function disableAll(){
    var content;
    for (var i = 0; i < dimension; i++){
        for (var j = 0; j < dimension; j++){
            content = document.querySelector(".field").childNodes[i].childNodes[j].querySelector(".cell");
            content.setAttribute("disabled","disabled");
        }
    }
}

function checkUnminned(){
    var unminned = 0;
    for (var i = 0; i <= dimension; i++){
        for (var j = 0; j <= dimension; j++){
            if (view_arr[i][j] === 2){
                unminned++;
            }
        }
    }
    
    return unminned;
}

function checkVictory(){
    if ((((dimension*dimension) - checkUnminned()) - flags) === 0){
        console.log(checkUnminned());
        alert("Your time is " + toTimeString(ticks));
        disableAll();
        clock.stop();
        return true;
    }
}

function toTimeString(n){
    var m = Math.floor(ticks / 60);
    var s = Math.floor(ticks) % 60;
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }

    return m + ":" + s
}


// --- HERE GOING TO BE A TIMER ---///

var clock = {
    "interval" : 0,
    "state" : 0,

    "makeTick" : function(){
        this.ticks++;
        t = ticks;
        $(".timer-val").html(toTimeString(ticks));
    },

    "start" : function(){
        if (this.state !== 1){
            this.interval = setInterval(this.makeTick, 1000);
            this.state = 1;
        }
    },

    "pause" : function(){
        clearInterval(this.interval);
        console.log("Clock paused");
        this.state = 2;
    },

    "stop" : function(){
        clearInterval(this.interval);
        this.interval = 0;
        console.log("Clock stopped");
    },

    "getTicks" : function(){
        console.log(ticks);
    }
}
function restart(){
    alert("coming soon!");
}

