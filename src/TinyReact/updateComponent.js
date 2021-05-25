import diff from "./diff";

export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
    // 生命周期
    oldComponent.componentWillReceviceProps(virtualDOM.props);
    // 判断是否更新生命周期
    if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
        // 存储更新前的props
        let prevProps = oldComponent.props;
        // 生命周期
        oldComponent.componentWillUpdate(virtualDOM.props);
        // 组件更新
        oldComponent.updateProps(virtualDOM.props);
        // 获取最新的虚拟DOM，
        let nextVirtualDOM = oldComponent.render();
        // 更新实例
        nextVirtualDOM.component = oldComponent;
        // diff分别和更新。
        diff(nextVirtualDOM, container, oldDOM)
        // 生命周期
        oldComponent.componentDidUpdate(prevProps);
    }
    
}