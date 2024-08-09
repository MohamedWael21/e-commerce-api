export const catchAsyncError = (handleFunc: AsyncRequestHandler) => (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  Promise.resolve(handleFunc(req, res, next)).catch(next);
};
