exports.chooseValidRoom = async (page) => {
    await page.hover("button#roomOne");
    await page.click("button#roomOne");
};

exports.chooseInvalidRoom = async (page) => {
    await page.hover("button#invalidRoom");
    await page.click("button#invalidRoom");
};
