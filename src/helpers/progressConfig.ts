// Configuration for controlling progress and verbosity
export class ProgressConfig {
    private static _verbose: boolean = true;

    static setVerbose(verbose: boolean): void {
        this._verbose = verbose;
    }

    static isVerbose(): boolean {
        return this._verbose;
    }
}
