describe('Client Detail — visual regression', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-testid="client-row-CLT-1001"]').click();
    cy.get('[data-testid="client-detail-page"]').should('be.visible');
    cy.get('[data-testid="legacy-sparkline"]').should('be.visible');
  });

  it('matches branded client detail baseline', () => {
    cy.get('.client-detail-page').matchImageSnapshot('client-detail-branded');
  });
});
