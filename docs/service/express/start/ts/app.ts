import createError from 'http-errors' // [!code --]
import express from 'express' // [!code --]
import createError, { HttpError } from 'http-errors' // [!code ++]
import express, { Request, Response, NextFunction } from 'express' // [!code ++]

// ...

app.use(function (err, req, res, next) { // [!code --]
  app.use(function ( // [!code ++]
                     // [!code ++]
    err: HttpError, // [!code ++]
    req: Request, // [!code ++]
    res: Response, // [!code ++]
    next: NextFunction, // [!code ++]
  ) { // [!code ++]
      // ...
  })
