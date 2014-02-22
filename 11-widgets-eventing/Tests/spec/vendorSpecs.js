describe("Vendor object", function () {

    var vendor = null;

    describe("vendor function called", function() {
        beforeEach(function() {
            vendor = receivingApp.vendor();
        });

        describe("Step 4 - delete link code moved to object", function () {
            beforeEach(function() {
                // create some fake HTML
                $(document.body).append('<div id="currentVendors"><a class="deleteVendorLink"></a></div>');
            });

            it("vendor should have a method to initialize the delete link", function() {
                expect(vendor.initializeDeleteLink).toBeDefined();
            });

            it("should handle a click on the #currentVendors delete link", function() {
                // note - because of how .on binds to the parent controller, we have to detect the event there and
                // not on the link itself
                vendor.initializeDeleteLink();

                expect($('#currentVendors')).toHandle("click");
            });
        });

        describe("Step 5 - move the remaining functionality to the object", function() {
            beforeEach(function() {
                // create some fake HTML
                $(document.body).append('<div id="createNewVendor"></div>');
            });

            afterEach(function() {
            });

            it("vendor should have a bunch more functions", function() {
                expect(vendor.initialize).toBeDefined();
                expect(vendor.initializeCreateNewLink).toBeDefined();
                expect(vendor.loadCurrentVendors).toBeDefined();
            })

            it("should handle a click on #createNewVendor", function() {
                vendor.initializeCreateNewLink();

                expect($('#createNewVendor')).toHandle('click');
            });

            it("should make an ajax call when loadCurrentVendors called", function() {
                // return a fake object with a done function
                spyOn($, 'ajax').and.returnValue({
                    done: function() {}
                })

                vendor.loadCurrentVendors();

                expect($.ajax).toHaveBeenCalled();
            });
        });

        describe("Step 7 - make a createVendorPopup function that inherits utility.createObjectPopup", function() {
            it("Add a createVendorPopup function to receivingApp.vendor", function() {
                expect(receivingApp.vendor.createVendorPopup).toBeDefined();
            });

            var popupObject = null;

            beforeEach(function() {
                popupObject = new receivingApp.vendor.createVendorPopup();
            });

            it("Make createVendorPopup's prototype be utility.createObjectPopup", function() {
                expect(receivingApp.utility.createObjectPopup.prototype.isPrototypeOf(popupObject)).toBeTruthy();
            });

            it("Give createVendorPopup title and formId properties", function() {
                expect(popupObject.title).toBeDefined();
                expect(popupObject.formId).toBeDefined();
            });

            it("Give createVendorPopup a createFunction that can be called from the prototype's code", function() {
                expect(popupObject.createFunction).toBeDefined();
            });
        });

        describe("Step 8 - extract the vendor list code to it's own object", function() {
            it("Add a currentVendorList function to receivingApp.vendor", function() {
                expect(receivingApp.vendor.currentVendorList).toBeDefined();
            });

            var listObject = null;

            beforeEach(function() {
                listObject = new receivingApp.vendor.currentVendorList();
            });

            it("Reveal a loadGrid function from the currentVendorList", function() {
                expect(listObject.loadGrid).toBeDefined();
            });

            it("Make the loadGrid function make an AJAX call to get grid data", function() {
                spyOn($, 'ajax').and.returnValue({
                    done: function() {}
                })

                vendor.loadCurrentVendors();

                expect($.ajax).toHaveBeenCalled();
            });

            var currentVendorListReference = receivingApp.vendor.currentVendorList;
            var loadGridSpy = null;
            beforeEach(function() {
                // making a fake currentVendorList
                loadGridSpy = jasmine.createSpy("loadGrid");

                receivingApp.vendor.currentVendorList = function() {
                    this.loadGrid = loadGridSpy;
                };
            });

            it("Make vendor.initialize() call currentVendors.loadGrid()", function() {

                // reinitialize vendor so it gets the fake
                var newVendor = new receivingApp.vendor();

                newVendor.initialize();

                expect(loadGridSpy).toHaveBeenCalled();
            })

            afterEach(function() {
               receivingApp.vendor.currentVendorList = currentVendorListReference;
            });
        });
    });
});