import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";


export const validateBook = [
    check('title')
        .trim()
        .escape(),
    check('author')
        .trim()
        .escape(),
    check('description')
        .trim()
        .escape()
]