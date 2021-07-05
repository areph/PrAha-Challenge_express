## サードパーティクッキーについて理解する

### How To

```
docker comopse up
```

docker を立ち上げるとポート番号 `8080` と `8081` で express が起動します。

ngrok を使用して各ポートに対してトンネリングさせてください

```
ngrok http 8080
```

```
ngrok http 8081
```

`index.html` img タグの src をポート `8081` でトンネリングした ngrok のドメイン名に変更してください

```html
<img src="<please set url for ngrok>/file/dog.jpg" alt="" />
```

ポート `8080` にトンネリングした URL にブラウザでアクセスすると 1st,3rd party cookie が保存される Web サイトにアクセスできます。
