import Home from './Home';
import Compare from './Compare';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/compare",
    exact: true,
    component: Compare
  },
]

export default routes;