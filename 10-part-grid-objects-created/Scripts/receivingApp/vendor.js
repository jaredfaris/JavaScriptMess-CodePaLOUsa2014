window.receivingApp.vendor = function() {
    // initializes all of the delete links in the current vendors list and wires up their AJAX post
    var initializeDeleteLink = function() {
        $('#currentVendors').on('click', '.deleteVendorLink', function (event) {
            event.preventDefault();

            var vendorId = $(this).parents('tr').data('vendorid');

            var updateGrid = function() {
                currentVendors.loadGrid();
            };
            updateGrid = _.bind(updateGrid, this);

            var deleteAjax = function () {
                $.ajax({
                    type: "POST",
                    url: "/Vendor/Delete",
                    data: { Id: vendorId }
                }).done(function () {
                    updateGrid();
                });
            };

            window.receivingApp.utility.deletePopup.open("Delete this vendor?", deleteAjax);
        });
    };

    // loads/reloads the current vendors grid
    var currentVendors = new window.receivingApp.vendor.currentVendorList();
    var loadCurrentVendors = function () {
        currentVendors.loadGrid();
    };

    // initializes the create new link to open a popup window
    var popup = new window.receivingApp.vendor.createVendorPopup(currentVendors);
    var initializeCreateNewLink = function () {
        $('#createNewVendor').on('click', function (event) {
            event.preventDefault();
            popup.openDialog();
        });
    };

    var initialize = function () {
        initializeCreateNewLink();
        initializeDeleteLink();
        loadCurrentVendors();
    };


    return {
        initialize: initialize,
        initializeDeleteLink: initializeDeleteLink,
        initializeCreateNewLink: initializeCreateNewLink,
        loadCurrentVendors: loadCurrentVendors
    };
}

window.receivingApp.vendor.createVendorPopup = function(currentVendorGrid) {
    this.title = "New Vendor";
    this.formId = "createNewVendorForm";

    // we want to force the context to be the grid that was passed in when we call update
    // otherwise we'll be referring to the dialog window
    var updateGrid = function() {
        currentVendorGrid.loadGrid()
    };

    this.createFunction = function () {
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: "/Vendor/Create",
            data: data,
            context: this,
            dataType: "json"
        }).done(function (result) {
                updateGrid();

                $(this).dialog("close");
                $(this).find('input').val('');
            });
    };
};
window.receivingApp.vendor.createVendorPopup.prototype = new window.receivingApp.utility.createObjectPopup();

window.receivingApp.vendor.currentVendorList = function() {
    var loadGrid = function() {
        $.ajax({
            url: '/Vendor/CurrentVendors',
            type: 'GET',
            context: this,
            dataType: "json"
        }).done(function (result) {
                var markup = '<table class="table" id="vendorsList"><tr><th>Name</th><th>Address 1</th><th>City</th><th>State</th><th>Zip</th><th></th></tr>';

                _.each(result, function (item) {
                    markup += '<tr data-vendorid="' + item.Id + '">' +
                        '<input type="hidden" name="id" value="' + item.Id + '" />' +
                        '<td>' + item.Name + '</td>' +
                        '<td>' + item.Address1 + '</td>' +
                        '<td>' + item.City + '</td>' +
                        '<td>' + item.State + '</td>' +
                        '<td>' + item.Zip + '</td>' +
                        '<td><a class="deleteVendorLink" href="#">Delete</a></td>' +
                        '</tr>';
                });

                markup += "</table>";

                $('#currentVendors').html(markup);
            });

    };

    return {
        loadGrid: loadGrid
    }
};