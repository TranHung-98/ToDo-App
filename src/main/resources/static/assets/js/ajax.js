$(function () {

    // Hàm Get tất cả data ra hiển thỉ UI
    $.ajax({
        url: "/todo",
        method: 'GET',
        dataType: 'json',
    })
        .done(function (response) {
            // Check if the response is an array
            if (Array.isArray(response)) {
                response.forEach(function (trainingDto) {
                    $('#list').append(`
                    <div class="d-flex result_item justify-content-between bg-white mt-3 p-3 rounded-3 align-items-center">
                        <div class="form-check d-flex align-items-center justify-content-around">
                            <input style="width: 25px; height: 35px; cursor: pointer;"
                                class="form-check d-flex align-items-center justify-content-around-input"
                                type="checkbox" value id="flexCheckDefault">
                            <label class="form-check" for="flexCheckDefault">
                                <p>${trainingDto.skill}</p>
                                <p>${trainingDto.date}</p>
                                <input type="text" value="${trainingDto.id}" disabled style="display: none">
                            </label>
                        </div>
                        <div class="remove-edit">
                            <button type="button" id="remove-${trainingDto.id}" class="border-0 remove pading"> <i class="fa-solid fa-trash"></i></button>
                            <button type="button" id="edit-${trainingDto.id}" class="border-0 edit pading"> <i class="fa-solid fa-pen"></i></button>
                        </div>
                    </div>
                `);
                });
            }

            response.forEach(function (list) {
                var  clickButton = document.getElementById(`edit-${list.id}`);
                $(clickButton).on('click',function () {
                    openModal(list);
                })
            })

            response.forEach(function (list) {
                var  clickElement = document.getElementById(`remove-${list.id}`);
                $(clickElement).on('click',function () {
                    deleteItem(list);
                })
            })

        });




    // Hàm Save khi có người dùng đăng kí hoặc add
    $("#saveTrainingButton").click(function () {
        var skill = $("#skillInput").val();
        var date = $("#dateInput").val();
        var status = $("#statusInput").val();


        var requestData = {
            skill: skill,
            date: date,
            status: status
        };

        $.ajax({
            type: "POST",
            url: "/save",
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function (response) {
                location.reload();
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });
    });



    // Check listRow : Nếu có tại $('.result_item') thì hiển thị $('#footer').show() và ngược lại
    // function checkRow() {
    //     // Select elements with the class 'result_item'
    //     var listRow = $('.result_item');
    //
    //     // Check if there are elements
    //     if (listRow.length > 0) {
    //         // If there are elements, show the '#list'
    //         $('#list').show();
    //     } else {
    //         // If there are no elements, hide the '#list'
    //         $('#list').hide();
    //     }
    // }

    // checkRow();


});

