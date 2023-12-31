import React, { useEffect, useRef, useState } from "react";
const WithScroll = (WrappedComponent) => {
  return function WithScrollComponent(props) {
    const { arr } = props;
    const scrollRef = useRef(null);
    const [list, setList] = useState(arr.slice(0, 10));
    const [renderItems, setRenderItems] = useState(13);
    const renderMoreItems = 3;
    const [loading, setLoading] = useState(false);
    const handleScroll = (e) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const bottom = scrollHeight - scrollTop - clientHeight;
      if (bottom<=20) {
        setLoading(true);
        getMoreData();
      }
    };
    const getMoreData = () => {
      setTimeout(() => {
        setList(arr.slice(0, renderItems));

        setRenderItems(renderItems + renderMoreItems);
        console.log("running setTimeOut");
        setLoading(false);
      }, 3000);
    };
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.addEventListener("scroll", handleScroll);
      }
    }, []);

    return (
      <WrappedComponent
        {...props}
        list={list}
        handleScroll={handleScroll}
        scrollRef={scrollRef}
        loading={loading}
      />
    );
  };
};

export default WithScroll;
