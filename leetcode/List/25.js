/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  let curr = head;
  let count = 0;
  while (curr != null && count != k) {
    // find the k+1 node
    curr = curr.next;
    count++;
  }
  if (count == k) {
    // if k+1 node is found
    curr = reverseKGroup(curr, k); // reverse list with k+1 node as head
    // head - head-pointer to direct part,
    // curr - head-pointer to reversed part;
    while (count-- > 0) {
      // reverse current k-group:
      let tmp = head.next; // tmp - next head in direct part
      head.next = curr; // preappending "direct" head to the reversed list
      curr = head; // move head of reversed part to a new node
      head = tmp; // move "direct" head to the next node in direct part
    }
    head = curr;
  }
  return head;
};
var reverseKGroup = function (head, k) {
  let n = 0;
  for (let i = head; i != null; n++, i = i.next);

  let dmy = new ListNode(0);
  dmy.next = head;
  for (let prev = dmy, tail = head; n >= k; n -= k) {
    for (let i = 1; i < k; i++) {
      let next = tail.next.next;
      tail.next.next = prev.next;
      prev.next = tail.next;
      tail.next = next;
    }

    prev = tail;
    tail = tail.next;
  }
  return dmy.next;
};
var reverseKGroup = function (head, k) {
  //1. test weather we have more then k node left, if less then k node left we just return head
  let node = head;
  let count = 0;
  while (count < k) {
    if (node == null) return head;
    node = node.next;
    count++;
  }
  // 2.reverse k node at current level
  let pre = reverseKGroup(node, k); //pre node point to the the answer of sub-problem
  while (count > 0) {
    let next = head.next;
    head.next = pre;
    pre = head;
    head = next;
    count = count - 1;
  }
  return pre;
};

// 1s
var reverseKGroup = function (head, k) {
  if (head == null) return null;

  let len = 0;
  let l = head; //len is the length of this list
  while (l != null) {
    len++;
    l = l.next;
  }

  let round = len / k; //cut the list, so we have 'round' lists with size k
  if (round == 0) return head;

  let dummy = new ListNode(-1);
  dummy.next = head;
  let pre = dummy;
  for (let i = 0; i < round; i++) {
    //for each list with size k, reverse it
    let start = pre.next;
    let then = start.next;
    for (let j = 0; j < k - 1; j++) {
      start.next = then.next;
      then.next = pre.next;
      pre.next = then;
      then = start.next;
    }
    pre = start;
  }
  return dummy.next;
};

// 112s
var reverseKGroup = function (head, k) {
  if (head == null || k == 1) return head;
  let dummy = new ListNode(0);
  dummy.next = head;
  let cur = dummy,
    nex = dummy,
    pre = dummy;
  let count = 0;
  while (cur.next != null) {
    cur = cur.next;
    count++;
  }
  while (count >= k) {
    cur = pre.next;
    nex = cur.next;
    for (let i = 1; i < k; i++) {
      cur.next = nex.next;
      nex.next = pre.next;
      pre.next = nex;
      nex = cur.next;
    }
    pre = cur;
    count -= k;
  }
  return dummy.next;
};
