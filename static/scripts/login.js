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
                if (data['message'] == "Success") {

                } else {
                    console.log(data['message']);
                };
            }
        });
    });

    $("#form-login").on('submit', function(event) {
        event.preventDefault();
        let data = $(this).serializeArray();
        let userD = {
            email: data[0]['value'],
            password: data[1]['value']
        };
        $.ajax({
            type: 'POST',
            url: '/db/v1/users/login',
            data: userD,
            success: function(data) {
                if (data['message'] == "Success") {
                    window.location.href = "/dashboard";
                } else {
                    console.log(data['message']);
                };
            }
        });
    });
});