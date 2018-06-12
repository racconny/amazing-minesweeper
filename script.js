$("body").on("contextmenu", false);
var dimension = 10;
var arr = generateArray(dimension);
renderField(dimension);
generateMines(dimension, 50);


function generateArray(d){
    var f = [];
    for (var i = 0; i < (d + 2); i++){
        f[i] = [];
        for (var j = 0; j < (d + 1); j++){
            f[i][j] = 0;
        }
    }
    return f;
}

function generateMines(d, a){
    var generated = 0;
    while (generated < a){
        var t1 = Math.floor((Math.random() * d) + 1);
        var t2 = Math.floor((Math.random() * d) + 1)
        if (arr[t1][t2] !== "X"){
            arr[t1][t2] = "X";
            generated++;
            document.querySelector(".field")
            .childNodes[t1 -1]
            .childNodes[t2 - 1]
            .querySelector(".cell")
            .innerHTML = "<span class='fas fa-skull'></span>";
        }
    }
    //Math.floor((Math.random() * 10) + 1);
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
            cell.appendChild(btn);
            row.appendChild(cell);
        }
    }
}

function makeMove(x, y){
    console.info("Move made in " + (x + 1) + "," + (y + 1));
    arr[x + 1][y + 1] = "o";
    console.table(arr);
}



