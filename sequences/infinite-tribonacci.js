'use strict';

function InfiniteTribonacci() {
    this.index = 0;
    this._isFirst = true;
    this._currentSequence = [0, 1, 0, 2];
    this._prevSequence = [0, 1];
    this._prevPrevSequence = [0];
}

InfiniteTribonacci.prototype.next = function () {
    const value = this._currentSequence[this.index];

    this.index++;

    if (this.index === this._currentSequence.length) {
        this.index = 0;

        const current = [].concat(
            this._prevSequence,
            this._prevPrevSequence
        );

        this._prevPrevSequence = this._prevSequence;
        this._prevSequence = this._isFirst ? this._currentSequence : [].concat(
            this._prevSequence,
            this._currentSequence
        );
        this._currentSequence = current;

        this._isFirst = false;
    }

    return value;
};

module.exports = InfiniteTribonacci;
