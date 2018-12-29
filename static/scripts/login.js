$(document).ready(function() {
    $("#form-register").on('submit', function(event) {
        event.preventDefault();
        let data = $(this).serializeArray();
        let userD = {
            username: data[0]['value'],
            email: data[1]['value'],
            password: data[2]['value'],
            pw_confirm: data[3]['value'],
        };
        $.ajax({
            type: 'POST',
            url: '/db/v1/users/register',
            data: userD,
            success: function(data) {
                console.log(data);
            }
        });
    });

    $("#form-login").on('submit', function(event) {
        event.preventDefault();
        let data = $(this).serializeArray();
        console.log(data);
        let userD = {
            email: data[0]['value'],
            password: data[1]['value']
        };
        $.ajax({
            type: 'POST',
            url: '/db/v1/users/login',
            data: userD,
            success: function(data) {
                console.log(data);
            }
        });
    });
});