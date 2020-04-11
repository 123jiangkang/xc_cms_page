import Home from '@/module/home/page/home.vue';
import Cms_Manager from '@/module/cms/page/cms_manager.vue'
import Cms_Add from '@/module/cms/page/page_add'
import Cms_Edit from '@/module/cms/page/page_edit'
export default [{
  path: '/',
  component: Home,
  name: 'cms',
  hidden: false,
  children: [
    {path: '/cms/page/cms_manager', component: Cms_Manager,name:"cms_manager",hidden:false},
    {path:'/cms/page/page_add',component: Cms_Add,name:'page_add',hidden:true},
    {path:"/cms/page/page_edit/:pageId",component: Cms_Edit,name:"page_edit",hidden:true}
  ]
}

]
