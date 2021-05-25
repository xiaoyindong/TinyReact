import diff from './diff';
export default class Component {
    constructor(props) {
        this.props = props;
    }
    setState (state) {
        this.state = Object.assign({}, this.state, state);
        // 获取最新的DOM对象
        const virtualDOM = this.render();
        // 获取旧的virtualDOM对象进行比对
        const oldDOM = this.getDOM();
        const container = oldDOM.parentNode;
        // 实现对比
        diff(virtualDOM, container, oldDOM);
    }
    setDOM (dom) { // 存储页面中展示的DOM对象
        this._dom = dom;
    }
    getDOM () { // 获取页面展示的DOM
        return this._dom;
    }
    updateProps(props) {
        this.props = props;
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceviceProps(nextProps) {}
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, preState) {}
    componentWillUnmount() {}
}