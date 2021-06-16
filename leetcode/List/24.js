/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 1. stack
var swapPairs = function (head) {
  let stack = [];
  while (head) {
    stack.push(head);
    head = head.next;
  }
  const start = new ListNode();
  let tem = start;
  for (let i = 0; i < stack.length; i = i + 2) {
    if (stack[i + 1]) {
      tem.next = stack[i + 1];
      tem.next.next = stack[i];
      tem = stack[i];
    } else {
      tem.next = stack[i];
      tem = stack[i];
    }
  }
  tem.next = null;
  return start.next;
};

// 2. 递归
var swapPairs = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  const newHead = head.next;
  head.next = swapPairs(newHead.next);
  newHead.next = head;
  return newHead;
};

// 3. 迭代

var swapPairs = function (head) {
  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let temp = dummyHead;
  while (temp.next !== null && temp.next.next !== null) {
    const node1 = temp.next;
    const node2 = temp.next.next;
    temp.next = node2;
    node1.next = node2.next;
    node2.next = node1;
    temp = node1;
  }
  return dummyHead.next;
};
