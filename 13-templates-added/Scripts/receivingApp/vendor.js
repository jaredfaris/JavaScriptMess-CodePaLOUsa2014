window.receivingApp.vendor = function() {
    // initializes all of the delete links in the current vendors list and wires up their AJAX post
    var initializeDeleteLink = function() {
        $('#currentVendors').on('click', '.deleteVendorLink', function (event) {
            event.preventDefault();

            var vendorId = $(this).parents('tr').data('vendorid');

            var deleteAjax = function () {
                $.ajax({
                    type: "POST",
                    url: "/Vendor/Delete",
                    data: { Id: vendorId }
                }).done(function () {
                    amplify.publish("vendorDeleted");
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

    this.createFunction = function () {
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: "/Vendor/Create",
            data: data,
            context: this,
            dataType: "json"
        }).done(function (result) {
                amplify.publish("newVendorCreated");

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
                var template = $('#vendorListTemplate').html();

                var markup = _.template(template, {result: result});

                $('#currentVendors').html(markup);
            });

    };

    amplify.subscribe("newVendorCreated", function() {
        loadGrid();
    });
    amplify.subscribe("vendorDeleted", function() {
        loadGrid();
    });

    return {
        loadGrid: loadGrid
    }
};