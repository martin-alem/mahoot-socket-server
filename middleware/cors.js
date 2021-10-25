function cors(req, res) {
  const method = req.method;
  const headers = req.headers;

  if (method === "OPTIONS") {
    res
      .writeHead(204, "OK", {
        Connection: "Keep-alive",
        "Access-Control-Allow-Origin": headers.origin,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": 86400,
      })
      .end();
  }
}

export default cors;
