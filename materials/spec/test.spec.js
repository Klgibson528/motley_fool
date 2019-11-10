$(function () {
    describe("recommendations", function () {
        it("removes duplicates", function () {
            expect(data).toBeDefined();
            expect(data.length).not.toBe(0);
        });
    });

    describe("fooltracker", function () {
        it("creates an instance of the class FoolTracker", function () {
            expect('fool').toBeInstanceOf('FoolTracker');
        });
    });


});

// This is as far as I got without being able to run the tests to see what was working. 
// Wanted to test each function individually
