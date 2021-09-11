async function login(client, email, password) {
    try {
        const response = await client.login(email, password);
        console.log("## 로그인 성공");
    } catch (error) {
        if (error.status === node_kakao.AuthStatusCode.DEVICE_NOT_REGISTERED) {
            const requestPasscodeRes = await client.Auth.requestPasscode(
                email,
                password,
                true
            );
            if (requestPasscodeRes.status === node_kakao.StatusCode.SUCCESS) {
                console.error(
                    "[Error - login] - 인증이 필요합니다. 인증번호를 요청했으니 입력해주세요."
                );
                const readline = require("readline");
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                rl.question("인증코드: ", async (passcode) => {
                    const registerDeviceRes = await client.Auth.registerDevice(
                        passcode,
                        email,
                        password,
                        true
                    );
                    if (
                        registerDeviceRes.status ===
                        node_kakao.StatusCode.SUCCESS
                    ) {
                        console.log(
                            "[Log - login] 인증이 완료되었습니다. 스크립트를 다시 실행해주세요."
                        );
                        process.exit();
                    } else {
                        console.error(
                            `[Error - login] - 인증을 하는 과정에서 오류가 발생했습니다. 오류 JSON: ${JSON.stringify(
                                registerDeviceRes,
                                null,
                                2
                            )}`
                        );
                        process.exit();
                    }
                });
            } else {
                console.error(
                    `[Error - login] - 인증이 필요하여 인증번호를 요청하는 과정에서 오류가 발생했습니다. 오류 JSON: ${JSON.stringify(
                        requestPasscodeRes,
                        null,
                        2
                    )}`
                );
                process.exit();
            }
        } else {
            console.error(
                `[Error - login] - 로그인을 하는 과정에서 오류가 발생했습니다. 오류 JSON: ${JSON.stringify(
                    error,
                    null,
                    2
                )}`
            );
            process.exit();
        }
    }
}

module.exports = { login };
