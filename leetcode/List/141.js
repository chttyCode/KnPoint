/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  // 快慢指针
  if(head === null){return false}
  let fast = head.next;
  let slow = head;
  while(fast!==null&&fast.next!=null){
    if(fast ===slow){
      return true
    }
    slow=slow.next;
    fast = fast.next.next;
  }
  return false
};


/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var hasCycle = function (head) {
  // stack
  const cycleSet = new Set();
  while(head){
    if(cycleSet.has(head)){
      return true
    }
    cycleSet.add(head)
    head = head.next
  }
  return false
};