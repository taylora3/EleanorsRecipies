const { BlobServiceClient } = require("@azure/storage-blob");

const CONTAINER = "recipes";
const BLOB = "recipes.json";

async function getClient() {
  const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connStr) throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
  const service = BlobServiceClient.fromConnectionString(connStr);
  const container = service.getContainerClient(CONTAINER);
  await container.createIfNotExists();
  return container.getBlockBlobClient(BLOB);
}

module.exports = async function (context, req) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const client = await getClient();

    if (req.method === "GET") {
      const exists = await client.exists();
      if (!exists) {
        context.res = { status: 200, headers, body: "[]" };
        return;
      }
      const download = await client.downloadToBuffer();
      context.res = { status: 200, headers, body: download.toString() };
      return;
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      await client.upload(body, Buffer.byteLength(body), { overwrite: true });
      context.res = { status: 200, headers, body: '{"ok":true}' };
      return;
    }

    context.res = { status: 405, headers, body: '{"error":"Method not allowed"}' };
  } catch (err) {
    context.log.error("API error:", err.message);
    context.res = { status: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
