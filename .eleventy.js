const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/sitemap.xml": "sitemap.xml" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "updater/version.json": "updater/version.json" });

  eleventyConfig.addGlobalData("release", () => {
    const data = JSON.parse(fs.readFileSync("updater/version.json", "utf8"));
    const published = new Date(data.published_at);
    return {
      ...data,
      monthYear: published.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    htmlTemplateEngine: "njk",
  };
};
