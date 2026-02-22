export async function json(req, res) {
  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }
  try {
    const entireData = JSON.parse(Buffer.concat(buffer).toString());
    req.body = entireData;
  } catch (error) {
    req.body = null;
  }
  res.setHeader("Content-type", "application/json");
}
