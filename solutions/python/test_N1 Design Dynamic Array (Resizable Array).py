# Design Dynamic Array (Resizable Array)
# Easy

# Design a Dynamic Array (aka a resizable array) class, such as an ArrayList in Java or a vector in C++.

# Your DynamicArray class should support the following operations:
#     - DynamicArray(int capacity) will initialize an empty array with a capacity of capacity, where capacity > 0.
#     - int get(int i) will return the element at index i. Assume that index i is valid.
#     - void set(int i, int n) will set the element at index i to n. Assume that index i is valid.
#     - void pushback(int n) will push the element n to the end of the array.
#     - int popback() will pop and return the element at the end of the array. Assume that the array is non-empty.
#     - void resize() will double the capacity of the array.
#     - int getSize() will return the number of elements in the array.
#     - int getCapacity() will return the capacity of the array.

# *If we call pushback(int n) but the array is full, we should resize() the array first.*

# Example 1:
#     Input:
#     ["Array", 1, "getSize", "getCapacity"]
#     Output:
#     [null, 0, 1]

# Example 2:
#     Input:
#     ["Array", 1, "pushback", 1, "getCapacity", "pushback", 2, "getCapacity"]
#     Output:
#     [null, null, 1, null, 2]

# Example 3:
#     Input:
#     ["Array", 1, "getSize", "getCapacity", "pushback", 1, "getSize", "getCapacity", "pushback", 2, "getSize", "getCapacity", "get", 1, "set", 1, 3, "get", 1, "popback", "getSize", "getCapacity"]
#     Output:
#     [null, 0, 1, null, 1, 1, null, 2, 2, 2, null, 3, 3, 1, 2]

# Note:
# The index i provided to get(int i) and set(int i) is guaranteed to be greater than or equal to 0 and less than the number of elements in the array.


# the size of the array is not the index of the last number, so we need to keep track of the real size
# should I store an array within the class?

class DynamicArray:
    capacity: int # how many elements can be stored
    size: int # how many elements ARE stored
    array: list[int] # the actual array
    
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.size = 0
        self.array = [0] * capacity
        return

    def get(self, i: int) -> int:
        return self.array[i]

    def set(self, i: int, n: int) -> None:
        self.array[i] = n
        return 

    def pushback(self, n: int) -> None:
        if self.size == self.capacity:
            self.resize()

        self.array[self.size] = n
        self.size += 1

        return

    def popback(self) -> int:
        # Reduce the size first to avoid intermediate variable for return
        self.size -= 1
        return self.array[self.size]

    def resize(self) -> None:
        self.array.extend([0] * self.capacity)
        self.capacity *= 2
        return

    def getSize(self) -> int:
        return self.size
    
    def getCapacity(self) -> int:
        return self.capacity


def test_example_1():
    arr = DynamicArray(1)
    assert arr.getSize() == 0
    assert arr.getCapacity() == 1

def test_example_2():
    arr = DynamicArray(1)
    arr.pushback(1)
    assert arr.getCapacity() == 1
    arr.pushback(2)
    assert arr.getCapacity() == 2

def test_example_3():
    arr = DynamicArray(1) # []
    assert arr.getSize() == 0
    assert arr.getCapacity() == 1
    arr.pushback(1) # [1]
    assert arr.getSize() == 1
    assert arr.getCapacity() == 1
    arr.pushback(2) # [1, 2]
    assert arr.getSize() == 2
    assert arr.getCapacity() == 2
    assert arr.get(1) == 2
    arr.set(1, 3) # [1, 3]
    assert arr.get(1) == 3
    assert arr.popback() == 3 # [1, "3" is popped]
    assert arr.getSize() == 1
    assert arr.getCapacity() == 2
