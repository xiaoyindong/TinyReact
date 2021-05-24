import TinyReact from "./TinyReact"

const virtualDOM = (
  <div className="container">
    <h1>你好 我是虚拟DOM</h1>
    <h2>有class名称的标签</h2>
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

function Head (props) {
  return <div>
    {props.title}
  </div>
}

TinyReact.render(<Head title="hello"/>, root);
