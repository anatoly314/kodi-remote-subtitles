import AdvancedListTracking from "./components/AdvancedListTracking";
import Basic from "./components/Basic";
import Subtitles from "./components/Subtitles";
import Home from "./components/Home";

export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/subtitles',
        component: Subtitles
    },
    {
        path: '/basic',
        component: Basic
    },
    {
        path: '/advanced-list-tracking',
        component: AdvancedListTracking
    }

];
