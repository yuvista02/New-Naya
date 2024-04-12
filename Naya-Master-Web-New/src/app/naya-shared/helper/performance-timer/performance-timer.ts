/**
 * PerformanceTimer is a wrapper class for perfomance api measuring the execution time of code blocks.
 * # Usage example:
 * ```ts
 * const performanceTimer: PerformanceTimer = PerformanceTimer.start();
 * 
 * // code to execute
 * 
 * const elapsedTime: number = performanceTimer.getElapsedTime();
 * 
 * console.log(`Elapsed time: ${elapsedTime} milliseconds`);
 * ```
 */
export class PerformanceTimer {
    private startTimestamp: number;

    private constructor() {
        this.startTimestamp = performance.now();
    }

    static start(): PerformanceTimer {
        return new PerformanceTimer();
    }

    getElapsedTime(): number {
        const endTimestamp = performance.now();
        const elapsedTime = endTimestamp - this.startTimestamp;
        return elapsedTime;
    }
}
