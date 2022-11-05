const { changeVersion, pushCode } = require("./utils");
// 获取参数
async function run() {
  const releaseConfig = process.argv.slice(2)[0];
  // 自动修改版本号，默认 master
  // 读取到 package.json 中的版本
  const version = await changeVersion(releaseConfig);
  await pushCode(version);
  // 根据参数修改版本
  // add. commit push

  // 打 tag

  // publish
}

run();
