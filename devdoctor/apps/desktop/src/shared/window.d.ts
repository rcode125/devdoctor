declare global {
  interface Window {
    devdoctor: {
      runChecks: () => Promise<{
        results: Array<{
          name: string;
          status: "pass" | "warning" | "fail";
          message: string;
          details: string[];
          suggestedFix?: string;
        }>;
        summary: {
          passed: number;
          warnings: number;
          failed: number;
          total: number;
        };
      }>;
    };
  }
}

export {};
