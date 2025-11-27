// src/adapters/peoplesoftAdapter.ts
import { config } from "../config";
import { logger } from "../utils/logger";

export interface PeopleSoftEmployee {
    employeeId: string;
    firstName: string;
    lastName: string;
    department: string;
    jobTitle: string;
    status: string;
    sourceSystem: string;
    mocked: boolean;
}

export class PeopleSoftAdapter {
    private baseUrl: string;
    private username: string;
    private password: string;

    constructor() {
        this.baseUrl = config.PEOPLESOFT_BASE_URL
        this.username = config.PEOPLESOFT_USERNAME
        this.password = config.PEOPLESOFT_PASSWORD

        logger.info(
            `PeopleSoftAdapter initialized with baseUrl=${this.baseUrl}`
        );
    }

    /**
   * Simulated connectivity check to PeopleSoft.
   * Later: make a real HTTP call to PeopleSoft.
   */
    async ping() {
        logger.debug("PeopleSoftAdapter.ping called")

        const result = {
            message: "Mock PeopleSoft API reachable",
            peoplesoftUrl: this.baseUrl,
            timeStamp: new Date().toISOString()
        }

        logger.debug(`PeopleSoftAdapter.ping returning: ${JSON.stringify(result)}`)

        return result;
    }

    /**
  * Simulated PeopleSoft login.
  * Later: replace with real PeopleSoft auth (SSO/LDAP/etc.).
  */

    async login(username: string, password: string): Promise<{
        token: string;
        expiresIn: number;
        issuedAt: string;
    }> {

        logger.info(
            `PeopleSoftAdapter.login called for username=${username}`
        );

        const isValid = username === this.username && password === this.password;

        if (!isValid) {
            logger.warn(
                `PeopleSoftAdapter.login failed for username=${username}`
            );

            const error = new Error("INVALID_CREDENTIALS");
            (error as any).code = "INVALID_CREDENTIALS";
            throw error;
        }

        const fakeToken = `ps-mock-token-${Date.now()}`;
        const expiresInSeconds = 60 * 30; // 30 minutes

        logger.info(
            `PeopleSoftAdapter.login succeeded for username=${username}, token=${fakeToken}`
        );

        return {
            token: fakeToken,
            expiresIn: expiresInSeconds,
            issuedAt: new Date().toISOString()
        };

    }

    /**
   * Simulated "get employee" call.
   * In a real version, you would call PeopleSoft APIs here using the token.
   */

    async getEmployeeById(id: string, token: string): Promise<PeopleSoftEmployee> {
        // token not used yet, but it's here for when I wire in real PeopleSoft
        logger.debug(
            `PeopleSoftAdapter.getEmployeeById called for id=${id}, token=${token}`
        );

        const employee: PeopleSoftEmployee = {
            employeeId: id,
            firstName: "Jane",
            lastName: "Doe",
            department: "FIN_AP",
            jobTitle: "Accounts Payable Analyst",
            status: "ACTIVE",
            sourceSystem: "PeopleSoft",
            mocked: true
        };

        logger.debug(
            `PeopleSoftAdapter.getEmployeeById returning: ${JSON.stringify(
                employee
            )}`
        );

        return employee
    }
}

export const peopleSoftAdapter = new PeopleSoftAdapter();