import AdvancedList from "./components/AdvancedList";
import AdvancedListTracking from "./components/AdvancedListTracking";
import Basic from "./components/Basic";
import Home from "./components/Home";

export const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: '/basic',
        component: Basic
    },
    {
        path: '/advanced-list',
        component: AdvancedList
    },
    {
        path: '/advanced-list-tracking',
        component: AdvancedListTracking
    }

];
