interface ErrorLog {
  timestamp: Date;
  error: Error;
  context: string;
  metadata?: Record<string, any>;
}

export class ErrorTracker {
  private static logs: ErrorLog[] = [];
  private static readonly MAX_LOGS = 100;

  static trackError(error: Error, context: string, metadata?: Record<string, any>) {
    const log: ErrorLog = {
      timestamp: new Date(),
      error,
      context,
      metadata
    };

    this.logs.unshift(log);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    // Send to monitoring service if in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(log);
    }

    console.error(`[${context}]`, error, metadata);
  }

  private static async sendToMonitoring(log: ErrorLog) {
    // Implement your monitoring service integration here
    // Example: Sentry, LogRocket, etc.
  }

  static getLogs() {
    return this.logs;
  }

  static clear() {
    this.logs = [];
  }
} 