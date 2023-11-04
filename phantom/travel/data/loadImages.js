const TRAVEL_JSON_PATH = "phantom/travel/data/travel.json";
const PCLOUD_PATH =
  "/home/vincentrolfs/pCloudDrive/Public Folder/travel-images";
const REDO_ALL = false;

(async () => {
  const fs = await import("node:fs/promises");
  const exec = (await import("node:util")).promisify(
    (await import("child_process")).exec
  );

  const travel = JSON.parse(
    await fs.readFile(TRAVEL_JSON_PATH, { encoding: "utf8" })
  );

  await Promise.all(
    travel.map(async (visit) => {
      if (!visit.tag) {
        visit.tag = `${visit.from}_${visit.name.split(/\s+/)[0].toLowerCase()}`;
      }

      const pcloudVisitPath = `${PCLOUD_PATH}/${visit.tag}`;

      await fs.mkdir(pcloudVisitPath, {
        recursive: true,
      });

      const imageFiles = await fs.readdir(pcloudVisitPath);

      if (REDO_ALL) {
        visit.images = [];
      }

      await Promise.all(
        imageFiles.map(async (fileName) => {
          if (fileName.startsWith("thumbnail")) {
            return;
          }

          if (fileName.endsWith(".mp4")) {
            return;
          }

          if (fileName.endsWith(".mov")) {
            return;
          }

          if (visit.images.find((img) => img.name === fileName)) {
            return;
          }

          const pcloudImagePath = `${pcloudVisitPath}/${fileName}`;
          const pcloudThumbnailPath = `${pcloudVisitPath}/thumbnail-${fileName}`;

          // https://legacy.imagemagick.org/Usage/thumbnails/#height
          const createThumbnail = `convert '${pcloudImagePath}' -auto-orient -thumbnail 5000x120 '${pcloudThumbnailPath}'`;
          console.log(createThumbnail);
          await exec(createThumbnail);

          const findDimensions = `identify -format '{"width": %w, "height": %h}' '${pcloudImagePath}'`;
          console.log(findDimensions);
          const dimensions = JSON.parse((await exec(findDimensions)).stdout);

          visit.images.push({
            name: fileName,
            ...dimensions,
          });
        })
      );
    })
  );

  function comp(a, b) {
    if (a < b) {
      return 1;
    }

    if (a > b) {
      return -1;
    }

    return 0;
  }

  travel.sort((a, b) => comp(a.from, b.from));

  const travelString = JSON.stringify(travel, null, 4);
  await fs.writeFile(TRAVEL_JSON_PATH, travelString);
})();
