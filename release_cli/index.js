const { changeVersion, pushCode, tagVersion, publishPackage } = require("./utils");

// 获取参数
async function run() {
  let version;
  const releaseConfig = process.argv.slice(2)[0];
  const _version = await changeVersion(releaseConfig);
  version = _version;
  await pushCode(version);
  await tagVersion(version);
  await publishPackage(version);
}

run();
