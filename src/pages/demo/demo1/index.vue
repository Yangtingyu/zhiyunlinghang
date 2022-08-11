<template>
    <d2-container>
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>

        <div id="demo">{{ fullName }}</div>
        <div>{{ firstName }}</div>
        <div>{{ lastName }}</div>
        <input v-model="fullName">

        <div class="test-class1" v-bind:class="{'test-class2':t_class1}">
            样式绑定实现
        </div>
        <div @click="changeClass" class="test-class1" v-bind:class="classObject">
            样式绑定实现,点击改变样式
        </div>
        <div @click="changeClass" class="test-class1" v-bind:class="[is_active ? 'test-class2':'']">
            样式绑定实现,点击改变样式
        </div>
        <div @click="changeClass" class="test-class1" v-bind:class="[{'test-class2':is_active},'test-class3']">
            样式绑定实现,点击改变样式
        </div>
        <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">aaaaaa</div>
        <div v-bind:style="styleObject">aaaaaaaaaaaa</div>

        <h1 v-if="false">Yes</h1>
        <h1 v-else>No</h1>

        <div v-if="Math.random() > 0.5">
            Now you see me
        </div>
        <div v-else>
            Now you don't
        </div>

        <template v-if="loginType === 'username'">
            <label>Username</label>
            <input placeholder="Enter your username" key="1">
        </template>
        <template v-else>
            <label>Email</label>
            <input placeholder="Enter your email address" key="2">
        </template>
        <input type="button" value="切换" @click="(loginType==='username')?loginType='':loginType='username'">
        <hr/>
        <input type="button" @click="pushItems" value="新增">
        <input type="button" @click="sortItems" value="排序">
        <ul>
            <li v-for="(item,index) in items">
                {{index+1}}、{{item.message}}
            </li>
        </ul>
        <ul>
            <li v-for="(value,key) in object">
                {{key}}-{{value}}
            </li>
        </ul>
        <ul>
            <li v-for="(value,key,index) in object" :key="index">
                {{index}}-{{key}}-{{value}}
            </li>
        </ul>
        <ul>
            <li v-for="n in evenNumbers">{{n}}</li>
        </ul>
        <ul>
            <li v-for="n in even(numbers)">{{n}}</li>
        </ul>
        <ul>
            <li v-for="n in 8">{{n}}</li>
        </ul>
        <ul v-if="items1.length">
            <li v-for="(item,index) in items1">
                {{index+1}}、{{item.message}}
            </li>
        </ul>
        <p v-else>items1没有值</p>
        <hr/>
        <div id="todo-list-example">
            <form v-on:submit.prevent="addNewTodo">
                <label for="new-todo">Add a todo</label>
                <input
                        v-model="newTodoText"
                        id="new-todo"
                        placeholder="E.g. Feed the cat"
                >
                <button>Add</button>
            </form>
            <ul>
                <li
                        is="todo-item"
                        v-for="(todo, index) in todos"
                        v-bind:key="todo.id"
                        v-bind:title="todo.title"
                        v-on:remove="todos.splice(index, 1)"
                ></li>
            </ul>
        </div>

        <blog-post title="中华人民共和国"></blog-post>

        <blog-post v-for="post in todos" v-bind:key="post.id" v-bind:post="post"></blog-post>

        <div id="blog-posts-events-demo" style="background: #409eff;">
            <div :style="{ fontSize: postFontSize + 'em' }">
                <blog-post
                        v-for="post in todos"
                        v-bind:key="post.id"
                        v-bind:post="post"
                        @enlarge-text="postFontSize += $event"
                ></blog-post>
            </div>
            <blog-post :post="{id:1,title:'title',content:'*********'}"
                v-on:enlarge-text="onEnlargeText"
                       v-model="searchText"
            ></blog-post>
            {{searchText}}
        </div>

        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">ddddd</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">ddd</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">ddd</div></el-col>
        </el-row>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
        </el-container>

        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>

        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>

        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>

        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-container>
                    <el-main>Main</el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>

        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>Main</el-main>
            </el-container>
        </el-container>

        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </d2-container>
</template>

<style scoped>
    .test-class1{
        background: #cccccc;
    }
    .test-class2{
        color:red;
        cursor: pointer;
    }
    .test-class3{
        border:1px solid blue;
    }
    .el-input,.el-select{
        width: 250px;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>

<script>
    import todoItem from '@/pages/demo/demo1/components/todo-item'
    import blogPost from './components/blog-post'

    export default {
        components:{
            'todo-item': todoItem,
            blogPost
        },
        data(){
            return {
                message: 'Hello',
                firstName: 'Foo',
                lastName: 'Bar',
                fullName: 'Foo Bar',

                t_class1: true,
                t_class2: false,
                classa: 'test-class2',
                is_active: true,
                classObject: {
                    'test-class2': true,
                    'test-class3': true,
                },

                activeColor: 'red',
                fontSize: 30,
                styleObject: {
                    color: 'green',
                    fontSize: '13px'
                },

                loginType: 'username',

                items: [
                    {message:'AAAAA'},
                    {message:'BBBBB'}
                ],
                object: {
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 30
                },
                numbers: [ 1, 2, 3, 4, 5 ],
                items1:[],

                newTodoText: '',
                todos: [
                    {
                        id: 1,
                        title: 'Do the dishes',
                        content: '<h2>内容1</h2>'
                    },
                    {
                        id: 2,
                        title: 'Take out the trash',
                        content: '<h2>内容2</h2>'
                    },
                    {
                        id: 3,
                        title: 'Mow the lawn',
                        content: '<h2>内容3</h2>'
                    }
                ],
                nextTodoId: 4,
                postFontSize: 1,
                searchText: '组件内v-module绑定',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        computed: {
            // 计算属性的 getter
            reversedMessage: function () {
                // `this` 指向 vm 实例
                return this.message.split('').reverse().join('')
            },
            fullName: {
                // getter
                get: function () {
                    return this.firstName + ' ' + this.lastName
                },
                // setter
                set: function (newValue) {
                    var names = newValue.split(' ')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                }
            },
            evenNumbers: function () {
                return this.numbers.filter(function (number) {
                    return number % 2 === 0
                })
            }
        },
        methods: {
            changeClass: function(){
                this.classObject["test-class2"]=!this.classObject["test-class2"]
                this.classObject["test-class3"]=!this.classObject["test-class3"]
            },
            pushItems: function(){
                this.items.splice(1,0,{
                    message:'我是新增成员'
                })
            },
            sortItems: function(){
                this.items.sort();
            },
            even: function (numbers) {
                return numbers.filter(function (number) {
                    return number % 2 === 0
                })
            },

            addNewTodo: function () {
                this.todos.push({
                    id: this.nextTodoId++,
                    title: this.newTodoText
                })
                this.newTodoText = ''
            },
            onEnlargeText: function(enlargeAmount){
                this.postFontSize += enlargeAmount
            }
        }
    }
</script>