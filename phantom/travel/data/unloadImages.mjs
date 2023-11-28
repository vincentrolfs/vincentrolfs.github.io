import fs from "node:fs/promises";
import {
  asyncMap,
  deleteFileIfExists,
  getPcloudVisitPath,
  loadTravelData,
  writeTravelData,
} from "./utils.mjs";

const ACTUAL_DELETE = !!process.env.ACTUAL_DELETE;

(async () => {
  const travelData = await loadTravelData();
  let deletePaths = [];

  await asyncMap(travelData, async (visit) => {
    if (!visit.tag || !visit.images) {
      console.log("skipping", visit);
      return;
    }

    const pcloudVisitPath = getPcloudVisitPath(visit);
    const imageFiles = await fs.readdir(pcloudVisitPath);

    visit.images = visit.images.filter(({ name }) => {
      if (imageFiles.find((actual) => actual === name)) {
        return true;
      }

      console.log("missing", `${pcloudVisitPath}/${name}`);

      deletePaths = deletePaths.concat([
        `${pcloudVisitPath}/${name}`,
        `${pcloudVisitPath}/thumbnail-${name}`,
      ]);

      return false;
    });
  });

  console.log("");

  if (deletePaths.length > 0) {
    console.log("to delete:");
    deletePaths.forEach((p) => console.log(p));
    console.log("");

    if (ACTUAL_DELETE) {
      await asyncMap(deletePaths, async (path) => {
        console.log(`deleting ${path}...`);
        await deleteFileIfExists(path);
        console.log(`deleting ${path}... done.`);
      });

      console.log("writing...");
      await writeTravelData(travelData);
      console.log("writing... done.");
    }
  } else {
    console.log("nothing to do.");
  }
})();
