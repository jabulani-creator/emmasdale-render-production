import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../server.ts";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware that takes a Zod schema and validates the request body against it.
 * If validation fails, it immediately returns a 400 Bad Request with the formatted errors.
 */
export const validateBody = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // Parse the request body using the provided Zod schema
    req.body = schema.parse(req.body);
    next();
  } catch (error: any) {
    logger.error({ msg: "validateBody caught error:", hasErrors: !!error.errors, hasIssues: !!error.issues });
    if (error instanceof z.ZodError) {
      // Use issues if errors is not available (some Zod versions/configurations)
      const errorList = error.errors || error.issues || [];
      
      // Map Zod errors to a clean format
      const formattedErrors = errorList.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      
      logger.warn({ msg: "Validation failed", errors: formattedErrors, ip: req.ip });

      const errorMessage = formattedErrors.length > 0 ? formattedErrors[0].message : "Invalid request data";

      // IMPORTANT: DO NOT call next(error) here, otherwise express-async-errors will catch it 
      // and send it to the global error handler which causes a crash.
      // We must terminate the request directly here.
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: errorMessage,
        errors: formattedErrors,
      });
      return;
    }
    
    // If it's not a Zod error, pass it to the global error handler
    next(error);
  }
};
