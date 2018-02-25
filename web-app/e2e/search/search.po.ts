import {browser, by, element} from 'protractor';

export class SearchPage {
    navigateTo() {
        return browser.get('/');
    }

    getTripTypeCheck() {
        return element(by.css('input[name=round][type=checkbox]'));
    }

    getFromInput() {
        return element(by.css('input[name=from]'));
    }

    getToInput() {
        return element(by.css('input[name=to]'));
    }

    getDepartureDateInput() {
        return element(by.css('input[name=departuredate][type=text]'));
    }

    getTodayButton() {
        return element(by.css('.picker__today'));
    }

    getOKButton() {
        return element(by.css('.picker__close'));
    }

    getBackDateInput() {
        return element(by.css('input[name=backdate][type=text]'));
    }


    getToListInput() {
        return element.all(by.css('#ulto li'));
    }

    getFromListInput() {
        return element.all(by.css('#ulfrom li'));
    }

    getButtonInput() {
        return element(by.css('button[name=searchA]'));
    }

    getErrorDiv() {
        return element(by.css('div.errormsg'));
    }
}
