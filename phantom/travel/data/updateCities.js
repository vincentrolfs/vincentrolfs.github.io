const CITIES_PATH = "phantom/travel/data/cities.json";
const PCLOUD_PATH = "/home/vincentrolfs/pCloudDrive/Public Folder";
const REDO_ALL = true;

(async () => {
  const fs = await import("node:fs/promises");
  const exec = (await import("node:util")).promisify(
    (await import("child_process")).exec
  );

  const cities = JSON.parse(
    await fs.readFile(CITIES_PATH, { encoding: "utf8" })
  );

  await Promise.all(
    cities.map(async (city) => {
      const pcloudCityPath = `${PCLOUD_PATH}/${city.name}`;
      await fs.mkdir(pcloudCityPath, {
        recursive: true,
      });

      const imageFiles = await fs.readdir(pcloudCityPath);

      if (REDO_ALL) {
        city.images = [];
      }

      await Promise.all(
        imageFiles.map(async (fileName) => {
          if (fileName.startsWith("thumbnail")) {
            return;
          }

          if (city.images.find((img) => img.name === fileName)) {
            return;
          }

          const pcloudImagePath = `${pcloudCityPath}/${fileName}`;
          const pcloudThumbnailPath = `${pcloudCityPath}/thumbnail-${fileName}`;

          // https://legacy.imagemagick.org/Usage/thumbnails/#height
          const createThumbnail = `convert '${pcloudImagePath}' -auto-orient -thumbnail 5000x120 '${pcloudThumbnailPath}'`;
          console.log(createThumbnail);
          await exec(createThumbnail);

          const findDimensions = `identify -format '{"width": %w, "height": %h}' '${pcloudImagePath}'`;
          console.log(findDimensions);
          const dimensions = JSON.parse((await exec(findDimensions)).stdout);

          city.images.push({
            name: fileName,
            ...dimensions,
          });
        })
      );
    })
  );

  const citiesString = JSON.stringify(cities, null, 4);
  await fs.writeFile(CITIES_PATH, citiesString);
  console.log(citiesString);
})();
