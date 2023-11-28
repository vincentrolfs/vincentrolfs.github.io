import { exec as execRaw } from "node:child_process";
import fs from "node:fs/promises";
import { promisify } from "node:util";
import {
  asyncMap,
  getPcloudVisitPath,
  loadTravelData,
  writeTravelData,
} from "./utils.mjs";

const exec = promisify(execRaw);

const REDO_ALL = !!process.env.REDO_ALL;

(async () => {
  const travelData = await loadTravelData();

  await asyncMap(travelData, async (visit) => {
    if (!visit.tag) {
      visit.tag = `${visit.from}_${visit.name.split(/\s+/)[0].toLowerCase()}`;
    }

    const pcloudVisitPath = getPcloudVisitPath(visit);

    await fs.mkdir(pcloudVisitPath, {
      recursive: true,
    });

    const imageFiles = await fs.readdir(pcloudVisitPath);

    if (REDO_ALL) {
      visit.images = [];
    }

    await asyncMap(imageFiles, async (fileName) => {
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

      const findDimensions = `convert -auto-orient -format '{"width": %w, "height": %h}' '${pcloudImagePath}' info:`;
      console.log(findDimensions);
      const dimensions = JSON.parse((await exec(findDimensions)).stdout);

      visit.images.push({
        name: fileName,
        ...dimensions,
      });
    });
  });

  console.log("writing...");
  await writeTravelData(travelData);
  console.log("writing... done.");
})();
