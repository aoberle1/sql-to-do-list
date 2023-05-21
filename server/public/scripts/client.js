$(document).ready(onReady);

function onReady(){
    console.log( 'js is working' );
    $('#submit-button').on('click', postTask)
    $('#to-do-list').on('click', '.delete-button', deleteTask)
    $('#to-do-list').on('click', '.update-button', isComplete)

    getList();
}

// creating get function
function getList() {
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function(response) {
        renderToDom(response);
    }).catch(function (error) {
        console.log('error in artist get', error);
    });
}

// creating render function
function renderToDom( tasks ) {
    $('#to-do-list').empty();
    // looping through tasks - will be response from server containing database info
    for(let task of tasks) {
        console.log('is the task complete:', task.complete)
        // tr class is either yes/no depending on value of task.complete
        $('#to-do-list').append(`
            <tr class='${task.complete}' data-id=${task.id}>
                <td>${task.todo}</td>
                <td>${task.complete}</td>
                <td><button class='delete-button btn btn-danger'>Delete</button></td>
                <td><button class='update-button btn btn-warning'>Finished?</button></td>
            </tr>
            `
        );
    }
    // if tr class in append above is yes change it's background color to yellow
    $('.yes').css("background-color", "yellow");
 }

// creating post function
function postTask() {
    // saving value of task input
    const taskToSend = {
        todo: $('#task-input').val(), 
    };
    console.log('Adding task', taskToSend);
    // Send the new task to the server as data
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: taskToSend
    }).then(function(response) {
        console.log(response);
        getList();
    }).catch(function(error) {
        console.log('error in artist post', error); 
        alert('Error adding task. Please try again later.')       
    });
}

// creating delete function
function deleteTask() {
    // targeting the parent row of the td containing the delete button - grabbing it's id - same as database id
    const idToDelete = $(this).closest('tr').data('id');
    console.log(idToDelete);
    $.ajax({
        type: 'DELETE',
        url: `/todo/${idToDelete}`
    }).then(function(response) {
        console.log(response);
        getList();
    }).catch(function(error) {
        console.log('Error with delete task:', error);
    })
    
};

// creating put function
function isComplete() {
    console.log( 'complete clicked')
    let idToUpdate = $(this).closest('tr').data('id');
    // default value of complete is no - tasks are not complete by default
    let complete = 'no';
    console.log('idToUpdate',idToUpdate, complete);

 if ( complete === 'no' ) {
     $.ajax({
         method: 'PUT',
         url: `/todo/${idToUpdate}`,
         data: { // data should be an object
             complete: 'no',
         }
     }).then(function(response){
         console.log(response)
         getList();
     }).catch(function(err){
         console.log(err)
     })
 }
}