class Solution {
  String convertToTitle(int columnNumber) {
    int remainder;
    int division = columnNumber;

    // stores the final string in a int iterable for the String.fromCharCodes
    List<int> result = [];

    // performs a "binary conversion" except base 26
    do {
      remainder = division % 26;
      division = division ~/ 26;
      if (remainder > 0) {
        result.add(remainder + 64);
      } else if (remainder == 0) {
        result.add(64 + 26);
        division = division - 1;
      }
    } while (division > 0);
    return String.fromCharCodes(result.reversed);
  }
}

void main() {
  List<int> tests = [
    5, //E
    26, // Z
    27, // AA
    677, // AAA
    52, // AZ
  ];
  Solution sol = Solution();
  print(sol.convertToTitle(tests[1]));
}
