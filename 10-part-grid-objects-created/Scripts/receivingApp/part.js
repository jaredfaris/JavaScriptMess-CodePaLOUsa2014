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

    // initializes the create new link to open a popup window
    var initializeCreateNewLink = function () {
        $('#createNewPart').on('click', function () {
            $('#createNewPartForm').dialog({
                resizable: false,
                width: 500,
                modal: true,
                title: "New Part",
                buttons: {
                    "Create": function () {
                        var data = $('#createNewPartForm').serialize();
                        $.ajax({
                            type: 'POST',
                            url: '/Part/Create',
                            data: data,
                            context: this,
                            dataType: "json"
                        }).done(function (result) {
                                // Look at all this lovely markup
                                $('#partsList tbody').append('' +
                                    '<tr data-partid="' + result.Id + '"><input type="hidden" name="id" value="' + result.Id + '">' +
                                    '<td>' + result.Name + '</td>' +
                                    '<td>' + result.Weight + '</td>' +
                                    '<td><a class="deletePartLink" href="#">Delete</a>' +
                                    '</form></td>');

                                $(this).dialog("close");
                                $(this).find('input').val('');
                            });

                    },
                    Cancel: function () {
                        $(this).dialog("close");
                        $(this).first('input').val('');
                    }
                }
            });
        });
    };

    // wires up the Hide/Show Discontinued Parts link
    var initializeToggleDiscontinuedLink = function () {
        $('#toggleDiscontinuedParts').on('click', function (event) {
            event.preventDefault();

            var isShowing = $(this).hasClass('expanded');

            if (!isShowing) {
                // show the parts
                $('#toggleDiscontinuedParts').text('Hide Discontinued Parts').addClass('expanded');
                loadDiscontinuedParts();
            } else {
                // hide the parts
                $('#toggleDiscontinuedParts').text('Show Discontinued Parts').removeClass('expanded');
                $('#discontinuedParts').html('');
            }
        });
    };

    // loads/reloads the discontinued parts grid
    var loadDiscontinuedParts = function () {
        $.ajax({
            url: '/Part/DiscontinuedParts',
            type: 'GET',
            context: this,
            dataType: "json"
        }).done(function (result) {
                var markup = '<table class="table"><tr><th>Name</th><th>Weight</th><th></th></tr>';

                _.each(result, function (item) {
                    markup += "<tr><td>" + item.Name + "</td><td>" + item.Weight + "</td><td></td></tr>";
                });

                markup += "</table>";

                $('#discontinuedParts').html(markup);
            });
    };

    // loads/reloads the current parts grid
    var currentParts = new window.receivingApp.part.currentPartList();
    var loadCurrentParts = function () {
        currentParts.loadGrid();
    };

    // initializes everything. called once at page load
    var initialize = function () {
        this.initializeDeleteLink();
        this.initializeCreateNewLink();
        this.initializeToggleDiscontinuedLink();
        this.loadCurrentParts();
    };

    return {
        initialize: initialize,
        initializeDeleteLink: initializeDeleteLink,
        initializeCreateNewLink: initializeCreateNewLink,
        initializeToggleDiscontinuedLink: initializeToggleDiscontinuedLink,
        loadCurrentParts: loadCurrentParts,
        loadDiscontinuedParts: loadDiscontinuedParts
    };

};

window.receivingApp.part.createPartPopup = function() {
    this.title = "New Part";
    this.formId = "createNewPartForm";
    this.createFunction = function() {
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/Part/Create',
            data: data,
            context: this,
            dataType: "json"
        }).done(function (result) {
                // Look at all this lovely markup
                $('#partsList tbody').append('' +
                    '<tr data-partid="' + result.Id + '"><input type="hidden" name="id" value="' + result.Id + '">' +
                    '<td>' + result.Name + '</td>' +
                    '<td>' + result.Weight + '</td>' +
                    '<td><a class="deletePartLink" href="#">Delete</a>' +
                    '</form></td>');

                $(this).dialog("close");
                $(this).find('input').val('');
            });
    }
};
window.receivingApp.part.createPartPopup.prototype = new window.receivingApp.utility.createObjectPopup();

window.receivingApp.part.currentPartList = function () {
    var loadGrid = function() {
        // load the current parts at page load
        $.ajax({
            url: '/Part/CurrentParts',
            type: 'GET',
            context: this,
            dataType: "json"
        }).done(function (result) {
                var markup = '<table class="table" id="partsList"><tr><th>Name</th><th>Weight</th><th></th></tr>';

                _.each(result, function (item) {
                    markup += "<tr data-partid=\"" + item.Id + "\">" +
                        "<input type=\"hidden\" class=\"partId\" value=\"" + item.Id + "\"/>" +
                        "<td>" + item.Name + "</td>" +
                        "<td>" + item.Weight + "</td>" +
                        "<td><a class=\"deletePartLink\" href=\"#\">Delete</a></td></tr>";
                });

                markup += "</table>";

                $('#currentParts').html(markup);
                $('#currentParts').html(markup);
            });
    };

    return {
        loadGrid: loadGrid
    }
};

window.receivingApp.part.discontinuedPartList = function () {
    var loadGrid = function() {
        $.ajax({
            url: '/Part/DiscontinuedParts',
            type: 'GET',
            context: this,
            dataType: "json"
        }).done(function (result) {
                var markup = '<table class="table"><tr><th>Name</th><th>Weight</th><th></th></tr>';

                _.each(result, function (item) {
                    markup += "<tr><td>" + item.Name + "</td><td>" + item.Weight + "</td><td></td></tr>";
                });

                markup += "</table>";

                $('#discontinuedParts').html(markup);
            });
    };

    var emptyGrid = function() {
        $('#discontinuedParts').html('');
    }

    return {
        loadGrid: loadGrid,
        emptyGrid: emptyGrid
    }
};