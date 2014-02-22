describe("Step 2 - Namespaces", function () {
    it("Create the base receivingApp 'namespace' object", function() {
        expect(window.receivingApp).toBeDefined();
    });

    it("Create the part object inside of receivingApp", function () {
        expect(window.receivingApp.part).toBeDefined();
    });

    it("Create the vendor object inside of receivingApp", function () {
        expect(window.receivingApp.vendor).toBeDefined();
    });

    it("Create the utility object inside of receivingApp", function () {
        expect(window.receivingApp.utility).toBeDefined();
    });
});
