# photo-saver

Organize your photos based on exif date and GPS coordinates. 

### Usage

This simple tool takes two arguments, an input directory and an output directory. The input directory should be a folder with photos that have exif data. The output directory is where you want the organized files to end up. Of course your original files are left alone.

**Default output directory:** `./out`

#### CLI

```sh
sudo npm install photo-saver -g
```

```sh
photo-saver ./inputDir ./outputDir
```

#### Programatic

```sh
npm install photo-saver --save
```

```js
var photoSaver = require("photo-saver")
savePhotos("./photos", "./organized")
```

### Example

Here's an example of the output folder structure:

```
out/ # output directory name
  2013-06-14/ # directory is the date when photo was taken
    51.50, 0.01/ # directory is GPS coordinates where photo was taken
    51.50, 0.05/ 
  2013-06-15/
    51.52, 0.11/
    51.52, 0.09/
    51.52, 0.07/
```

### Todos

- Better CLI
- Add testing
- Add various options
- Use my reverse-geocoding API to get human readable location.

### Contributing

Forks and pull requests are most welcomed.

### License

The MIT License ([MIT](https://gist.githubusercontent.com/montanaflynn/4ce7e31acb71bf9526bc/raw/e4d28fca74188244911ba6befc7a7c039be2ddbd/2014))

Copyright 2014, Montana Flynn (http://anonfunction.com/)