class Solution {
  bool repeatedSubstringPattern(String s) {
    String repeatResult;
    String substring;

    if (s.length == 1) {
      return false;
    }

    for (int i = 1; i < s.length / 2 + 1; i++) {
      substring = s.substring(0, i);
      repeatResult = s.split(substring).join();
      if (repeatResult == "") {
        return true;
      }
    }

    return false;
  }
}

void main(List<String> args) {
  List<String> tests = [
    "abab", // true
    "aba", // false
    "abcabcabcabc", // true
    "a" // false
  ];
  Solution s459 = Solution();
  print(s459.repeatedSubstringPattern(tests[0]));
}
