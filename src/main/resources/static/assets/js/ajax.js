$(function () {

    // Hàm Get tất cả data ra hiển thỉ UI
    $.ajax({
        url: "/todo",
        method: 'GET',
        dataType: 'json',
    }) .done(function (response) {
            handleResponse(response)
    });

    // Hàm Save khi có người dùng đăng kí hoặc add
    $("#saveTrainingButton").click(function () {

        var skill = $("#skillInput").val();
        var date = $("#dateInput").val();
        var status = $("#statusInput").val();


        if (checkDuplicateInput()) {
            return; // Dừng lại nếu có giá trị trùng lặp
        }

        if(skill.trim()=== '' && date.trim() === '' && status.trim() === '') {
            return;
        }else {
            $(this).submit();
        }

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
            case "Filter":
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
                    handleResponse(response);
                });
                break;
            default:
                break;
        }

    });


});

function handleResponse(response) {
    // Check if the response is an array
    if (Array.isArray(response) && response.length > 0) {
        response.forEach(function (trainingDto) {
            // Create unique checkbox ID based on trainingDto.id
            var checkboxId = 'flexCheckDefault-' + trainingDto.id;


            // Xác định class dựa trên giá trị status
            var statusClass = getStatusClass(trainingDto.status);

            // Format the date using moment.js
            var dateString = trainingDto.date;
            var formattedDate = formatDateTime(dateString);

            // Append new items to the list
            $('#list').append(`
                    <div class="d-flex result_item ${statusClass} justify-content-between bg-white mt-3 p-3 rounded-3 align-items-center">
                        <div class="form-check d-flex align-items-center justify-content-around">
                            <input style="width: 25px; height: 35px; cursor: pointer;"
                                class="form-check d-flex align-items-center justify-content-around-input"
                                type="checkbox" value id="${checkboxId}">
                            <label class="form-check" for="${checkboxId}">
                                <p class="skilItem">${trainingDto.skill}</p>
                                <p>${formattedDate}</p>
                                <input type="text" value="${trainingDto.id}" disabled style="display: none">
                            </label>
                        </div>
                        <div class="remove-edit">
                            <button type="button" id="remove-${trainingDto.id}" class="border-0 remove padding">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                            <button type="button" id="edit-${trainingDto.id}" class="border-0 edit pading">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                        </div>
                    </div>
            `);
        });

    }else {
        // Display a message or take appropriate action for empty data
        $('#list').html('<p id="error-filter" class="error-filter">Không có dữ liệu!</p>');
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
}



//Xly xoá Item khi click remove
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


// Xoá khi checked
function deleteSelectedItems() {
    // Get the selected checkboxes
    var selectedCheckboxes = $('.form-check input[type="checkbox"]:checked');

    // Create an array to store the IDs of selected items
    var selectedIds = [];

    // Loop through the selected checkboxes and extract the ID values
    selectedCheckboxes.each(function() {
        var itemId = $(this).closest('.result_item').find('input[type="text"]').val();
        selectedIds.push(itemId);
    });

    // Log the IDs (you can replace this with your actual delete logic)
    console.log('Selected IDs:', selectedIds);

    // Construct the URL with the selected IDs
    var url = "/deleteTraining/" + selectedIds.join(',');

    // Make the AJAX request to delete the selected items
    $.ajax({
        type: "DELETE",
        url: url,
        success: function (response) {
            console.log('Selected items deleted successfully.');
            location.reload(); // Refresh the page or update the UI as needed
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
}


// Hàm định dạng ngày giờ
function formatDateTime(dateString) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };

    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate.replace(/,/g, '');
}


function getStatusClass(status) {
    // Hàm này xác định class dựa trên giá trị status
    switch (status) {
        case 'Completed':
            return 'bg-light';
        case 'In Progress':
            return'';
        default:
            return'';
    }

}
