var path = require('path')
var fse = require('fs-extra')
var ExifImage = require('exif').ExifImage;

module.exports = function(inPath, outPath, options) {

  var out = []

  checkPhoto(getPhotos(inPath))

  function checkPhoto(photos) {
    var photo = photos[0]
    photos.shift()

    getExifData(photo, function(err, exif, filePath){
      if (err) throw err
      if (!exif) return checkPhoto(photos)
      
      var date = exif.gps.GPSDateStamp
      if (!date) return checkPhoto(photos)

      var gps = exif.gps
      if (!gps) checkPhoto(photos)

      var lat = gps.GPSLatitude
      var lon = gps.GPSLongitude
      var latRef = gps.GPSLatitudeRef
      var lonRef = gps.GPSLongitudeRef

      var coordinates = formatGPS(lat, latRef, lon, lonRef)

      var date = date.replace(/:/g,"-")
      var gps = coordinates.join(", ")

      var newFilePath = outPath + "/" + date + "/" + gps + "/"
          newFilePath += path.basename(filePath)

      out.push({
        origFile: filePath,
        newFile: newFilePath
      })

      if (!photos.length) {
        return saveFiles(out)
      } else {
        checkPhoto(photos)
      }

    })
  }

  function getPhotos(dir, filelist) {
    var fs = fs || require('fs')
    var files = fs.readdirSync(dir)
    filelist = filelist || []

    files.forEach(function(file) {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = getPhotos(dir + file + '/', filelist)
      }
      else if (isPhoto(file)){
        filelist.push(dir + '/' + file)
      }
    })
    return filelist
  }

  function isPhoto(filename) {
    var ext = path.extname(filename)
    if (ext === ".jpg") return true
    if (ext === ".jpeg") return true
    if (ext === ".gif") return true
    if (ext === ".png") return true
    return false
  }

  function getExifData(file, cb) {
    try {
      new ExifImage({ image : file }, function (error, exifData) {
        if (error)
          cb(error.message)
        else
          cb(null, exifData, file)
      })
    } catch (error) {
      cb(error.message)
    }
  }

  function formatGPS(lat, latRef, lon, lonRef) {
    var ref = {'N': 1, 'E': 1, 'S': -1, 'W': -1};
    lat = (lat[0] + (lat[1] / 60) + (lat[2] / 3600)) * ref[latRef];
    lon = (lon[0] + (lon[1] / 60) + (lon[2] / 3600)) * ref[lonRef];
    return [lat.toFixed(2), lon.toFixed(2)]
    // Alternatively we could use DMS format
    // var coordinates = latitude[0] + " deg "
    //     coordinates += latitude[1] + "' "
    //     coordinates += latitude[2] + '" '
    //     coordinates += latitudeRef + ", "
    //     coordinates += longitude[0] + " deg "
    //     coordinates += longitude[1] + "' "
    //     coordinates += longitude[2] + '" '
    //     coordinates += longitudeRef
    // return coordinates
  }

  function saveFiles(out) {
    for (var i = 0; i < out.length; i++) {
      fse.copy(out[i].origFile, out[i].newFile, function(err){
        if (err) return console.error(err);
      })
    }
    console.log("Success!")
  }
}
