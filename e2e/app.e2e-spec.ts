import { RestauPage } from './app.po';

describe('restau App', () => {
  let page: RestauPage;

  beforeEach(() => {
    page = new RestauPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
