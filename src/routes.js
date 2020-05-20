import Home from "./components/Home";
import HelloWorld from "./components/HelloWorld";

export const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: '/world',
        component: HelloWorld
    }
];
