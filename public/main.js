$(document).ready(function() {
    getAllTodos();
    addTodo();
    deleteTodo();
    updateTodo()



})

function getAllTodos() {
    $.getJSON("/api/todo")
        .then(function(todos) {
            todos.forEach(function(todo) {
                var li = $(`<li class="task">${todo.name} <span>X</span></li>`);
                li.data("id", todo._id);
                li.data("completed", todo.completed);
                $("ul").append(li);
                if (todo.completed == true) {
                    li.addClass("done")
                }
            })
        })
        .catch(function(err) {
            $(".list").after('<h3 class="message">Sign Up/Log In to add and see your todos.</h3>')


            console.log(err);
        })
};


function addTodo() {
    $("input").on("keypress", function(e) {
        if (e.which == 13) {
            $.post("/api/todo", { name: $(this).val() })
                .then(function(todo) {
                    if (!todo.name) {
                        var li = $('<li class="task">Sign Up! <span>X</span></li>');
                        $("ul").append(li);
                        $("input").val("");
                    } else {
                        var li = $(`<li class="task">${todo.name} <span>X</span></li>`);
                        $("ul").append(li);
                        li.data("id", todo._id);
                        li.data("completed", todo.completed);
                        $("input").val("");
                    }

                })
                .catch(function(err) {
                    console.log(err);
                })
        }
    })
};


function deleteTodo() {
    $(".list").on("click", "span", function(e) {
        e.stopPropagation();
        var el = $(this).parent()
        let todoId = el.data("id"),
            deleteURL = "api/todo/" + todoId;
        $.ajax({
                method: "DELETE",
                url: deleteURL,
            })
            .then(function(data) {
                el.remove();
            })
            .catch(function(err) {
                el.remove();
                console.log(err);
            });
    });
}


function updateTodo() {
    $(".list").on("click", "li", function(e) {
        var el = $(this)
        var id = $(this).data("id")
        var updateURL = "/api/todo/" + id
        var currentState = $(this).data("completed")
        var updateState = !currentState
        $.ajax({
                url: updateURL,
                method: "PUT",
                data: { completed: updateState }
            })
            .then(function(data) {
                el.toggleClass("done")
            })
            .catch(function(err) {
                el.toggleClass("done");
                console.log(err);
            })

    })
};