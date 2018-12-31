$(document).ready(function() {
    $("#form-createSesh").on('submit', function(event) {
        event.preventDefault();
        let data = $(this).serializeArray();
        let seshD = {
            name: data[0]['value']
        };
        $.ajax({
            type: 'POST',
            url: '/db/v1/seshes',
            data: seshD,
            success: function(data) {
                if (data['message'] == "Success") {
                    console.log(data);
                    window.location.href = "/dashboard";
                } else {
                    console.log(data);
                };
            }
        });
    });
});