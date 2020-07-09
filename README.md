# Meow Meow World

## http://hottigram.com/meow-meow-world/

就職活動時にポートフォリオとしてAWSで公開していたものを、
通常のレンタルサーバーに移して公開しているものです（AWSはお金がかかるので・・・）。
それに伴いアップロード機能などはなくなりました。

## 概要（AWS公開当時）

- AWSのEC2コンテナにデプロイ(ECSを使用)
- 画像ファイルはAWSのS3に保存
- データベースはAWSのRDSを使用
- Dockerで環境構築
- フロントエンドはReactで構築（ベースイメージはnginx）
- バックエンドはphpで構築（ベースイメージはphp:apache）
