import { mainPage } from "../../support/page_objects/mainPage";
import { isTestSuiteActive } from "../../support/page_objects/projectConstants";

export const genTest = (type, xcdb) => {
  if (!isTestSuiteActive(type, xcdb)) return;

  describe(`${type.toUpperCase()} api - Table Column`, () => {
    const name = "tablex";
    const colName = "column_name_a";
    const updatedColName = "updated_column_name";
    const randVal = "Test@1234.com";
    const updatedRandVal = "Updated@1234.com";

    before(() => {
      cy.createTable(name);
    });

    // delete table
    after(() => {
      cy.deleteTable(name);
    });

    it("Create Table Column", () => {
      cy.get(`.project-tab:contains(${name}):visible`).should("exist");
      mainPage.addColumn(colName, name);

      cy.get(`th:contains(${colName})`).should("exist");
    });

    // edit the newly created column
    it("Edit table column - change datatype", () => {
      cy.get(`th:contains(${colName}) .mdi-menu-down`)
        .trigger("mouseover", { force: true })
        .click({ force: true });

      cy.get(".nc-column-edit").click();

      // change column type and verify
      cy.get(".nc-ui-dt-dropdown").click();
      cy.contains("LongText").click();
      cy.get(".nc-col-create-or-edit-card").contains("Save").click();

      cy.toastWait("Update table.tablex successful");

      cy.get(`th[data-col="${colName}"] .mdi-text-subject`).should("exist");

      cy.get(`th:contains(${colName}) .mdi-menu-down`)
        .trigger("mouseover", { force: true })
        .click({ force: true });

      cy.get(".nc-column-edit").click();
    });

    // edit the newly created column
    it("Edit table column - rename", () => {
      cy.get(`th:contains(${colName}) .mdi-menu-down`)
        .trigger("mouseover", { force: true })
        .click({ force: true });

      cy.get(".nc-column-edit").click();

      // rename column and verify
      cy.get(".nc-column-name-input input").clear().type(updatedColName);
      cy.get(".nc-col-create-or-edit-card").contains("Save").click();

      cy.toastWait("Update table.tablex successful");

      cy.get(`th:contains(${colName})`).should("not.exist");
      cy.get(`th:contains(${updatedColName})`).should("exist");
    });

    // delete the newly created column
    it("Delete table column", () => {
      cy.get(`th:contains(${updatedColName})`).should("exist");

      cy.get(`th:contains(${updatedColName}) .mdi-menu-down`)
        .trigger("mouseover")
        .click();

      cy.get(".nc-column-delete").click();
      cy.get("button:contains(Confirm)").click();
      cy.toastWait("Update table.tablex successful");

      cy.get(`th:contains(${updatedColName})`).should("not.exist");
    });

    it("Add new row", () => {
      cy.get(".nc-add-new-row-btn:visible").should("exist");
      cy.get(".nc-add-new-row-btn").click({ force: true });
      cy.get("#data-table-form-Title > input").first().type(randVal);
      cy.getActiveModal()
        .find("button")
        .contains("Save Row")
        .click({ force: true });

      cy.toastWait("updated successfully");
      mainPage.getCell("Title", 1).contains(randVal).should("exist");
    });

    it("Update row", () => {
      mainPage.getRow(1).find(".nc-row-expand-icon").click({ force: true });
      cy.get("#data-table-form-Title > input")
        .first()
        .clear()
        .type(updatedRandVal);
      cy.getActiveModal()
        .find("button")
        .contains("Save Row")
        .click({ force: true });

      cy.toastWait("updated successfully");

      mainPage.getCell("Title", 1).contains(randVal).should("not.exist");
      mainPage.getCell("Title", 1).contains(updatedRandVal).should("exist");
    });

    it("Delete row", () => {
      mainPage
        .getCell("Title", 1)
        .contains(updatedRandVal)
        .rightclick({ force: true });

      // delete row
      cy.getActiveMenu()
        .find('.v-list-item:contains("Delete Row")')
        .first()
        .click({ force: true });
      // cy.toastWait('Deleted row successfully')
      cy.get("td").contains(randVal).should("not.exist");
    });
  });
};

/**
 * @copyright Copyright (c) 2021, Xgene Cloud Ltd
 *
 * @author Pranav C Balan <pranavxc@gmail.com>
 * @author Raju Udava <sivadstala@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
