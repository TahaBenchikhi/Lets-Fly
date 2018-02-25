import {browser, ExpectedConditions, $} from 'protractor';
import {SearchPage} from './search.po';

describe('search page', () => {
    let page: SearchPage;

    beforeEach(() => {
        page = new SearchPage();
    });

    it('should have a search form', () => {
        page.navigateTo();
        expect(page.getBackDateInput().isPresent()).toBe(false);
        expect(page.getDepartureDateInput().isPresent()).toBe(true);
        expect(page.getFromInput().isPresent()).toBe(true);
        expect(page.getToInput().isPresent()).toBe(true);
        expect(page.getTripTypeCheck().isPresent()).toBe(true);
        expect(page.getButtonInput().isPresent()).toBe(true);
        expect(page.getErrorDiv().isPresent()).toBe(false);
    });

    it('should pick a departure date', () => {
        page.getDepartureDateInput().click().then(() => {
            page.getTodayButton().click().then(() => {
                page.getOKButton().click();
            })
        });
    });

    it('should be able to search: from paris CDG to LAX Today', () => {
        page.navigateTo();

        browser.wait(
          page.getFromInput().sendKeys('CDG')
            ,3000);

        page.getFromListInput().then((items) => {
            items[0].click();
          });
        browser.wait(
          page.getToInput().sendKeys('LAX')
          ,3000);

        page.getToListInput().then((items) => {
            items[0].click();
          });
        
          page.getDepartureDateInput().click().then(() => {
              page.getTodayButton().click().then(() => {
                  page.getOKButton().click();
              })
          });
        browser.sleep(500);
        page.getButtonInput().click();
        browser.wait(ExpectedConditions.urlContains('/result'), 5000);
    });


    it('should NOT be able to search when no destination given', () => {
        page.navigateTo();
        page.getToInput().sendKeys('');
        page.getButtonInput().click();
        expect(browser.getCurrentUrl()).toMatch(/\/$/);
    });

    it('should NOT be able to search when no `from` given', () => {
        page.navigateTo();
        page.getFromInput().sendKeys('');
        page.getButtonInput().click();
        expect(browser.getCurrentUrl()).toMatch(/\/$/);
    });


});
