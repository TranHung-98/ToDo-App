$(document).ready(function () {

    let closeElements = $(".close");
    let formEdit = $("#form-edit");
    let formAdd = $("#form-add");
    let modal = $("#modal");
    let addTask = $("#add-task");

    closeElements.click(function () {
        modal.hide();
    });

    // Hiển thị modal add
    addTask.click(function () {
        modal.show();
        formEdit.hide();
        formAdd.show();

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





