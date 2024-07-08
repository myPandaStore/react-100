/*
 * @Author: luckin yipeng.zhang@kunlun-inc.com
 * @Date: 2024-07-08 23:33:56
 * @LastEditors: luckin yipeng.zhang@kunlun-inc.com
 * @LastEditTime: 2024-07-08 23:34:54
 * @FilePath: /react-100/src/app/Hooks/learing/mianshi.js
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
// 异步任务队列
class Scheduler {
  constructor(limit) {
    this.limit = limit; // 同时运行的最大任务数
    this.runningCount = 0; // 当前正在运行的任务数
    this.taskQueue = []; // 任务队列
  }

  // 添加任务到调度器
  add(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = async () => {
        try {
          this.runningCount++;
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.runningCount--;
          this.runNext(); // 运行下一个任务
        }
      };

      if (this.runningCount < this.limit) {
        taskWrapper();
      } else {
        this.taskQueue.push(taskWrapper);
      }
    });
  }

  // 运行下一个任务
  runNext() {
    if (this.taskQueue.length > 0 && this.runningCount < this.limit) {
      const nextTask = this.taskQueue.shift();
      nextTask();
    }
  }
}

// 使用示例
const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

const scheduler = new Scheduler(2); // 设置并发限制为2

const addTask = (time, name) => {
  scheduler.add(() => timeout(time)).then(() => console.log(`${name} done`));
};

addTask(1000, "Task 1");
addTask(500, "Task 2");
addTask(300, "Task 3");
addTask(400, "Task 4");

// 预计输出
// Task 2 done
// Task 3 done
// Task 1 done
// Task 4 done

window.number = 2;
var obj = {
  number: 3,
  db1: (function () {
    console.log(this);
    this.number *= 4;
    return function () {
      console.log(this);
      this.number *= 5;
    };
  })(),
};
var db1 = obj.db1;
db1(); //window
obj.db1(); //obj
console.log(obj.number); // 15
console.log(window.number); // 40

// 链表反转
function reverseList(head) {
  if (!head || !head.next) return head;
  let prev = null;
  let curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
