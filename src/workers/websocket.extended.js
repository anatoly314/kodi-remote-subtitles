export default new Proxy(WebSocket, {
    construct: function(target, args) {
        const STATES = Object.freeze({
            0: 'CONNECTING',
            1: 'OPEN',
            2: 'CLOSING',
            3: 'CLOSED'
        })
        // create WebSocket instance
        const instance = new target(...args);
        instance.STATES = STATES;

        //internal function to dispatch 'state' event when readyState changed
        function _dispatchStateChangedEvent() {
            instance.dispatchEvent(new Event('state'));
            if (instance.onstate && typeof instance.onstate === 'function') {
                instance.onstate();
            }
        }

        //dispatch event immediately after websocket was initiated
        //obviously it will be CONNECTING event
        setTimeout(function () {
            _dispatchStateChangedEvent();
        }, 0);

        // WebSocket "onopen" handler
        const openHandler = () => {
            _dispatchStateChangedEvent();
        };

        // WebSocket "onclose" handler
        const closeHandler = () => {
            _dispatchStateChangedEvent();
            instance.removeEventListener('open', openHandler);
            instance.removeEventListener('close', closeHandler);
        };

        // add event listeners
        instance.addEventListener('open', openHandler);
        instance.addEventListener('close', closeHandler);

        return instance;
    }
});
