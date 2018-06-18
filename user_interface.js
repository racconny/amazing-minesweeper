$(".playBtn").click(function(){
    var val = $("#size_range").val();
    var dif = parseFloat($("#difficulty_range").val()*0.001);
    console.log(val, dif);
    createGame(val, dif);
    $(".modal").css("display","none");
})

$("#difficulty_range").on("input",function(){
    var val = $("#difficulty_range").val()/100;
    $("#range-counter").html(val);
})

$("#size_range").on("input",function(){
    var val = $("#size_range").val();
    $("#size-range-counter").html(val);
})

$("body").on("keypress", function(e){
    if (e.which === 32){
        pause();
    }
})

function createGame(d ,dif){
    dimension = d;
    difficulty = dif;

    arr = generateArray(dimension);
    view_arr = generateArray(dimension);

    renderField(dimension);
    generateMines(dimension, Math.floor((dimension*dimension)*difficulty));
    console.log(Math.floor((dimension*dimension)*difficulty) + " mine(s) generated succesfuly");
    mines = (Math.floor((dimension*dimension)*difficulty));
    $(".mines").html((Math.floor((dimension*dimension)*difficulty)));
}

function showModal(){
    $(".modal").css("display","block");
}



