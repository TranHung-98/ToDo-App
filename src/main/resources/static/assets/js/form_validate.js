const fields = $('#skill, #date, #status');
const formValidate = $('#skillInput,#dateInput,#statusInput');

$(document).ready(function () {

    // Lắng nghe sự kiện khi người dùng nhập liệu vào input
    $('#skillInput').on('input', checkDuplicateInput);

    // Xử lý khi nhập dữ liệu
    fields.on('input', function () {
        let errorMessageElement = $(this).next('.error-message');
        errorMessageElement.text('');
        $(this).css("border", "");
    });

    // Xử lý khi blur khỏi trường nhập
    fields.on('blur', function () {
        handleValidation($(this));
    });

    // Xử lý khi nhập dữ liệu
    formValidate.on('input', function () {
        let errorMessageElement = $(this).next('.error-message');
        errorMessageElement.text('');
        $(this).css("border", "");
    });

    // Xử lý khi blur khỏi trường nhập
    formValidate.on('blur', function () {
        handleValidation($(this));
    });


    // Xử lý khi không nhập không cho submit form
    $('#edit-row').on('submit', function (e) {
        fields.each(function () {
            handleValidation($(this));
        });
            $(this).submit();
    });

    // Disable the "Delete" button by default
    $('#delete-item').prop('disabled', true);

    // Listen for checkbox changes
    $(document).on('change', '.form-check input[type="checkbox"]', function () {
        // Enable the "Delete" button if at least one checkbox is checked, otherwise disable it
        if ($('.form-check input[type="checkbox"]:checked').length > 0) {
            $('#delete-item').prop('disabled', false);
        } else {
            $('#delete-item').prop('disabled', true);
        }
    });

    // Handle the "Delete" button click
    $('#delete-item').on('click', function () {
        // Check if at least one checkbox is checked before performing the delete operation
        if ($('.form-check input[type="checkbox"]:checked').length > 0) {
            deleteSelectedItems();
        }
    });
});

function handleValidation(element) {
    let errorMessageElement = element.next('.error-message');
    if (element.val().trim() === '') {
        errorMessageElement.text('Please enter this field!');
        element.css("border", "1.5px solid red");
    } else {
        errorMessageElement.text('');
        element.css("border", "1.5px solid #00D6EF");
    }
}


// Hàm kiểm tra giá trị trùng lặp
function checkDuplicateInput() {
    // Lấy giá trị mới từ input
    let inputValue = $('#skillInput').val().trim();

    // Lấy tất cả các giá trị hiện có của các phần tử có class "skilItem"
    let existingValues = $('.skilItem').map(function () {
        return $(this).text().trim();
    }).get();

    // Kiểm tra xem giá trị mới có trùng lặp với các giá trị hiện có hay không
    let isDuplicate = existingValues.includes(inputValue);

    // Hiển thị thông báo nếu có trùng lặp
    if (isDuplicate) {
        alert("Duplicate values found. Please enter unique values.");
        return true; // Trả về true nếu có giá trị trùng lặp
    }

    return false; // Trả về false nếu không có giá trị trùng lặp
}