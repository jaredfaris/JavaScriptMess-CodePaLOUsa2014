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
                    amplify.publish("partDeleted");
                });
            };
            window.receivingApp.utility.deletePopup.open("Delete this vendor?", deleteFunction);
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

    // loads/reloads the discontinued parts grid
    var discontinuedParts = new window.receivingApp.part.discontinuedPartList();

    // initializes the create new link to open a popup window
    var popup = new window.receivingApp.part.createPartPopup(currentParts);
    var initializeCreateNewLink = function () {
        $('#createNewPart').on('click', function (event) {
            event.preventDefault();
            popup.openDialog();
        });
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

window.receivingApp.part.createPartPopup = function(currentPartGrid) {
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
            amplify.publish("newPartCreated");

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
                var template = $('#partListTemplate').html();

                var markup = _.template(template, {result: result});

                $('#currentParts').html(markup);
            });
    };

    // listen for events that make us want to load the grid
    amplify.subscribe("newPartCreated", function() {
        loadGrid();
    });
    amplify.subscribe("partDeleted", function() {
        loadGrid();
    });


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
                var template = $('#discontinuedPartListTemplate').html();

                var markup = _.template(template, {result: result});

                $('#discontinuedParts').html(markup);
            });
    };

    var emptyGrid = function() {
        $('#discontinuedParts').html('');
    }

    amplify.subscribe("partDeleted", function() {
        loadGrid();
    });

    return {
        loadGrid: loadGrid,
        emptyGrid: emptyGrid
    }
};