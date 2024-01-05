/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-05 10:51:14
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-05 10:51:30
 * @FilePath: \react-100\src\app\utils\useWatch.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { useEffect, useRef } from 'react';

type Callback<T> = (prev: T | undefined) => void;
type Config = {
  immediate: boolean;
};

function useWatch<T>(dep: T, callback: Callback<T>, config: Config = { immediate: false }) {
  const { immediate } = config;

  const prev = useRef<T>();
  const inited = useRef(false);
  const stop = useRef(false);

  useEffect(() => {
    const execute = () => callback(prev.current);

    if (!stop.current) {
      if (!inited.current) {
        inited.current = true;
        if (immediate) {
          execute();
        }
      } else {
        execute();
      }
      prev.current = dep;
    }
  }, [dep]);

  return () => {
    stop.current = true;
  };
}

export default useWatch;