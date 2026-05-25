class Solution {
  String addBinary(String a, String b) {
    String asplit = a.split('').reversed.join();
    String bsplit = b.split('').reversed.join();
    if (a.length > b.length) {
      for (var i = 0; i < a.length - b.length; i++) {
        bsplit += "0";
      }
    } else {
      for (var i = 0; i < b.length - a.length; i++) {
        asplit += "0";
      }
    }

    var totallength = asplit.length;
    bool vaium = false;
    String finalsum = "";

    for (int i = 0; i < totallength; i++) {
      if (asplit[i] == '0') {
        if (bsplit[i] == '0') {
          if (vaium) {
            finalsum += "1";
            vaium = false;
          } else {
            finalsum += "0";
          }
        } else {
          if (vaium) {
            finalsum += "0";
          } else {
            finalsum += "1";
          }
        }
      } else {
        if (bsplit[i] == '0') {
          if (vaium) {
            finalsum += "0";
          } else {
            finalsum += "1";
          }
        } else {
          if (vaium) {
            finalsum += "1";
          } else {
            finalsum += "0";
          }
          vaium = true;
        }
      }
    }

    if (vaium) {
      finalsum += "1";
      vaium = false;
    }

    finalsum = finalsum.split('').reversed.join();
    int zerocount = 0;
    int i = 0;
    while (true) {
      if (finalsum[i] == 0) {
        zerocount += 1;
      } else {
        break;
      }
      i += 1;
    }

    return finalsum.substring(zerocount, finalsum.length);
  }
}

void main(List<String> args) {
  Solution a = Solution();
  print(a.addBinary("1111", "1111"));
}
