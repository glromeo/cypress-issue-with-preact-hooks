context("Spies, Stubs, and Clock", () => {

    it("cy.clock() - control time in the browser", () => {
        // https://on.cypress.io/clock

        // create the date in UTC so it's always the same
        // no matter what local timezone the browser is running in
        const now = new Date(Date.UTC(2017, 2, 14, 0, 0, 0, 0)).getTime();

        cy.clock(now);
        cy.visit("http://localhost:5173/");
        cy.get("#local-time-plain")
            .should("have.text", "00:00:00");
        cy.tick(1000);
        cy.get("#local-time-plain")
            .should("have.text", "00:00:01");
    });

    it("cy.clock() - control time in the browser (raf)", () => {
        // https://on.cypress.io/clock

        // create the date in UTC so it's always the same
        // no matter what local timezone the browser is running in
        const now = new Date(Date.UTC(2017, 2, 14, 0, 0, 0, 0)).getTime();
        cy.clock(now);
        cy.pauseTimers();
        cy.visit("http://localhost:5173/");
        cy.tick(160);
        cy.get("#local-time-raf")
            .should("have.text", "00:00:00");
        cy.tick(1000);
        cy.get("#local-time-raf")
            .should("have.text", "00:00:01");
    });

    it("cy.clock() - control time in the browser (with hooks)", () => {

        const now = new Date(Date.UTC(2017, 2, 14, 0, 0, 0, 0)).getTime();

        cy.clock(now);
        cy.visit("http://localhost:5173/");
        cy.get("#local-time-hooks")
            .should("have.attr", "use-effect")
            .invoke("attr", "use-effect")
            .should("equal", "invoked");
        cy.get("#local-time-hooks")
            .should("have.text", "00:00:00");
        cy.tick(1000);
        cy.get("#local-time-hooks")
            .should("have.text", "00:00:01");
    });
});
