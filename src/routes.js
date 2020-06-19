import Home from "./components/Home";
// import NewHome from "./components/NewHome";
import HelloWorld from "./components/HelloWorld";
import TimingTest from "./components/TimingTest";

export const routes = [
    {
        path: '',
        component: TimingTest
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/world',
        component: HelloWorld
    },
    {
        path: '/time',
        component: TimingTest
    }
];
