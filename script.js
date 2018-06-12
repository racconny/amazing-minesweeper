renderField(5);


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
    console.info("Move made in " + x + " , " + y);
}

