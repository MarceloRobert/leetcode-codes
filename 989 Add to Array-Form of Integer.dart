// The array-form of an integer num is an array representing its digits in left to right order.

// For example, for num = 1321, the array form is [1,3,2,1].
// Given num, the array-form of an integer, and an integer k, return the array-form of the integer num + k.

// Example 1:

// Input: num = [1,2,0,0], k = 34
// Output: [1,2,3,4]
// Explanation: 1200 + 34 = 1234
// Example 2:

// Input: num = [2,7,4], k = 181
// Output: [4,5,5]
// Explanation: 274 + 181 = 455
// Example 3:

// Input: num = [2,1,5], k = 806
// Output: [1,0,2,1]
// Explanation: 215 + 806 = 1021

// k pode ser maior do que o número que estiver na lista

import 'dart:math';

// errada porque o número pode ser muito grande para o pow
// exemplo:
// num = [1, 2, 6, 3, 0, 7, 1, 7, 1, 9, 7, 5, 6, 6, 4, 4, 0, 0, 6, 3]
// k = 516
class Solution1 {
  List<int> addToArrayForm(List<int> thenum, int k) {
    int thenumparsed = 0;
    List<int> retlist = [];

    for (var i = 0; i < thenum.length; i++) {
      thenumparsed += (pow(10, (thenum.length - i - 1)) as int) * thenum[i];
    }

    thenumparsed += k;

    List<String> stringlist = thenumparsed.toString().split('');
    for (var i = 0; i < stringlist.length; i++) {
      retlist.add(stringlist[i].codeUnitAt(0) - 48);
    }

    return retlist;
  }
}

class Solution {
  List<int> addToArrayForm(List<int> thenum, int k) {
    List<String> kstringlist = k.toString().split('');
    List<int> kintlist = [];

    //stringlist to intlist
    for (var i = 0; i < kstringlist.length; i++) {
      kintlist.add(kstringlist[i].codeUnitAt(0) - 48);
    }

    //reverse
    kintlist = kintlist.reversed.toList();
    thenum = thenum.reversed.toList();

    //normalize
    if (thenum.length > kintlist.length) {
      var lengthdif = thenum.length - kintlist.length;
      for (var i = 0; i < lengthdif; i++) {
        kintlist.add(0);
      }
    } else {
      var lengthdif = kintlist.length - thenum.length;
      for (var i = 0; i < lengthdif; i++) {
        thenum.add(0);
      }
    }

    //sum
    int tmpsum = 0;
    for (var i = 0; i < thenum.length; i++) {
      thenum[i] += kintlist[i] + tmpsum;
      tmpsum = 0;
      if (thenum[i] >= 10) {
        thenum[i] -= 10;
        tmpsum = 1;
      }
    }
    if (tmpsum > 0) {
      thenum.add(1);
    }

    return thenum.reversed.toList();
  }
}

void main(List<String> args) {
  Solution a = Solution();
  print(a.addToArrayForm([2, 1, 5], 806));
}
