describe("Step 3 - Delete Popup", function () {

    it("should be defined", function () {
        expect(window.receivingApp.utility.deletePopup).toBeDefined();
    });

    it("should have an open method", function () {
        expect(window.receivingApp.utility.deletePopup.open).toBeDefined();

    });

    var mockDialog = null;

    beforeEach(function() {
        // create a spy that will return from $(something).dialog()
        mockDialog = jasmine.createSpy('dialog');

        var mock$ = spyOn(window, '$').and.returnValue({
            dialog: mockDialog
        });

        // make the call
        window.receivingApp.utility.deletePopup.open("test", null);
    });

    it("should call jQueryUI dialog when open called", function() {
        expect(mockDialog).toHaveBeenCalled();
    });
});
