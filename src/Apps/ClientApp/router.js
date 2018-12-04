import asyncComponent from "@helpers/AsyncFunc";

export default [
  {
    path: '',
    component: asyncComponent( () => import('@page/dashboard'))
  },  
];