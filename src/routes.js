import RemoteAndSubtitlesView from "./components/RemoteAndSubtitlesView";
import RemoteOnlyView from "./components/RemoteOnlyView";

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
