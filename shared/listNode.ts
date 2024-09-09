// Definition for singly-linked list.
export default class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }

    log():void {
        let list:ListNode = this;
        if (list == null) {
            console.log("null");
            return;
        }
    
        let result = (list.val).toString();
        list = list.next;
        while (list != null) {
            result += ", " + (list.val).toString();
            list = list.next;
        }
        console.log(result);
    
        return;
    }

    static fromArray(array: number[]): ListNode | null {
        if (array.length == 0) 
            return null;
    
        const head = new ListNode();
        let current = head;
        for (var i = 0; i < array.length-1; i++) {
            current.val = array[i];
            current.next = new ListNode();
            current = current.next;
        }
        current.val = array[i]; // last element shouldn't receive next listnode
    
        return head;
    }
}