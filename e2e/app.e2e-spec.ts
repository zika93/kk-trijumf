import { KkTrijumfPage } from './app.po';

describe('kk-trijumf App', () => {
  let page: KkTrijumfPage;

  beforeEach(() => {
    page = new KkTrijumfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
