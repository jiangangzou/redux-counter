
#### 背景
我：您好！我对此职位感兴趣，可以聊聊吗？  
招聘者：您好！感谢关注。方便发一份您的简历吗？ 

       几分钟后。。。  

招聘者：请过用过react吗？  
我：只看过一些项目，没有实战开发过。 

招聘者至今杳无音信，再后面跟招聘者聊天基本上都问是否用过react
#### 卧薪尝胆
最近在学习react，记得刚从vue的战场上厮杀回来，就发现已经跟时代脱轨了。不过幸好，两个框架思想差别不是很大，看起来也没有那么的吃力，之前花了一些时间学习了react的语法以及一些简单使用。今天看到了阮一峰老师的redux入门文章，觉得还不错。于是跟大家一起分享下学习的心得，这个是[阮一峰老师的原文文章]( 'http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html' )。

#### 关于Redux
大佬的文章中解释了rudex什么时候需要不需取用.但是，由于，我是学习，即使知道自己现在目前用不上，但是还是要去搞，要不然需要的时候就书到用时方恨少了[hahaha]。因此，这里我就不跟大家说reudx这个大家伙什么时候要用了，感兴趣的骨子们可以移步大佬文章哈。  
redux是一种设计模式（一种行之有效的解决方案，一种解决问题的模板）。它是用来管理状态的，就像数据库，用来管理数据，数据进行可以对一系列的操作。我们所有需要共享的状态都可以用过redux来进行操作。官方的解释是：‘是javascript容器，提供可预测化的状态管理。可以让你构建一致化的应用，运用于不同的环境，并且易于测试’
#### 进入rudex
先构建一个react项目，直接上手，边学边做，这里是通过一个简单计数器的应用让大家感受到rudex在项目上如何去应用
~~~
create-react-app redux-counter
~~~
再引入redux
~~~~
yarn add redux
~~~~
把准备工作做完了以后，我们就要想了，之前我们说过我们要把所有状态都放在rudex里面，但是怎么做呢。Redux给我们提供了一个store来存储状态，整个应用store是唯一的
Store有以下用法：  
* 提供应用需要的state，是一个容器
* 提供getState()方法获取state
* 提供dispatch(action)方法获取state；
* 提供subscribe(listener)注册监听器  
现在我们先可以先不必对这些东西有很清楚的了解，只需要知道有这些东西就可以，因为'贫穷会限制我们的想象'。如果我们知道了有，后面有困难就知道好像有东西可以解决。如果我们什么都不知道，那么代码写起来就会束手无策，就算百度都不知道怎么去表达我们想要的答案。那么听我娓娓道来。
在我们刚才构建的src目录下的index.js文件下修改下代码
~~~
//增加的代码
import { createStore } from 'redux';
import counter from './reducers';
const store = createStore(counter);
//修改的代码
ReactDOM.render((<div>
  { store.getState() }
</div>), document.getElementById('root'));
~~~
createStore是redux提供提供的函数用来生成store，它接收对store进行处理的reducer作为参数，reducer我们先不说，稍后再讲。   
我们现在用counter代替下，counter现在就是处理这个计数器的函数，待会儿我们会在src下建一个reducers文件夹里面会暴露出counter这个函数。我们在render中让view层显示获取到state通过 store.getState()  
那么我们在src下新建一个reducers文件夹，里面新建一个index.js文件,代码如下：  
~~~
export default (state = 0, action) => {
    console.log(action.type)
    switch(action.type) {
      case 'INCREMENT': 
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state; 
    }
  }
  ~~~
  这里提供状态，提供可以被action计算的状态，视图与状态一一对应。  
Redux首次执行时，state为undefined，此时我们可以借机设置并返回应用初始的state，因此这里我们用state=0 来初始化状态，在这里我们初始化状态直接在函数参数中通过（state=0）,这是不好的做法，后面我们会把初始状态定义给一个常量，这里我们就先这样写。  
然后通过action来改变状态，当我们在判断action的时候往往用switch进行操作。但我们用户要操作数据的时候，就会触发action。  
到这里运行下项目，我们便可以看到界面上出现了一个'0'.  
  接着往下，我们再来写一个用户操作的组件Counter,在components下新建一个Counter.js
  ~~~
  import React,{ Component } from 'react';

class Counter extends Component {
    render () {
        const { value,onIncrement,onDecrement } = this.props;
        return (
            <div>
                Clicked: { value } times
                <button onClick={ onIncrement }>{ '+'}</button>{ ' '}
                <button onClick={ onDecrement }>{'-'}</button>
            </div>
        )
    }
}

export default Counter;
~~~
我们想实现能加能减。待会儿我们就需要在父组件中把两个方法以及state传递过来。
src下的index文件更改为如下：
~~~
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore }   from 'redux';
import Counter from './components/Counter'
import counter from './reducers';

const store = createStore(counter);
const rootEl = document.getElementById('root')
const render = () => {
    ReactDOM.render(<Counter value={store.getState()} onIncrement={() => store.dispatch({
        type: "INCREMENT"
    })}
    onDecrement={() => store.dispatch({
        type: 'DECREMENT'
    })}
    />,rootEl)
}
render();
store.subscribe(render)

serviceWorker.unregister();
//单独构建状态树,状态是跟UI统一的
~~~
在这里我们又两个陌生的api。dispatch和subscribe.  
dispatch，寓意为派遣。如果我们state里面的状态要改变，我们就必须要通过store.dispatch方法。这是View发出Action的唯一方法。没有规矩就不成方圆，这个状态是大家共享的，因此任何组件想要改变它，这都是唯一途径.它接收一个action。如果需要详解了解dispatch如何通过action触发reducer，可以看下源码。 

store.subscribe(),在这里，store允许我们设置一个监听函数，何为监听，就是state改变了，我view要做出改变，这才是MVVM。在React中，我们就监听render方法，只要state改变了，render就帮你把页面重新渲染。另外store.subscribe()方法会返回一个函数，我们如果要解除监听，就可以调用这个函数。做法如下：
~~~
let unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})
unsubscribe;
~~~

到这里我们就已经完成了一个redux的小应用  
#### 总结
redux其实就三大概念。reducer、action、store  
我们先说action，action其实最简单了，就是一个集中便签，用来管理actionsTypes，store.dispath的时候就告诉action你要干嘛。  
接下来就是reducer了，通过actio得到的操作，reducer就来执行相应的操作，并把最终的数据再给store。那么store，很显然，他把action和reducer联系起来了，而且他还提供方法给我们操作数据，给视图提供数据  
这里有这次实践的源码，有需要的可以采之  
未完待续...  
 ***  
小生才疏学浅，大三学徒一枚。文章中定有许多不严谨之处或是不正确的理解，还望大佬们不吝指教。同时也希望大佬能分享一些自己关于这一块觉得不错的干货链接。

