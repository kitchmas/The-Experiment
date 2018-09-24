import React from 'react';
import { DragSource } from 'react-dnd'
const Types = {
 ITEM: 'DiamondGreen'
}
const itemSource = {
 beginDrag(props) {
 /* code here */
 },
 endDrag(props) {
 /* code here */
 }
}
function collect(connect, monitor) {
 return {
 connectDragSource: connect.dragSource(),
 isDragging: monitor.isDragging()
 }
}
class DiamondGreen extends React.Component {
 render() {
 const { isDragging, connectDragSource, src } = this.props
 return connectDragSource(
    <div className="diamond diamond-green"></div>
 )
 }
}
export default DragSource(Types.ITEM, itemSource, collect)(DiamondGreen)