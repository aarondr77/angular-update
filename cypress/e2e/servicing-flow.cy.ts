describe('Client Servicing Console — happy path', () => {
  beforeEach(() => {
    cy.login();
  });

  it('navigates login → dashboard → client detail', () => {
    cy.get('[data-testid="client-row-CLT-1001"]').click();
    cy.get('[data-testid="client-detail-page"]').should('be.visible');

    cy.get('.client-detail-header-card.mat-card').should('have.css', 'border-radius', '4px');
    cy.get('[data-testid="client-status-badge"]').should('have.class', 'mat-raised-button');

    cy.get('[data-testid="legacy-sparkline"]').should('be.visible');
  });
});
