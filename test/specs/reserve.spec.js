const DateTime = require('luxon').DateTime;
const ConfirmPage = require('../pageobjects/confirm.page');
const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const PlansPage = require('../pageobjects/plans.page');
const ReservePage = require('../pageobjects/reserve.page');
const RoomPage = require('../pageobjects/room.page');
const TopPage = require('../pageobjects/top.page');

describe('宿泊予約', () => {
  afterEach(() => {
    if (browser.getWindowHandles().length > 1) {
      browser.closeWindow();
    }
    browser.switchWindow(/^宿泊プラン一覧.+$/);
  });

  it('画面表示時の初期値が設定されていること_未ログイン' , () => {
    TopPage.open();
    TopPage.goToPlansPage();
    PlansPage.openPlanByTitle('お得な特典付きプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    const tomorrow = DateTime.local().plus({ days: 1 }).toFormat('yyyy/LL/dd');

    expect(ReservePage.planName).toHaveText('お得な特典付きプラン');
    expect(ReservePage.reserveDate).toHaveValue(tomorrow);
    expect(ReservePage.reserveTerm).toHaveValue('1');
    expect(ReservePage.headCount).toHaveValue('1');
    expect(ReservePage.email).not.toBeDisplayed();
    expect(ReservePage.tel).not.toBeDisplayed();
    ReservePage.contact.selectByVisibleText('メールでのご連絡');
    expect(ReservePage.email).toBeDisplayed();
    expect(ReservePage.tel).not.toBeDisplayed();
    expect(ReservePage.email).toHaveValue('');
    ReservePage.contact.selectByVisibleText('電話でのご連絡');
    expect(ReservePage.email).not.toBeDisplayed();
    expect(ReservePage.tel).toBeDisplayed();
    expect(ReservePage.tel).toHaveValue('');

    browser.switchToFrame(ReservePage.roomFrame);
    expect(RoomPage.header).toHaveText('スタンダードツイン');
    browser.switchToFrame(null);
  });

  it('画面表示時の初期値が設定されていること_ログイン済み' , () => {
    TopPage.open();
    TopPage.goToLoginPage();
    LoginPage.email.setValue('ichiro@example.com');
    LoginPage.password.setValue('password');
    LoginPage.submit();
    MyPage.goToPlansPage();
    PlansPage.openPlanByTitle('プレミアムプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    const tomorrow = DateTime.local().plus({ days: 1 }).toFormat('yyyy/LL/dd');

    expect(ReservePage.planName).toHaveText('プレミアムプラン');
    expect(ReservePage.reserveDate).toHaveValue(tomorrow);
    expect(ReservePage.reserveTerm).toHaveValue('1');
    expect(ReservePage.headCount).toHaveValue('2');
    expect(ReservePage.username).toHaveValue('山田一郎');
    expect(ReservePage.email).not.toBeDisplayed();
    expect(ReservePage.tel).not.toBeDisplayed();
    ReservePage.contact.selectByVisibleText('メールでのご連絡');
    expect(ReservePage.email).toBeDisplayed();
    expect(ReservePage.tel).not.toBeDisplayed();
    expect(ReservePage.email).toHaveValue('ichiro@example.com');
    ReservePage.contact.selectByVisibleText('電話でのご連絡');
    expect(ReservePage.email).not.toBeDisplayed();
    expect(ReservePage.tel).toBeDisplayed();
    expect(ReservePage.tel).toHaveValue('01234567891');

    browser.switchToFrame(ReservePage.roomFrame);
    expect(RoomPage.header).toHaveText('プレミアムツイン');
    browser.switchToFrame(null);
  });

  it('入力値が空白でエラーとなること' , () => {
    TopPage.open();
    TopPage.goToPlansPage();
    PlansPage.openPlanByTitle('お得な特典付きプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    ReservePage.setReserveDate('');
    ReservePage.reserveTerm.setValue('');
    ReservePage.headCount.setValue('');
    ReservePage.username.setValue('テスト太郎');  // フォーカス移動

    expect(ReservePage.reserveDateMessage).toHaveText('このフィールドを入力してください。');
    expect(ReservePage.reserveTermMessage).toHaveText('このフィールドを入力してください。');
    expect(ReservePage.headCountMessage).toHaveText('このフィールドを入力してください。');
  });

  it('不正な入力値でエラーとなること_小' , () => {
    TopPage.open();
    TopPage.goToPlansPage();
    PlansPage.openPlanByTitle('お得な特典付きプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    const today = DateTime.local().toFormat('yyyy/LL/dd');

    ReservePage.setReserveDate(today);
    ReservePage.reserveTerm.setValue('0');
    ReservePage.headCount.setValue('0');
    ReservePage.username.setValue('テスト太郎');  // フォーカス移動

    expect(ReservePage.reserveDateMessage).toHaveText('翌日以降の日付を入力してください。');
    expect(ReservePage.reserveTermMessage).toHaveText('1以上の値を入力してください。');
    expect(ReservePage.headCountMessage).toHaveText('1以上の値を入力してください。');
  });

  it('不正な入力値でエラーとなること_大' , () => {
    TopPage.open();
    TopPage.goToPlansPage();
    PlansPage.openPlanByTitle('お得な特典付きプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    const after90 = DateTime.local().plus({ days: 91 }).toFormat('yyyy/LL/dd');

    ReservePage.setReserveDate(after90);
    ReservePage.reserveTerm.setValue('10');
    ReservePage.headCount.setValue('10');
    ReservePage.username.setValue('テスト太郎');  // フォーカス移動

    expect(ReservePage.reserveDateMessage).toHaveText('3ヶ月以内の日付を入力してください。');
    expect(ReservePage.reserveTermMessage).toHaveText('9以下の値を入力してください。');
    expect(ReservePage.headCountMessage).toHaveText('9以下の値を入力してください。');
  });

  it('不正な入力値でエラーとなること_文字列' , () => {
    TopPage.open();
    TopPage.goToPlansPage();
    PlansPage.openPlanByTitle('お得な特典付きプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    ReservePage.setReserveDate('12/3//345');
    ReservePage.reserveTerm.setValue('a');  // 入力できない
    ReservePage.headCount.setValue('a');  // 入力できない
    ReservePage.username.setValue('テスト太郎');  // フォーカス移動

    expect(ReservePage.reserveDateMessage).toHaveText('有効な値を入力してください。');
    expect(ReservePage.reserveTermMessage).toHaveText('このフィールドを入力してください。');
    expect(ReservePage.headCountMessage).toHaveText('このフィールドを入力してください。');
  });

  it('不正な入力値でエラーとなること_確定時_メール選択' , () => {
    TopPage.open();
    TopPage.goToPlansPage();
    PlansPage.openPlanByTitle('お得な特典付きプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    ReservePage.username.setValue('');
    ReservePage.contact.selectByVisibleText('メールでのご連絡');
    ReservePage.email.setValue('');
    ReservePage.submit();

    expect(ReservePage.usernameMessage).toHaveText('このフィールドを入力してください。');
    expect(ReservePage.emailMessage).toHaveText('このフィールドを入力してください。');
  });

  it('不正な入力値でエラーとなること_確定時_電話選択' , () => {
    TopPage.open();
    TopPage.goToPlansPage();
    PlansPage.openPlanByTitle('お得な特典付きプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    ReservePage.username.setValue('');
    ReservePage.contact.selectByVisibleText('電話でのご連絡');
    ReservePage.tel.setValue('');
    ReservePage.submit();

    expect(ReservePage.usernameMessage).toHaveText('このフィールドを入力してください。');
    expect(ReservePage.telMessage).toHaveText('このフィールドを入力してください。');
  });

  it('宿泊予約が完了すること_未ログイン_初期値' , () => {
    TopPage.open();
    TopPage.goToPlansPage();
    PlansPage.openPlanByTitle('お得な特典付きプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    const expectedStart = DateTime.local().plus({ days: 1 });
    const expectedEnd = DateTime.local().plus({ days: 2 });
    let expectedTotalBill;
    if (expectedStart.weekday === 6 || expectedStart.weekday === 7) {
      expectedTotalBill = '合計 8,750円（税込み）';
    } else {
      expectedTotalBill = '合計 7,000円（税込み）';
    }
    const expectedTerm = `${expectedStart.toFormat('yyyy年L月d日')} 〜 ${expectedEnd.toFormat('yyyy年L月d日')} 1泊`

    ReservePage.username.setValue('テスト太郎');
    ReservePage.contact.selectByVisibleText('希望しない');
    ReservePage.submit();

    expect(ConfirmPage.totalBill).toHaveText(expectedTotalBill);
    expect(ConfirmPage.planName).toHaveText('お得な特典付きプラン');
    expect(ConfirmPage.term).toHaveText(expectedTerm);
    expect(ConfirmPage.headCount).toHaveText('1名様');
    expect(ConfirmPage.plans).toHaveText('なし');
    expect(ConfirmPage.username).toHaveText('テスト太郎様');
    expect(ConfirmPage.contact).toHaveText('希望しない');
    expect(ConfirmPage.comment).toHaveText('なし');

    ConfirmPage.confirm();
    expect(ConfirmPage.modalMessage).toHaveText('ご来館、心よりお待ちしております。');
    ConfirmPage.close();
    expect(browser.waitUntil(() => browser.getWindowHandles().length === 1)).toBeTruthy();
  });

  it('宿泊予約が完了すること_ログイン' , () => {
    TopPage.open();
    TopPage.goToLoginPage();
    LoginPage.email.setValue('ichiro@example.com');
    LoginPage.password.setValue('password');
    LoginPage.submit();
    MyPage.goToPlansPage();
    PlansPage.openPlanByTitle('プレミアムプラン');
    browser.switchWindow(/^宿泊予約.+$/);
    ReservePage.submitButton.waitForClickable();

    const expectedStart = DateTime.local().plus({ days: 90 });
    const expectedEnd = DateTime.local().plus({ days: 92 });
    let expectedTotalBill;
    if (expectedStart.weekday === 6) {
      expectedTotalBill = '合計 112,000円（税込み）';
    } else if (expectedStart.weekday === 5 || expectedStart.weekday === 7) {
      expectedTotalBill = '合計 102,000円（税込み）';
    } else {
      expectedTotalBill = '合計 92,000円（税込み）';
    }
    const expectedTerm = `${expectedStart.toFormat('yyyy年L月d日')} 〜 ${expectedEnd.toFormat('yyyy年L月d日')} 2泊`

    ReservePage.reserveTerm.setValue('2');
    ReservePage.headCount.setValue('4');
    ReservePage.setBreakfastPlan(true);
    ReservePage.setEarlyCheckInPlan(true);
    ReservePage.setSightseeingPlan(false);
    ReservePage.contact.selectByVisibleText('メールでのご連絡');
    ReservePage.comment.setValue('あああ\n\nいいいいいいい\nうう');
    ReservePage.reserveDate.setValue(expectedStart.toFormat('yyyy/LL/dd'));
    ReservePage.submit();

    expect(ConfirmPage.totalBill).toHaveText(expectedTotalBill);
    expect(ConfirmPage.planName).toHaveText('プレミアムプラン');
    expect(ConfirmPage.term).toHaveText(expectedTerm);
    expect(ConfirmPage.headCount).toHaveText('4名様');
    expect(ConfirmPage.plans).toHaveTextContaining('朝食バイキング');
    expect(ConfirmPage.plans).toHaveTextContaining('昼からチェックインプラン');
    expect(ConfirmPage.plans).not.toHaveTextContaining('お得な観光プラン');
    expect(ConfirmPage.username).toHaveText('山田一郎様');
    expect(ConfirmPage.contact).toHaveText('メール：ichiro@example.com');
    expect(ConfirmPage.comment).toHaveText('あああ\n\nいいいいいいい\nうう');

    ConfirmPage.confirm();
    expect(ConfirmPage.modalMessage).toHaveText('ご来館、心よりお待ちしております。');
    ConfirmPage.close();
    expect(browser.waitUntil(() => browser.getWindowHandles().length === 1)).toBeTruthy();
  });
});
