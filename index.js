#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const BALANCE = process.env.SUFFIXES ? process.env.SUFFIXES.split(",") : [];

const getSuffix = (filename) => {
  const result = filename.match(/(\.\w*?)$/);
  return result ? result[0] : null;
};

const removeSuffix = (filename) => {
  return filename.split(".").slice(0, -1).join("");
};

const getIntersection = (...arrs) => {
  return arrs.slice(1).reduce((prev, cur) => {
    return cur.filter((item) => prev.includes(item));
  }, arrs[0]);
};

function correctionPath(root) {
  const tmpFiles = [];
  const suffixGroup = {};
  fs.readdir(root, (err, files) => {
    files.forEach((filename) => {
      const suffix = getSuffix(filename);
      if (suffix && BALANCE.includes(suffix)) {
        const name = filename.substring(0, filename.length - suffix.length);
        suffixGroup[suffix] = suffixGroup[suffix]
          ? suffixGroup[suffix].concat([name])
          : [name];
        tmpFiles.push(filename);
      }
    });
    const completeList = getIntersection(...Object.values(suffixGroup));
    tmpFiles.forEach((file) => {
      if (!completeList.includes(removeSuffix(file))) {
        const sourceNef = path.join(root, file);
        rimraf(sourceNef, () => {
          console.log(`success delete ${sourceNef}`);
        });
      }
    });
  });
}

correctionPath(process.argv[2] || process.cwd());
