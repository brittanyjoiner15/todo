console.log("js is working at the moment");

$(document).ready(function () {
  console.log("DOM is ready");
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: "GET",
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=179",
      dataType: "json",
      success: function (response, textStatus) {
        $("#todo-list").empty();
        response.tasks.forEach(function (task) {
          $("#todo-list").append(
            $("#todo-list").append(
              '<div class="row"><p class="col-xs-8 item"><input type="checkbox" class="mark-complete" data-id="' +
                task.id +
                '"' +
                (task.completed ? "checked" : "") +
                ">             " +
                task.content +
                '</p><button class="delete btn btn-danger" data-id="' +
                task.id +
                '">Delete</button>'
            )
          );
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  //Function for reating a task
  var createTask = function () {
    $.ajax({
      type: "POST",
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=179",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        task: {
          content: $("#new-task").val(),
        },
      }),
      success: function (response, textStatus) {
        console.log(response);
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  // Apply the function to the submission of the form
  $("#create-task").on("submit", function (e) {
    e.preventDefault();
    createTask();
  });

  getAndDisplayAllTasks();

  var deleteTask = function (id) {
    $.ajax({
      type: "DELETE",
      url:
        "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
        id +
        "?api_key=179",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $(document).on("click", ".delete", function () {
    deleteTask($(this).data("id"));
  });

  var markTaskComplete = function (id) {
    $.ajax({
      type: "PUT",
      url:
        "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
        id +
        "/mark_complete?api_key=179",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  var markTaskActive = function (id) {
    $.ajax({
      type: "PUT",
      url:
        "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
        id +
        "/mark_active?api_key=179",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $(document).on("change", ".mark-complete", function () {
    if (this.checked) {
      markTaskComplete($(this).data("id"));
    } else {
      markTaskActive($(this).data("id"));
    }
  });
});

//Dummy example for creating a task
// $.ajax({
//   type: "POST",
//   url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=179",
//   contentType: "application/json",
//   dataType: "json",
//   data: JSON.stringify({
//     task: {
//       content: "Do something fun",
//     },
//   }),
//   success: function (response, textStatus) {
//     console.log(response);
//   },
//   error: function (request, textStatus, errorMessage) {
//     console.log(errorMessage);
//   },
// });
