import RemoteAndSubtitlesView from "./components/remote-and-subtitles-view";
import RemoteOnlyView from "./components/remote-only-view";

export const routes = [
    {
        path: '/',
        component: RemoteAndSubtitlesView
    },
    {
        path: '/remoteonly',
        component: RemoteOnlyView
    }

];
