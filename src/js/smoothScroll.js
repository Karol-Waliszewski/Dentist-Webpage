// import Jump

var jump = (function () {

    var o = {

        jump: function (target, options) {
            this.start = window.pageYOffset

            this.options = {
                duration: options.duration,
                offset: options.offset || 0,
                callback: options.callback,
                easing: options.easing || easeInOutQuad
            }

            this.distance = typeof target === 'string' ?
                this.options.offset + document.querySelector(target).getBoundingClientRect().top :
                target

            this.duration = typeof this.options.duration === 'function' ?
                this.options.duration(this.distance) :
                this.options.duration

            requestAnimationFrame(_loop)
        },

        _loop: function (time) {
            if (!this.timeStart) {
                this.timeStart = time
            }

            this.timeElapsed = time - this.timeStart
            this.next = this.options.easing(this.timeElapsed, this.start, this.distance, this.duration)

            window.scrollTo(0, this.next)

            this.timeElapsed < this.duration ?
                requestAnimationFrame(_loop) :
                this._end()
        },

        _end: function () {
            window.scrollTo(0, this.start + this.distance)

            typeof this.options.callback === 'function' && this.options.callback()
            this.timeStart = false
        }

    };

    var _loop = o._loop.bind(o);

    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
    }

    return o;

})();


const jumpModule = (function () {

    // Dom Elements
    var button = document.querySelector('#scroll'),
        nav = document.querySelector('.nav');

    // Event Listener
    if (typeof (button) != 'undefined' && button != null) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            jump.jump('main', {
                duration: 1100,
                offset: -80
            });
            //            jump.jump(-1 * nav.innerHeight, {
            //                duration: 100,
            //            });

        })
    }
})();
