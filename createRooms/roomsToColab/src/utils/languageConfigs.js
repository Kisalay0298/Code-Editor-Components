import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { sql } from "@codemirror/lang-sql";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";

// Updated language IDs for Judge0 CE API
export const languageMap = {
    "C": 50,         // C (GCC 9.2.0)
    "C++": 54,         // C++ (GCC 9.2.0)
    "Python": 71,      // Python (3.8.1)
    "JavaScript": 93,  // JavaScript (Node.js 12.14.0)
    "Java": 91,        // Java (JDK 17.0.6)
    "Go": 60,         // Go (1.17.6)
    "SQL": 82,         // SQL (PostgreSQL 13.4)
    "Rust": 73,         // Rust (1.53.0)
};

export const languageConfigs = {
  "C": {
      mode: cpp(),
      defaultCode:
`// Language: C
// Compiler: GCC 9.2.0
// Write your C code below...

#include <stdio.h>

int main() {
  printf("Hello, World!");
  return 0;
}`,
  },
  "C++": {
      mode: cpp(),
      defaultCode:
`// Language: C++
// Compiler: GCC 9.2.0
// Write your C++ code below...

#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,
  },
  "Python": {
      mode: python(),
      defaultCode:
`# Language: Python
# Version: 3.8.1
# Write your Python code below...

print("Hello, World!")`,
  },
  "JavaScript": {
      mode: javascript(),
      defaultCode:
`// Language: JavaScript
// Runtime: Node.js 12.14.0
// Write your JavaScript code below...

console.log("Hello, World!");`,
  },
  "Java": {
      mode: java(),
      defaultCode:
`// Language: Java
// Version: JDK 17.0.6
// Make sure your class name is 'Main' if using Judge0

public class Main {
  public static void main(String[] args) {
      System.out.println("Hello, World!");
  }
}`,
  },
  "SQL": {
      mode: sql(),
      defaultCode:
`-- Language: SQL
-- Version: PostgreSQL 13.4
-- NOTE: Judge0 does not execute real database queries. 
-- Use it only to check SQL syntax.

SELECT * FROM users;`,
  },
  "Go": {
      mode: go(),
      defaultCode:
`// Language: Go
// Version: Go 1.17.6
// Write your Go code below...

package main
import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,
  },
  "Rust": {
      mode: rust(),
      defaultCode:
`// Language: Rust
// Version: Rust 1.53.0
// Write your Rust code below...

fn main() {
  println!("Hello, World!");
}`,
  }
};

// import { javascript } from "@codemirror/lang-javascript";
// import { python } from "@codemirror/lang-python";
// import { java } from "@codemirror/lang-java";
// import { cpp } from "@codemirror/lang-cpp";
// import { go } from "@codemirror/lang-go";
// import { html } from "@codemirror/lang-html";
// import { css } from "@codemirror/lang-css";
// import { rust } from "@codemirror/lang-rust";
// import { sql } from "@codemirror/lang-sql";
// import { php } from "@codemirror/lang-php";
// import { markdown } from "@codemirror/lang-markdown";

// export const languageConfigs = {
//   "JavaScript": {
//     mode: javascript(),
//     defaultCode: 
// `// Write your JavaScript code here
// function hello() {
//     console.log("Hello, World!");
// }`
//   },

//   "Python": {
//     mode: python(),
//     defaultCode:
// `# Write your Python code here
// def hello():
//     print("Hello, World!")`
//   },

//   "Java": {
//     mode: java(),
//     defaultCode:
// `// Write your Java code here
// public class Main {
//     public static void main(String[] args) {
//         System.out.println("Hello, World!");
//     }
// }`
//   },

//   "C++": {
//     mode: cpp(),
//     defaultCode:
// `// Write your C++ code here
// #include <iostream>

// int main() {
//     std::cout << "Hello, World!" << std::endl;
//     return 0;
// }`
//   },

//   "Go": {
//     mode: go(),
//     defaultCode:
// `// Write your Go code here
// package main
// import "fmt"

// func main() {
//     fmt.Println("Hello, World!")
// }`
//   },

//   "HTML": {
//     mode: html(),
//     defaultCode:
// `<!-- Write your HTML code here -->
// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Hello</title>
//   </head>
//   <body>
//     <h1>Hello, World!</h1>
//   </body>
// </html>`
//   },

//   "CSS": {
//     mode: css(),
//     defaultCode:
// `/* Write your CSS here */
// body {
//     background-color: #f0f0f0;
//     color: #333;
//     font-family: Arial, sans-serif;
// }`
//   },

//   "Rust": {
//     mode: rust(),
//     defaultCode:
// `// Write your Rust code here
// fn main() {
//     println!("Hello, World!");
// }`
//   },

//   "SQL": {
//     mode: sql(),
//     defaultCode:
// `-- Write your SQL queries here
// SELECT * FROM users WHERE active = 1;`
//   },

//   "PHP": {
//     mode: php(),
//     defaultCode:
// `<?php
// // Write your PHP code here
// echo "Hello, World!";
// ?>`
//   },

//   "Markdown": {
//     mode: markdown(),
//     defaultCode:
// `# Write your Markdown here

// ## Hello World

// This is a paragraph.

// - List item 1
// - List item 2`
//   }
// };


// export const languageSupportMap = {
//     "C++": cpp(),
//     "Java": java(),
//     "Python": python(),
//     "JavaScript": javascript(),
//     "Go": go(),
//     "SQL": sql(),
//     "HTML": html(),
//     "CSS": css(),
//     "Rust": rust(),
//     "PHP": php(),
//     "Markdown": markdown()
// };

// export const languageMap = {
//     "C++": 54,
//     "Java": 91,
//     // "Java": 62,
//     "Python": 71,
//     // "JavaScript": 63,
//     "JavaScript": 93,
//     "Go": 60,
//     "SQL": 82,
//     "HTML": 50,         // optional, adjust if you're using a code runner
//     "CSS": 51,          // same here
//     "Rust": 73,
//     "PHP": 68,
//     "Markdown": null    // doesn't need a compiler
// };  
