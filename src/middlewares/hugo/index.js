const shelljs = require("shelljs")

const hugoBuild = () => {

  let hugoBuildCmdResult = shelljs.exec(`cd static/ && ls -alh . && hugo -b ${process.env.HUGO_BASE_URL}`);
  if (hugoBuildCmdResult.code !== 0) {
    // throw new Error(`{[HugoEpxressMiddleware]} - [hugoBuild(): void] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + hugoBuildCmdResult.stderr + "] ")
    console.log(`{[HugoEpxressMiddleware]} - [hugoBuild(): void] - start hugo build`)
  } else {
    let hugoBuildCmdStdOUT  = hugoBuildCmdResult.stdout;
    hugoBuildCmdStdOUT = hugoBuildCmdStdOUT.trim();
    isThisAResumeRelease = ( tag_id === hugoBuildCmdStdOUT);
    console.log(`{[HugoEpxressMiddleware]} - [hugoBuild(): void] - QUICK DEBUG : [tag_id=[${tag_id}]] [hugoBuildCmdStdOUT=[${hugoBuildCmdStdOUT}]] and [hugoBuildCmdResult.stdout=[${hugoBuildCmdResult.stdout}]]`)
  }
}

const hugoVersion = () => {

  let hugoBuildCmdResult = shelljs.exec(`hugo version`);
  if (hugoBuildCmdResult.code !== 0) {
    // throw new Error(`{[HugoEpxressMiddleware]} - [hugoVersion(): void] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + hugoBuildCmdResult.stderr + "] ")
    console.log(`{[HugoEpxressMiddleware]} - [hugoVersion(): void] - the [${tag_id}] git tag does not exists, so this is not a resume release`)
  } else {
    let hugoBuildCmdStdOUT = hugoBuildCmdResult.stdout;
    hugoBuildCmdStdOUT = hugoBuildCmdStdOUT.trim();
    isThisAResumeRelease = ( tag_id === hugoBuildCmdStdOUT);
    console.log(`{[HugoEpxressMiddleware]} - [hugoVersion(): void] - QUICK DEBUG : [tag_id=[${tag_id}]] [hugoBuildCmdStdOUT=[${hugoBuildCmdStdOUT}]] and [hugoBuildCmdResult.stdout=[${hugoBuildCmdResult.stdout}]]`)
  }
}


const hugoHello = () => {
  console.log(`{[HugoEpxressMiddleware]} - [hugoVersion(): void] - Hello! Iam Hugo the world's best Git-based Headless CMS`)
}

///
module.exports = {
    hugoBuild: hugoBuild,
    hugoVersion: hugoVersion,
    sayHello: hugoHello
};
