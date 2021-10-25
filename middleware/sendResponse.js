function sendResponse(req, res, option) {
  const headers = req.headers;
  res
    .writeHead(option["statusCode"], option["statusText"], {
      "Access-Control-Allow-Origin": headers.origin,
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Credentials",
      "Content-Type": "application/json",
    })
    .end(JSON.stringify(option["message"]));
}

export default sendResponse;
