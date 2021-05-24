import TinyReact from "./TinyReact"

const virtualDOM = (
  <div className="container">
    <h1>你好 我是虚拟DOM</h1>
    <h2>没有class名称的标签h2标签</h2>
    {
        1 === 2 && <h1>布尔值节点</h1>
    }
    <button onClick={() => {  alert("hello")}}>点击事件</button>
    <br />
    <input value="value" />
    <br />
    设置checked<input type="checkbox" checked="checked" />
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>你好 我是新的虚拟DOM</h1>
    <h3 className="test">有class名称的标签h3标签</h3>
    {
        1 === 2 && <h1>布尔值节点</h1>
    }
    <button onClick={() => {  alert("hello")}}>点击事件</button>
    <br />
    <input value="value" />
    <br />
    设置checked<input type="checkbox" checked="checked" />
  </div>
)

const root = document.getElementById('root');

// function Head (props) {
//   return <div>旧的</div>
// }
// function Head2 (props) {
//   return <div>新的</div>
// }


// class Alert extends TinyReact.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return <div>{this.props.name} {this.props.age}</div>
//   }
// }

TinyReact.render(virtualDOM, root);

setTimeout(() => {
  TinyReact.render(modifyDOM, root);
}, 3000)
