import React, { useEffect, useRef, useState } from 'react'
import {findDOMNode} from 'react-dom';
const WithScroll = (WrappedComponent) => {
    
  return function WithScrollComponent (...props){
    const domNode = findDOMNode(this);
    const compRef = useRef(null);
    const [list,setList] = useState("")
    const [renderItems, setRenderItems] = useState(20);
    const renderMoreItems = 5;
    const handleScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        const bottom = scrollHeight - scrollTop - clientHeight;
        if (!bottom) {
          console.log("start get more data");
          getMoreData();
        }
      };
    const getMoreData = () => {
        const { arr } = this.props;
        
  
        setTimeout(() => {
          setList(arr.slice(0, renderItems));
            
          setRenderItems(renderItems + renderMoreItems)
          console.log("running setTimeOut");
        }, 1000);
      };
      useEffect(() => {
        domNode.findDOMNode(compRef.current).addEventListener("scroll",handleScroll);
      },[])





    return (
        <WrappedComponent {...props} ref={compRef}/>
    )
  }
}

export default WithScroll