const NodeKakao = require("node-kakao");
const { TestUtil } = NodeKakao;

function getRandomDeviceUuid() {
    return TestUtil.randomDeviceUUID();
}

module.exports = { getRandomDeviceUuid };
