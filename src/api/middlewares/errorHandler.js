import { STATUS_CODE } from '../../common/constants.js'

export const errorHandler = (error, req, res, _) => {
  console.log('ERROR HANDLER', error)

  const response = {
    success: false,
    message: error.message,
  }

  res
    .status(error.statusCode ? error.statusCode : STATUS_CODE.INT_SERV_ERROR)
    .send(response)
}

export const genError = (code, message) => {
  const err = new Error
  Object.assign(err, {
    statusCode: code,
    message,
  })
  return err
}