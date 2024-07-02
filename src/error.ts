// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Meta = { [key: string]: any } | Error

export class AppError extends Error {
    constructor(public message: string, public statusCode: number, public meta?: Meta) {
        super(message)
        this.meta = meta
        this.statusCode = statusCode
    }

    addMeta = (meta: Meta) => {
        this.meta = this.meta ? { ...this.meta, ...meta } : meta
    }
}
