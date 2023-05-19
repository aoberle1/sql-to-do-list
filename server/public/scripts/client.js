$(document).ready(onReady);

function onReady(){
    console.log( 'js is working' );
    $('#submit-button').on('click', postTask)
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
            <div>
                <li>${task.todo}
                <button class='delete-button'>Delete</button>
                <button class='update-button'>Finished?</button>
                </li>
            </div>`
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