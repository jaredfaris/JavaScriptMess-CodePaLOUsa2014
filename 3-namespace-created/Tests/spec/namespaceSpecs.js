describe("Namespaces", function () {
    it("should have receivingApp defined", function() {
        expect(window.receivingApp).toBeDefined();
    })

    it("should have part defined", function () {
        expect(window.receivingApp.part).toBeDefined();
    });

    it("should have vendor defined", function () {
        expect(window.receivingApp.vendor).toBeDefined();
    });

    it("should have utility defined", function () {
        expect(window.receivingApp.utility).toBeDefined();
    });
});
