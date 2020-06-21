import Home from "./components/Home";
import Advanced from "./components/Advanced";
import Basic from "./components/Basic";
import Settings from "./components/Settings";
import Template from "./components/Template";

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
        path: '/advanced',
        component: Advanced
    },
    {
        path: '/settings',
        component: Settings
    },
    {
        path: '/template',
        component: Template
    }
];
