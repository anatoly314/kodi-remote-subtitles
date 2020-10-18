import RemoteAndSubtitlesView from "./components/remote-and-subtitles-view";
import RemoteOnlyView from "./components/remote-only-view";
import SettingsView from "./components/settings-view";

export const routes = [
    {
        path: '/',
        component: RemoteAndSubtitlesView
    },
    {
        path: '/remoteonly',
        component: RemoteOnlyView
    },
    {
        path: '/settings',
        component: SettingsView
    }

];
