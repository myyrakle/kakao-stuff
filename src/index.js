const NodeKakao = require("node-kakao");
const { createClient } = require("./client");
const { getRandomDeviceUuid } = require("./randomDeviceUuid");

async function main() {
    const deviceUuid = getRandomDeviceUuid();
    const client = createClient(deviceUuid);
}

client.on("message", (chat) => {
    for (let i = 0; i < banWord.length; i++) {
        if (
            JSON.stringify(chat.rawAttachment).includes(banWord[i]) ||
            chat.Text.includes(banWord[i])
        ) {
            chat.hide();
            client.OpenLinkManager.kickMember(chat.channel, chat.sender.id);
            chat.replyText("F - U - C - K - I - N - G - S - P - A - M");
            break;
        }
    }
});
