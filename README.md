# photo-saver

Organize your photos based on exif date and GPS coordinates. 

### CLI

#### Install

```sh
sudo npm install photo-saver -g
```

#### Usage

```sh
photo-saver ./inputDir ./outputDir
```
**Default output directory:** `./out`

### Programatic

#### Install

```sh
npm install photo-saver --save
```

#### Usage

```js
var photoSaver = require("photo-saver")
savePhotos("./in", "./yo")
```
**Default output directory:** `./out`

### Todos

- Add testing
- Add options
- Better CLI

### Contributing

Forks and pull requests are most welcomed.

### License

The MIT License ([MIT](https://gist.githubusercontent.com/montanaflynn/4ce7e31acb71bf9526bc/raw/e4d28fca74188244911ba6befc7a7c039be2ddbd/2014))

Copyright 2014, Montana Flynn (http://anonfunction.com/)