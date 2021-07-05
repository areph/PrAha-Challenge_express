## サードパーティクッキーについて理解する

### How To

```
docker comopse up
```
dockerを立ち上げるとポート番号 `8080` と `8081` でexpressが起動します。

ngrokを使用して各ポートに対してトンネリングさせてください

```
ngrok http 8080
```

```
ngrok http 8081
```

`index.html` imgタグのsrcをポート `8081` でトンネリングしたngrokのドメイン名に変更してください

```html
<img src="<please set url for ngrok>/file/dog.jpg" alt="">
```

ポート `8080` にトンネリングしたURLにブラウザでアクセスすると1st,3rd party cookieが保存されるWebサイトにアクセスできます。