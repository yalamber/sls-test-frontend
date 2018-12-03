import asyncComponent from "../../../helpers/AsyncFunc";

export default [
  {
    path: '',
    component: asyncComponent( () => import('../../Page/dashboard'))
  },
  {
    path: 'teams',
    component: asyncComponent(() => import('../../Modules/Agency/List'))
  },
  
];
