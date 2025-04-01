class HttpError<T extends Record<string, unknown> = {}> extends Error {
  status: number;
  data: T;

  constructor(status: number, data: T, message: string) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = this.constructor.name;
  }
}
export default HttpError;