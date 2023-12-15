import React,{ useEffect, useState } from "react";

export const useScroll = (ref,arr) => {
    const [list, setList] = useState(arr.slice(0, 10));
    const [renderItems, setRenderItems] = useState(13);
    const renderMoreItems = 3;
    const [loading, setLoading] = useState(false);
    const handleScroll = (e) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const bottom = scrollHeight - scrollTop - clientHeight;
      if (!bottom) {
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
      if (ref.current) {
        ref.current.addEventListener("scroll", handleScroll);
      }
    }, []);

    return {list, loading}
}
