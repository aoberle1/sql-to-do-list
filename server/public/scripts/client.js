$(document).ready(onReady);

function onReady(){
    console.log( 'js is working' );
    $('#submit-button').on('click', postTask)
    $('#to-do-list').on('click', '.delete-button', deleteTask)
    $('#to-do-list').on('click', '.update-button', isComplete)

    getList();
}

function getList() {
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function(response) {
        const tasks = response;
        renderToDom(response);
    }).catch(function (error) {
        console.log('error in artist get', error);
    });
}

function renderToDom( tasks ) {
    $('#to-do-list').empty();

    for(let task of tasks) {
        $('#to-do-list').append(`
            <tr data-id=${task.id}>
                <td>${task.todo}</td>
                <td>${task.complete}</td>
                <td><button class='delete-button'>Delete</button></td>
                <td><button class='update-button'>Finished?</button></td>
            </tr>
            `
        );
    }
}

function postTask() {
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

function deleteTask() {
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

function isComplete() {
    console.log( 'complete clicked')
    let idToUpdate = $(this).closest('tr').data('id');
    let complete = 'no';
    console.log('idToUpdate',idToUpdate, complete);

 if ( complete === 'no' ) {
     console.log('idTOUpdate no', idToUpdate )
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