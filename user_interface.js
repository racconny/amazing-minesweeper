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


function showModal(){
    $(".modal").css("display","block");
}



