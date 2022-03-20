const { DateTime } = require('luxon');
const Image = require("@11ty/eleventy-img")

module.exports = function (eleventyConfig) {
    // Copy the `css` directory to the output
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy("img");
  
    // Watch the `css` directory for changes
    eleventyConfig.addWatchTarget('css');
    eleventyConfig.addWatchTarget('img');

    eleventyConfig.addFilter('readableDate', (dateObj) => {
      return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
        'dd LLL yyyy'
      );
    });

    // --- START, eleventy-img
  function imageShortcode(src, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
    console.log(`Generating image(s) from:  ${src}`)
    let options = {
      widths: [600, 900, 1500],
      formats: ["webp", "jpeg"],
      urlPath: "/img/",
      outputDir: "./_site/img/",
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src)
        const name = path.basename(src, extension)
        return `${name}-${width}w.${format}`
      }
    }

    // generate images
    Image(src, options)

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    }
    // get metadata
    metadata = Image.statsSync(src, options)
    return Image.generateHTML(metadata, imageAttributes)
  }
  eleventyConfig.addShortcode("image", imageShortcode)
  // --- END, eleventy-img
    
  };