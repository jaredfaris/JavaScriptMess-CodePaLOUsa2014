describe("Part object", function () {

    var part = null;

    describe("When part() is called", function() {
        beforeEach(function() {
            part = receivingApp.part();

            // create some fake HTML
            $(document.body).append('<div id="currentParts"><a class="deletePartLink"></a></div>');
        });

        describe("Step 4 - Extracting the delete funcationality to a popup", function () {
            it("Create a method to initialize the part delete link", function() {
                expect(part.initializeDeleteLink).toBeDefined();
            });

            it("Bind a click event on the #currentParts delete link", function() {
                // note - because of how .on binds to the parent controller, we have to detect the event there and
                // not on the link itself
                var $target = $('#currentParts');

                part.initializeDeleteLink();

                expect($target).toHandle("click");
            });
        });

        describe("Step 5 - Move the remaining functionality to the object", function() {
            beforeEach(function() {
                // create some fake HTML
                $(document.body).append('<div id="createNewPart"></div>');
                $(document.body).append('<div id="toggleDiscontinuedParts"></div>');
            });

            afterEach(function() {
            });

            it("Make sure part reveals all of the necessary functions", function() {
                expect(part.initialize).toBeDefined();
                expect(part.initializeCreateNewLink).toBeDefined();
                expect(part.loadCurrentParts).toBeDefined();
                expect(part.initializeToggleDiscontinuedLink).toBeDefined();
                expect(part.loadCurrentParts).toBeDefined();
                expect(part.loadDiscontinuedParts).toBeDefined();
            })

            it("Bind a click event on #createNewPart", function() {
                part.initializeCreateNewLink();

                expect($('#createNewPart')).toHandle('click');
            });

            it("Bind a click event on #toggleDiscontinuedParts", function() {
                part.initializeToggleDiscontinuedLink();

                expect($('#toggleDiscontinuedParts')).toHandle('click');

            });

            it("Wire up loadCurrentParts to fire off an AJAX call", function() {
                // return a fake object with a done function
                spyOn($, 'ajax').and.returnValue({
                    done: function() {}
                })

                part.loadCurrentParts();

                expect($.ajax).toHaveBeenCalled();
            });

            it("Wire up loadDiscontinuedParts to fire off an AJAX call", function() {
                // return a fake object with a done function
                spyOn($, 'ajax').and.returnValue({
                    done: function() {}
                });

                part.loadDiscontinuedParts();

                expect($.ajax).toHaveBeenCalled();
            });
        });

        describe("Step 7 - Make a createPartPopup function that inherits utility.createObjectPopup", function() {
            it("Add a createPartPopup function to receivingApp.part", function() {
                expect(receivingApp.part.createPartPopup).toBeDefined();
            });

            var popupObject = null;

            beforeEach(function() {
                popupObject = new receivingApp.part.createPartPopup();
            });

            it("Make createPartPopup's prototype be utility.createObjectPopup", function() {
                expect(receivingApp.utility.createObjectPopup.prototype.isPrototypeOf(popupObject)).toBeTruthy();
            });

            it("Give createPartPopup title and formId properties", function() {
                expect(popupObject.title).toBeDefined();
                expect(popupObject.formId).toBeDefined();
            });

            it("Give createPartPopup a createFunction that can be called from the prototype's code", function() {
                expect(popupObject.createFunction).toBeDefined();
            });

        });

        describe("Step 9 - extract the part list code to it's own object", function() {
            it("Add a currentPartList function to receivingApp.part", function() {
                expect(receivingApp.part.currentPartList).toBeDefined();
            });

            it("Add a discontinuedPartList function to receivingApp.part", function() {
                expect(receivingApp.part.discontinuedPartList).toBeDefined();
            });

            var listObject = null;

            beforeEach(function() {
                listObject = new receivingApp.part.currentPartList();
            });

            it("Reveal a loadGrid function from the currentPartList", function() {
                expect(listObject.loadGrid).toBeDefined();
            });

            it("Make the loadGrid function make an AJAX call to get grid data", function() {
                spyOn($, 'ajax').and.returnValue({
                    done: function() {}
                })

                part.loadCurrentParts();

                expect($.ajax).toHaveBeenCalled();
            });

            it("Make part.initialize() call currentParts.loadGrid()", function() {
                // making a fake currentPartList
                var loadGridSpy = jasmine.createSpy("loadGrid");
                receivingApp.part.currentPartList = function() {
                    this.loadGrid = loadGridSpy;
                };

                // reinitialize the part so it gets the fake
                var part = new receivingApp.part();

                part.initialize();

                expect(loadGridSpy).toHaveBeenCalled();
            })

            it("Reveal a loadGrid function from the currentPartList", function() {
                expect(listObject.loadGrid).toBeDefined();
            });

            it("Make the loadGrid function make an AJAX call to get discontinued grid data", function() {
                spyOn($, 'ajax').and.returnValue({
                    done: function() {}
                })

                part.loadDiscontinuedParts();

                expect($.ajax).toHaveBeenCalled();
            });

            it("Make sure part.initialize() does not call discontinuedParts.loadGrid()", function() {
                // making a fake currentPartList
                var loadGridSpy = jasmine.createSpy("loadGrid");
                receivingApp.part.discontinuedPartList = function() {
                    this.loadGrid = loadGridSpy;
                };

                // reinitialize the part so it gets the fake
                var part = new receivingApp.part();

                part.initialize();

                expect(loadGridSpy).not.toHaveBeenCalled();
            })

        });

    });
});