// src/routes/peoplesoft.ts
import e, { Router, Request, Response, NextFunction } from "express";
import { peopleSoftAdapter } from "../adapters/peoplesoftAdapter";


const router = Router()
/**
 * Simple auth check for mock PeopleSoft routes.
 * Valid tokens are any string starting with "ps-mock-token-",
 * issued by the /login route.
 */

const requirePsAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid Authorization header" });

    }

    const token = authHeader.substring("Bearer ".length).trim();

    const isValidToken = token.startsWith("ps-mock-token-");

    if (!isValidToken) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }

    (req as any).psAuthToken = token;

    next();

}


/**
 * Simulated ping route to mimic connectivity to PeopleSoft.
 * In the future, this will make real HTTP calls, auth, SOAP, etc.
 */

router.get('/ping', async (_req, res, next) => {
    try {
        const result = await peopleSoftAdapter.ping();
        res.json(result);
    } catch (err) {
        next(err);
    }
});

/**
 * Simulated PeopleSoft login.
 * In reality this would talk to PeopleSoft's auth (LDAP/SSO/etc).
 */

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body ?? {};

        if (!username || !password) {
            return res.status(400).json({
                error: "username and password are required"
            })
        }
        const loginResult = await peopleSoftAdapter.login(username, password);

        res.status(200).json({
            message: "Mock PeopleSoft login successful",
            token: loginResult.token,
            expiresIn: loginResult.expiresIn,
            issuedAt: loginResult.issuedAt
        });
    } catch (err) {
        if ((err as any).code === "INVALID_CREDENTIALS") {
            return res.status(401).json({ error: "Invalid PeopleSoft credentials" })
        }
        next(err)
    }

})

/**
 * Protected mock endpoint: get employee by ID.
 * Requires Authorization: Bearer <token> from /login.
 */

router.get('/employees/:id', requirePsAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const token = (req as any).psAuthToken as string;

            const employee = await peopleSoftAdapter.getEmployeeById(id, token);

            res.json({
                ...employee,
                requestedAt: new Date().toISOString(),
                usedtoken: token
            });
        } catch (err) {
            next(err)
        }
    })

export default router