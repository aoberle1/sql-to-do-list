$(document).ready(onReady);

function onReady(){
    console.log( 'js is working' );
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