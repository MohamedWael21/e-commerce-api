export default function send(res: ExpressResponse, payload: unknown, status: number = 200) {
  res.status(status).json({
    status: "success",
    data: payload,
  });
}
