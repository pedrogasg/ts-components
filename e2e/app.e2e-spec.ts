import { TsComponentsPage } from './app.po';

describe('ts-components App', function() {
  let page: TsComponentsPage;

  beforeEach(() => {
    page = new TsComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
