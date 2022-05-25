import { rafInterval } from "./utilities"

class actionQueue {
    queue = [];

    onStart = null;
    onFinish = null;

    pauseQueue = [];
    isStarted = false;
    pauseInterval = null;
    startInterval = null;

    constructor({
        onStart = () => Promise.resolve(),
        onFinish = () => Promise.resolve(),
    } = {}) {
        this.onStart = onStart;
        this.onFinish = onFinish;
        this._init();
    }

    /*
     * Get the length of the queue
     *
     * @returns {string}
     */
    getLength = () => this.queue.length;

    /*
     * Add actions to end of the queue
     *
     * @param {Array<() => Promise>) | () => Promise}
     * @returns undefined
     */
    push = (fns) => {
        if (!this.isStarted) {
            this.onStart();
        }

        if (Array.isArray(fns)) {
            this.queue.push(...fns);
        } else {
            this.queue.push(fns);
        }
    };

    /*
     * Add actions to front of the queue
     *
     * @param {Array<() => Promise>) | () => Promise}
     * @returns undefined
     */
    unshift = (fns) => {
        if (!this.isStarted) {
            this.onStart();
        }

        if (Array.isArray(fns)) {
            this.queue.unshift(...fns);
        } else {
            this.queue.unshift(fns);
        }
    };

    pause = (id) => {
        this.pauseQueue.push(id);
    };

    continue = (id) => {
        const idx = this.pauseQueue.findIndex((v) => v === id);
        if (idx !== -1) {
            this.pauseQueue.splice(idx, 1);
        }
    };

    destroy = () => {
        this.clear();
        if (this.pauseInterval) {
            cancelAnimationFrame(this.pauseInterval.id);
        }
        if (this.startInterval) {
            cancelAnimationFrame(this.startInterval.id);
        }
    };

    clear = () => {
        this.queue = [];
        this.pauseQueue = [];
        this.isStarted = false;
        this.onFinish();
        if (this.pauseInterval) {
            cancelAnimationFrame(this.pauseInterval.id);
        }
    };

    _waitUntilUnpaused = () => {
        // Check if we should restart loop.
        return new Promise((resolve) => {
            this.pauseInterval = rafInterval(() => {
                if (!this.pauseQueue.length) {
                    resolve();
                    cancelAnimationFrame(this.pauseInterval.id);
                }
            }, 1);
        });
    };

    _init = () => {
        // Check every frame if we should start a new loop.
        this.startInterval = rafInterval(() => {
            if (!this.isStarted && this.queue.length && !this.pauseQueue.length) {
                this._loop();
            }
        }, 0);
    };

    /*
     * Sequentially calls a series of promises from the queue.
     *
     * @modifies this.actions removes items from the action queue
     */
    _loop = async () => {
        while (this.queue.length) {
            if (!this.isStarted) {
                this.isStarted = true;
            }

            if (this.pauseQueue.length) {
                await this._waitUntilUnpaused();
            }

            // Get next action in queue.
            const next = this.queue[0];
            // Remove next action from queue, perform before await in case new items
            // are added to queue while awaiting.
            this.queue.shift();
            // Run the action.
            await next();

            if (this.pauseQueue.length) {
                await this._waitUntilUnpaused();
            }

            if (!this.pauseQueue.length && this.queue.length === 0) {
                await this.onFinish();
                this.isStarted = false;
            }
        }
    };
}

export default actionQueue;
