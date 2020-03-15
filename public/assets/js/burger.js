$(function(){
    $(".create-form").on("submit", function (event){
        event.preventDefault();
        const newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };
        $ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(function(){
                console.log("burger added!");
                location.reload();
            });
        });

    
    $(".eatburger").on("click", function(event){
        event.preventDefault();
        const id = $(this).data("id");
        const devouredState = {
            devoured: 1
        };
        $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devouredState
     }).then(function(){
         console.log("Burger Eaten");
         location.reload();
        })
    });
    
    $(".deleteburger").on("click", function(event){
        event.preventDefault();
        const id = $(this).data("id");
        $.ajax({
            type: "DELETE"
        }).then(function(){
            console.log("burger " + id + " deleted");
            location.reload();
        });
    });
});