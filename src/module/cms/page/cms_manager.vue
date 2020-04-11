<template xmlns>
  <div>
    <el-form v-model="param">
      <el-select v-model="param.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：<el-input v-model="param.pageAliase" style="width: 100px"></el-input>
      <el-button size="small" type="primary" v-on:click="query">查询</el-button>

      <router-link class="mui‐tab‐item" :to="{path:'/cms/page/page_add/'}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>

    </el-form>

    <el-table
    :data="list"
    stripe
    style="width: 100%">
       <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"> </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column  prop="pageType" label="页面类型" width="100"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="dataUrl" label="数据模型" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="page">
          <el-button type="text" size="small" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteCms(page.row.pageId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页 -->
    <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      :page-sizes="this.pages"
      :page-size="this.param.size"
      layout="sizes, prev, pager, next"
      :total="this.total"
      style="float: right">
    </el-pagination>

  </div>
</template>
<script>
    import * as cms_api from "../api/cms"
    export default {
        name: "cms_manager",
        data() {
        return {
            total:0,
            param:{
              size:5,
              page:0,
              siteId:"",
              pageAliase:""
            },
            list: [],
            pages:[5,10,15,20],
            siteList:[
                { siteId:'5a751fab6abb5044e0d19ea1',
                  siteName:'门户主站'
                },
                {
                  siteId:"102",
                  siteName:'测试站'
                }
            ]

        }
      },
      mounted(){
          let self = this;
          self.query();
      },
      methods:{
            changePage:function(val){
                let self = this;
                self.param.page = val-1;
                self.query();
            },
            changeSize:function(val){
                let self = this;
                self.param.size = val;
                self.query();
            },
            query:function(){
                let self = this;
                console.log(self.param)
                cms_api.cms_list_page(self.param.page,self.param.size,self.param).then((res)=>{
                    if(res.success){
                        self.list = res.queryResult.list;
                        self.total = res.queryResult.total;
                    }
                })
            },
            edit:function(pageId){
                this.$router.push({
                    path:"/cms/page/page_edit/"+pageId
                })
            },
            deleteCms:function(pageId){
                this.$confirm("是否删除！","提示",{}).then(()=>{
                    cms_api.cms_delete(pageId).then((res)=>{
                        if(res.success){
                            this.$message({
                                message:"删除成功",
                                type:"success"
                            })
                            this.query();
                        }else{
                            this.$message({
                                message:"删除失败" ,
                                type:"error"
                            })
                        }
                    })
                })
                cms_api.cms_delete(pageId)
            }
        }
    }
</script>

<style scoped>

</style>
