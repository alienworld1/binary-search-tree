export default class Queue {
    #queue;

    constructor() {
        this.#queue = [];
    }

    enqueue(data) {
        this.#queue.push(data);
    }

    dequeue() {
        return this.#queue.shift();
    }
}