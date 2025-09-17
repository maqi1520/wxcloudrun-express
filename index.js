const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


async function getAccessToken(appid, appsecret) {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`;
  
  try {
    const response = await axios.get(url);
    console.log('Access Token Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// 获取 access
app.post("/api/get_access_token", async (req, res) => {
  const {appid, appsecret}=req.body

  const token=await getAccessToken(appid,appsecret)
  res.send(token);
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

const port = process.env.PORT || 80;

async function bootstrap() {
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
