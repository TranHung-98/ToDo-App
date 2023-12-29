$(document).ready(function () {
    var closeElements = $(".close");
    var formEdit = $("#form-edit");
    var formAdd = $("#form-add");
    var modal = $("#modal");
    var addTask = $("#add-task");

    closeElements.click(function () {
        modal.hide();
    });


    // Hiển thị modal add
    addTask.click(function () {
        modal.show();
        formEdit.hide();
        formAdd.show();
    });


    // Hàm update (edit)
    $('#edit-row').on('click', function () {
        var skill = $('#skill').val();
        var date = $('#date').val();
        var state = $('#status').val();
        var id = $('#id').val();

        switch (state) {
            case 1:
                state = 'Completed';
                break;
            case 2:
                state = 'Not Started';
                break;
            case 3:
                state = 'In Progress';
                break;
            default:
                state;
                break;
        }


        if (id && skill && date && state) {
            var updateData = {
                id: id, skill: skill, date: date, status: state
            };

            $.ajax({
                type: "PUT",
                url: "/updateTraining",
                contentType: "application/json",
                data: JSON.stringify(updateData),
                success: function (response) {
                    location.reload();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        } else {
            console.error("Invalid data. Please check the values.");
        }

    });

    // Xử lý Filter:
    $('#filter').on('change', function () {
        // Get the selected value
        var selectedValue = $(this).val();

        // Clear existing content
        $('#list').html('');

        switch (selectedValue) {
            case "All":
                $.ajax({
                    url: "/todo", method: 'GET', dataType: 'json',
                }).done(function (response) {
                    handleResponse(response);
                });
                break;
            case "In Progress":
            case "Not Started":
            case "Completed":
                $.ajax({
                    type: 'GET', url: '/filter', data: {filterValue: selectedValue}
                }).done(function (response) {

                    // Clear existing content
                    $('#list').html('');

                    if (Array.isArray(response) && response.length > 0) {
                        // Handle the response and update the UI
                        response.forEach(function (trainingDto) {
                            // Create unique checkbox ID based on trainingDto.id
                            var checkboxId = 'flexCheckDefault-' + trainingDto.id;

                            // Append new items to the list
                                $('#list').append(`
                                <div class="d-flex result_item justify-content-between bg-white mt-3 p-3 rounded-3 align-items-center">
                                    <div class="form-check d-flex align-items-center justify-content-around">
                                        <input style="width: 25px; height: 35px; cursor: pointer;"
                                            class="form-check d-flex align-items-center justify-content-around-input"
                                            type="checkbox" value id="${checkboxId}">
                                        <label class="form-check" for="${checkboxId}">
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
                    } else {
                        // Display a message or take appropriate action for empty data
                        $('#list').html('<p class="error-filter">No data found for the filter!</p>');
                    }
                });
                break;
            default:
                break;
        }

        function handleResponse(response) {
            // Check if the response is an array
            if (Array.isArray(response)) {
                response.forEach(function (trainingDto) {
                    // Create unique checkbox ID based on trainingDto.id
                    var checkboxId = 'flexCheckDefault-' + trainingDto.id;

                    // Append new items to the list
                    $('#list').append(`
                    <div class="d-flex result_item justify-content-between bg-white mt-3 p-3 rounded-3 align-items-center">
                        <div class="form-check d-flex align-items-center justify-content-around">
                            <input style="width: 25px; height: 35px; cursor: pointer;"
                                class="form-check d-flex align-items-center justify-content-around-input"
                                type="checkbox" value id="${checkboxId}">
                            <label class="form-check" for="${checkboxId}">
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
        }

    });

});


// Hiển thị modal edit
function openModal(list) {

    // Đặt giá trị cho các phần tử trong modal dựa trên giá trị từ list
    $('#skill').val(list.skill);
    $('#date').val(list.date);
    $('#status').val(list.status);
    $('#id').val(list.id);


    $('#modal').show();
    $('#form-add').hide();
    $('#form-edit').show();
}


function deleteItem(list) {
    if (!list.id || !list.skill) {
        console.error("Invalid data. Please check the values.");
        return;
    }

    $.ajax({
        type: "DELETE", url: `/deleteTraining/${list.id}/${encodeURIComponent(list.skill)}`, // Ensure skill is properly encoded
        contentType: "application/json", success: function (response) {
            location.reload();
        }, error: function (error) {
            console.error("Error:", error);
        }
    });
}



