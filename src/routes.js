import AdvancedTable from "./components/AdvancedTable";
import AdvancedList from "./components/AdvancedList";
import VuetifyVirtualList from "./components/VuetifyVirtualList";
import Basic from "./components/Basic";
import Home from "./components/Home";
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
        path: '/vuetify-virtual-list',
        component: VuetifyVirtualList
    }

];
