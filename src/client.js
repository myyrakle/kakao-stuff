const NodeKakao = require("node-kakao");

function createClient(deviceUuid) {
    const client = new NodeKakao.TalkClient("foobar", deviceUuid);

    return client;
}

module.exports = { createClient };
