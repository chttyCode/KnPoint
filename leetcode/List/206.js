/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

//1. stack的方式
function reverseList(head) {
  const stack = [];
  const start = new ListNode();
  let tem = start;
  while (head !== null) {
    stack.push(head);
    head = head.next;
  }
  while (stack.length > 0) {
    tem.next = stack.pop();
    tem = tem.next;
  }
  tem.next = null;
  return start.next;
}
//2. 迭代
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

//3. 递归

var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head;
  }
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
