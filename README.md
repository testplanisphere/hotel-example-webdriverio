# hotel-example-webdriverio-ja

![webdriverio-ja](https://github.com/testplanisphere/hotel-example-webdriverio-ja/workflows/webdriverio-ja/badge.svg)

このプロジェクトはテスト自動化学習のためのサンプルコードです。

### テスト対象

https://hotel.testplanisphere.dev/ja/

### 概要

#### プログラミング言語

* JavaScript

#### 自動化フレームワーク

* [WebdriverIO](https://webdriver.io/)

#### テスティングフレームワーク

* [Mocha](https://mochajs.org/)

#### ビルドツール

* [npm](https://www.npmjs.com/)

#### 静的解析ツール

* [ESLint](https://eslint.org/)

### 実行方法

#### 必須環境

* Node.js 12
* Google Chrome

#### 依存ライブラリのインストール

```
npm install
```

#### テストの実行

```
npm run test
```

#### 静的解析の実行

```
npm run lint
```

### 変更履歴

#### v2020.6.1 (2020-07-21)

* [#80](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/80) *Security* Bump lodash from 4.17.15 to 4.17.19

#### v2020.6.0 (2020-06-30)

* [#47](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/47) Bump @wdio/local-runner from 6.1.14 to 6.1.16
* [#48](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/48) Bump @wdio/cli from 6.1.15 to 6.1.16
* [#49](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/49) Bump eslint from 7.1.0 to 7.2.0
* [#57](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/57) wait for Ajax complete
* [#59](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/59) Bump moment from 2.26.0 to 2.27.0
* [#62](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/62) Bump eslint from 7.2.0 to 7.3.1
* [#65](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/65) Bump @wdio and others from 6.1.16 to 6.1.22

#### v1.2.0 (2020-05-31)

* [#30](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/30) chromedriverをアップデート、バージョンの自動設定を有効化
* [#31](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/31) Dependabotを導入
* [#32](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/32) Bump moment from 2.24.0 to 2.26.0
* [#33](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/33) Bump wdio-chromedriver-service from 6.0.2 to 6.0.3
* [#34](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/34) Bump @wdio/spec-reporter from 6.0.16 to 6.1.14
* [#35](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/35) Bump @wdio/sync from 6.1.0 to 6.1.14
* [#36](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/36) Bump eslint from 6.8.0 to 7.1.0
* [#38](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/38) Dependabotの設定を変更
* [#39](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/39) Bump @wdio/cli from 6.1.3 to 6.1.15
* [#40](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/40) Bump @wdio/local-runner from 6.1.3 to 6.1.14
* [#41](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/41) Bump @wdio/mocha-framework from 6.1.0 to 6.1.14
* [#43](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/43) Github actions/cacheをv2にアップデート
* [#45](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/45) package-lock.jsonを修正

#### v1.1.0 (2020-04-29)

* [#8](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/8) Github Actionsにpull_requestトリガーを追加
* [#9](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/9) テスト名を修正
* [#11](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/11) ConfirmPageのモーダルを閉じるボタンのセレクターを修正
* [#12](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/12) Github Actionsでのみheadlessモードを有効化
* [#14](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/14) Github ActionsでLintを実行するように修正
* [#15](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/15) READMEの記述内容を変更
* [#18](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/18) cookie削除処理をGlobal Hookへ移動
* [#19](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/19) 連絡手段の変更によるinputの表示切り替えテストを追加
* [#20](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/20) webdriverioをv6.1.3へアップデート
* [#22](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/22) Github ActionsにmacOSとWindowsランナーを追加
* [#25](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/25) テストデータのアドレスをexample.comに修正
* [#26](https://github.com/testplanisphere/hotel-example-webdriverio-ja/pull/26) 日付入力が空の場合のテストを追加

#### v1.0.0 (2020-04-14)

* 正式リリース
