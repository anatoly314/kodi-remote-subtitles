export default {
    PING: {
        jsonrpc: '2.0',
        method: 'JSONRPC.Ping',
        id: 'PING'
    },
    CURRENT_SPEED: {
        "jsonrpc": "2.0",
        "method": "Player.GetProperties",
        "params": {
            "playerid": 1,
            "properties": [
                "speed"
            ]
        },
        "id": "CURRENT_SPEED"
    },
    CURRENT_MOVIE_DETAILS: {
        "jsonrpc": "2.0",
        "id": "CURRENT_MOVIE_DETAILS",
        "method": "Player.GetItem",
        "params": {
            "playerid": 1,
            "properties": [
                "art"
            ]
        }
    },
    CURRENT_TIME: {
        jsonrpc: '2.0',
        method: 'Player.GetProperties',
        params: {
            playerid: 1,
            properties: ['time']
        },
        id: 'CURRENT_TIME'
    },
    CHANGE_TO_DELTA_MS: {
        jsonrpc: '2.0',
        id: 'CHANGE_TO_DELTA_MS',
        method: 'Player.Seek',
        params: {
            value: {
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            },
            playerid: 1
        }
    },
    INPUT_BACK: {
        jsonrpc: '2.0',
        method: 'Input.Back',
        id: 'INPUT_BACK'
    },
    TOGGLE_PLAY_PAUSE: {
        jsonrpc: '2.0',
        method: 'Player.PlayPause',
        params: {
            playerid: 1
        },
        id: 'TOGGLE_PLAY_PAUSE'
    },
    TOGGLE_SUBTITLES: {
        jsonrpc: "2.0",
        method: "Player.SetSubtitle",
        params: {
            playerid: 1,
            subtitle: null,
        },
        id: "SET_SUBTITLE"
    },
    IS_SUBTITLES_PLAYING: {
        jsonrpc: "2.0",
        method: "Player.GetProperties",
        params: {
            playerid: 1,
            properties: [
                "subtitleenabled"
            ]
        },
        id: "IS_SUBTITLES_PLAYING"
    }
}
