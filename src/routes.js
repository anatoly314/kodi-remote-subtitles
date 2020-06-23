// import Home from "./components/Home";
import AdvancedTable from "./components/AdvancedTable";
import AdvancedList from "./components/AdvancedList";
import Basic from "./components/Basic";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Template from "./components/Template";
import DynamicScrollerDemo from "./components/DynamicScrollerDemo";

export const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: '/scroller-demo',
        component: DynamicScrollerDemo
    },
    {
        path: '/basic',
        component: Basic
    },
    {
        path: '/advanced-table',
        component: AdvancedTable
    },
    {
        path: '/advanced-list',
        component: AdvancedList
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
