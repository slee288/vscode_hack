import re
import sys

python_file = 'file.py'
work_file = None

basic_conversion_rules = {
    "for": "for",
    "=": "to",
    "+=": "by",
    "-=": "by",
    "*=": "by",
    "/=": "by",
    "if": "if",
    "==": "is equal to",
    "<=": "is less than or equal to",
    ">=": "is greater than or equal to",
    ">": "is greater than",
    "<": "is less than",
    "while": "while",
    "until": "until",
    "import": "import file",
    "class": "define a class",
    "def": "define a function",
    "else": "otherwise",
    "elif": "otherwise, if",
    "except:": "EXCEPT:",
    "try:": "TRY:",
    "pass": "PASS",
    "in": "IN",
    "+": "",
    "-": "",
    "*": "",
    "/": ""
}
prefix_conversion_rules = {
    "=": "set ",
    "+=": "add ",
    "-=": "subtract ",
    "*=": "multiply ",
    "/=": "divide "
}
advanced_conversion_rules = {
    "print": "print ",
    "return": "return ",
    "input": "take the input of "
}


def f2list(to_list):
    # return to_list.readlines()
    return to_list.split("\n")


def l2pseudo(to_pseudo):
    for line in to_pseudo:
        line_index = to_pseudo.index(line)
        line = str(line)
        line = re.split(r'(\s+)', line)  # split by non-whitespace characters
        for key, value in prefix_conversion_rules.items():
            if key in line:
                if not str(line[0]) == '':
                    line[0] = value + line[0]
                else:
                    line[2] = value + line[2]
        for key, value in basic_conversion_rules.items():
            for word in line:
                if key == str(word):
                    if key == "+" or key == "-" or key == "*" or key == "/":
                        current_index = line.index(word)
                        line[current_index] = "(" + line[current_index - 2] + \
                            line[current_index] + line[current_index + 2] + ")"
                        line[current_index - 2] = ""
                        line[current_index + 2] = ""
                    else:
                        line[line.index(word)] = value
        for key, value in advanced_conversion_rules.items():
            for word in line:
                if key in word:
                    if key == "print":
                        inside_string = re.findall(r"\(.*?\)", word)[0][1:-1]
                        if '"' in inside_string:
                            line[line.index(word)] = value + inside_string
                        else:
                            line[line.index(word)] = value + \
                                "the value of " + inside_string
                    else:
                        line[line.index(word)] = word.replace(key, value)
        for key, value in prefix_conversion_rules.items():
            for word in line:
                if word == key:
                    del line[line.index(word)]
        to_pseudo[line_index] = "".join(line)
    return(to_pseudo)


def p2file(to_file):
    file = open(python_file + '_pseudo.txt', 'w')
    for line in to_file:
        print(line, file=file, end="")


def toConsole(to_file):
    return_str = ""
    for line in to_file:
        # print(line, end="")
        return_str += line
    return return_str


def main():
    # main_file = open(python_file, 'r+')
    main_file = sys.argv[1]
    work_file = f2list(main_file)
    work_file = l2pseudo(work_file)
    print(toConsole(work_file))
    # print("WHAT THE FUCK")


main()
