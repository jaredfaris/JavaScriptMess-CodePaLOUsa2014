window.receivingApp.part = function () {
    // initializes all of the delete links in the current parts list and wires up their AJAX post
    var initializeDeleteLink = function() {
        $('#currentParts').on('click', '.deletePartLink', function (event) {
            event.preventDefault();

            var partId = $(this).parents('tr').data('partid');

            var deleteFunction = function () {
                $.ajax({
                    type: "POST",
                    url: "/Part/Delete",
                    data: { Id: partId },
                    context: this
                }).done(function () {
                        $('#partsList').find('tr[data-partid="' + partId + '"]').remove();
                    });
            }
            window.receivingApp.utility.deletePopup.open("Delete this vendor?", deleteFunction);
        });
    };

    return {
        initializeDeleteLink: initializeDeleteLink
    };
};