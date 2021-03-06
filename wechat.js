var wechat = require("wechat");

// 从环境变量中读取数据库配置
const { WECHAT_APPID, WECHAT_encodinAESKey, WECHAT_TOKEN } = process.env;

var config = {
  token: WECHAT_TOKEN,
  appid: WECHAT_APPID,
  encodingAESKey: WECHAT_encodinAESKey,
  checkSignature: false, // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

module.exports = wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.FromUserName === "diaosi") {
    // 回复屌丝(普通回复)
    res.reply("hehe");
  } else if (message.FromUserName === "text") {
    //你也可以这样回复text类型的信息
    res.reply({
      content: "text object",
      type: "text",
    });
  } else if (message.FromUserName === "hehe") {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId",
      },
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: "你来我家接我吧",
        description: "这是女神与高富帅之间的对话",
        picurl: "http://nodeapi.cloudfoundry.com/qrcode.jpg",
        url: "http://nodeapi.cloudfoundry.com/",
      },
    ]);
  }
});
