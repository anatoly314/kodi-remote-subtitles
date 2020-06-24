import AdvancedList from "./components/AdvancedList";
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
    }

];
