const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const packageJson = fs.readFileSync(packageJsonPath, "utf8");

const getVersion = async () => {
  const { version } = JSON.parse(packageJson);
  return version;
};

const getNewVersion = async (config) => {
  const preVersion = await getVersion();
  const semverArr = preVersion.split(".");
  let [major, minor, patch] = semverArr;
  switch (config) {
    case "major":
      major = Number(major) + 1;
      minor = 0;
      patch = 0;
      break;
    case "minor":
      minor = Number(minor) + 1;
      patch = 0;
      break;
    case "patch":
      patch = Number(patch) + 1;
      break;
  }
  return [major, minor, patch].join(".");
};

const changeVersion = async (config) => {
  const preVersion = await getVersion();
  const newVersion = await getNewVersion(config);
  const newPackageJson = packageJson.replace(
    `"version": "${preVersion}"`,
    `"version": "${newVersion}"`
  );
  fs.writeFileSync(packageJsonPath, newPackageJson, (err) => {
    if (err) {
      console.error("修改版本号失败", err);
      process.exit(1);
    }
  });
  console.log(`---------- 修改版本号为：${newVersion} ----------`);
  return newVersion;
};

const step = (command) => {
  return new Promise((resolve, reject) => {
    const childExec = exec(
      command.join(" && "),
      { maxBuffer: 10000 * 10240 },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
          throw err;
        } else {
          resolve("");
        }
      }
    );
    childExec.stdout?.pipe(process.stdout);
    childExec.stderr?.pipe(process.stderr);
  });
};

const pushCode = async (version) => {
  const command = [
    "git add .",
    `git commit -m "feat: update version ${version}"`,
    "git push origin master",
  ];
  await step(command);
  console.log(`---------- 推送代码到仓库 ----------`);
  return version;
};

const tagVersion = async (version) => {
  const command = [`git tag v${version}`, "git push --tag"];
  await step(command);
  console.log(`---------- 推送 tag 版本到仓库 ----------`);
  return version;
};

const publishPackage = async (version) => {
  const command = ["npm publish"];
  await step(command);
  console.log(`---------- 推送包v${version}到 npm ----------`);
};

module.exports = {
  getVersion,
  changeVersion,
  pushCode,
  tagVersion,
  publishPackage,
};
