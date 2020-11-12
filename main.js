let calculator = (function () {

  function init() {
    addBtn();
    deleteBtns();
    result();
    setInterval(createDollars, 300);
  }

  /* CacheDom */
  let allButtons = document.querySelectorAll(".body_element");
  let textArea = document.querySelector(".header_input-text");
  let resultBlock = document.querySelector(".resultDiv");
  let newArr = [];
  let stack = [];


  function addBtn() {

    Array.from(allButtons).forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        /* Start  Умови додавання елементів в поле textArea,а також до массиву newArr(наш стек) */
        if (
          this.innerText !== "AC" &&
          this.innerText !== "⬅" &&
          this.innerText !== "="
        ) {
          /* Умова для неможливості додавння двох одинакових симолів один після одного (Наприклад : ++) */
          if (
            (this.innerText == newArr[newArr.length - 1] &&
              this.innerText == "(") ||
            (this.innerText == newArr[newArr.length - 1] &&
              this.innerText == ")") ||
            (this.innerText == newArr[newArr.length - 1] &&
              this.innerText == "+") ||
            (this.innerText == newArr[newArr.length - 1] &&
              this.innerText == "-") ||
            (this.innerText == newArr[newArr.length - 1] &&
              this.innerText == "x") ||
            (this.innerText == newArr[newArr.length - 1] &&
              this.innerText == "/")
          ) {
            textArea.value = textArea.value;
          } else {

            /* Додавання до поля textArea усіх цифер , а також до массиву newArr */


            /* Умова обгортання числа (5) якщо перед цим добавлявся cos/sin/sqrt */
            if ($(this).hasClass("element_numbers")) {

              if (newArr.length > 0) {
                textArea.value += this.innerText;
                newArr.push(this.innerText)
                if (typeof newArr[newArr.length - 2] == 'string' && newArr[newArr.length - 2] !== 'sqrt' && newArr[newArr.length - 2] !== 'sin' &&
                  newArr[newArr.length - 2] !== 'cos') {
                  newArr[newArr.length - 2] += this.innerText;
                  newArr.splice(-1, 1)
                }

              } else if (newArr.length === 0 && this.innerText !== '.') {
                textArea.value += this.innerText;
                newArr.push(this.innerText)
              }
            }

            /* Start умови створення об`єктів (операндів +,-,*,/,^,(,) ) та додавання їх до newArr як об'єктів */
            else if (
              event.target.innerText == "+" ||
              event.target.innerText == "-"
            ) {
              let plusMinusObj = {
                key: this.innerText,
                priority: 1,
              };
              newArr.push(plusMinusObj);
              if (newArr.length > 1) {
                if (newArr[newArr.length - 2].key !== this.innerText) {
                  textArea.value += this.innerText;
                } else {
                  newArr.splice(-1, 1);
                }
              } else {
                textArea.value += this.innerText;
              }
            } else if (event.target.innerText == "x") {
              let multiplyObj = {
                key: "*",
                priority: 2,
                type: "x",
              };
              newArr.push(multiplyObj);
              if (newArr.length > 1) {
                if (newArr[newArr.length - 2].type !== this.innerText) {
                  textArea.value += this.innerText;
                } else {
                  newArr.splice(-1, 1);
                }
              } else {
                textArea.value += this.innerText;
              }
            } else if (event.target.innerText == "/") {
              let divideObj = {
                key: this.innerText,
                priority: 2,
              };
              newArr.push(divideObj);
              if (newArr.length > 1) {
                if (newArr[newArr.length - 2].key !== this.innerText) {
                  textArea.value += this.innerText;
                } else {
                  newArr.splice(-1, 1);
                }
              } else {
                textArea.value += this.innerText;
              }
            } else if ($(this).hasClass("body_element__degree")) {
              let degreeObj = {
                key: "**",
                priority: 3,
                type: "^",
              };
              newArr.push(degreeObj);
              if (newArr.length > 1) {
                if (newArr[newArr.length - 2].type !== this.innerText) {
                  textArea.value += this.innerText;
                } else {
                  newArr.splice(-1, 1);
                }
              } else {
                textArea.value += this.innerText;
              }
            } else if ($(this).hasClass("body_element__leftBracket")) {
              let leftBrObj = {
                key: "(",
              };
              newArr.push(leftBrObj);
              textArea.value += this.innerText;
            } else if ($(this).hasClass("body_element__rightBracket")) {
              let rightBrObj = {
                key: ")",
              };
              newArr.push(rightBrObj);
              textArea.value += this.innerText;
            } else if (this.innerText == 'sqrt') {
              if (newArr[newArr.length - 1] !== "sqrt") {
                textArea.value += '√';
                newArr.push(this.innerText);
              }
            } else if (this.innerText == 'cos') {
              if (newArr[newArr.length - 1] !== "cos") {
                textArea.value += 'cos';
                newArr.push(this.innerText);
              }
            } else if (this.innerText == 'sin') {
              if (newArr[newArr.length - 1] !== "sin") {
                textArea.value += this.innerText;
                newArr.push(this.innerText);
              }
            }
          }
          /* End умови створення об'є'ктів (операндів +,-,*,/,^,(,) ) та додавання їх до newArr як об'єктів */

        }
        /* End  Умови додавання елементів в поле ,а також до массиву newArr(наш стек) */

      });
    });
    /* End Розподіл цифр і символів на 2 массиви ,та усі основні обчислення */
  }

  function deleteBtns() {
    Array.from(allButtons).forEach(function (btn) {
      btn.addEventListener("click", function (event) {

        /* Full очистка поля на AC */
        if (this.innerText == "AC") {
          textArea.value = "";
          newArr = [];
          stack = [];
          operators = [];
        }

        /* Start Видалення по 1 елементу на клавішу ⬅ */
        else if (this.innerText == "⬅") {

          if (newArr[newArr.length - 2] == "sqrt") {
            let lenghtOfNumber = newArr[newArr.length - 1].length;
            textArea.value = textArea.value.substring(
              0,
              textArea.value.length - lenghtOfNumber
            );
            newArr.splice(-1, 1);
            stack.splice(-1, 1);
          } else if (newArr[newArr.length - 1] == "sqrt") {
            textArea.value = textArea.value.substring(
              0,
              textArea.value.length - 1
            );
            newArr.splice(-1, 1);
            stack.splice(-1, 1);
          } else if (newArr[newArr.length - 2] == "cos" || newArr[newArr.length - 2] == "sin") {
            let lenghtOfNumber = newArr[newArr.length - 1].length;
            textArea.value = textArea.value.substring(
              0,
              textArea.value.length - lenghtOfNumber
            );
            newArr.splice(-1, 1);
            stack.splice(-1, 1);
          } else if (newArr[newArr.length - 1] == "cos" || newArr[newArr.length - 1] == "sin") {
            textArea.value = textArea.value.substring(
              0,
              textArea.value.length - 3
            );
            newArr.splice(-1, 1);
            stack.splice(-1, 1);
          } else {

            if (newArr[newArr.length - 1] > 1) {
              textArea.value = textArea.value.substring(
                0,
                textArea.value.length - newArr[newArr.length - 1].length
              );
              newArr.splice(-1, 1);
            } else {
              textArea.value = textArea.value.substring(
                0,
                textArea.value.length - 1
              );
              newArr.splice(-1, 1);
            }

          }
        }
      });
    });
    /* End Видалення по 1 елементу на клавішу ⬅ */
  }

  function result() {
    Array.from(allButtons).forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        /* Start Розподіл цифр і символів на 2 массиви ,та усі основні обчислення при натисканні на клавішу '=' */
        if (this.innerText == "=") {
          console.log(newArr)
          let numbers = [];
          let operands = [];

          for (let y = 0; y < newArr.length; y++) {

            if (typeof newArr[y] == 'object' && newArr[y].key == '(') {

              /* Вирізання операцій у дужках по індексах дужок від лівої до правої,по кількості елементів і утворення нової стрічки brRes*/

              let leftBr = newArr.map(function (e) {
                return e.key;
              }).indexOf('(');
              let rightBr = newArr.map(function (e) {
                return e.key;
              }).indexOf(')');
              let elemInBr = rightBr - leftBr + 1;
              let brRes = newArr.splice(leftBr, elemInBr);

              brRes.shift();
              brRes.pop();
              console.log(newArr, brRes)
              /* !!!!!!!!! START !!!!!!   Операції над стрічкою brRes і додавання результатів на місце лівої дужки по індексу у старий массив */
              for (let q = 0; q < brRes.length; q++) {

                /*Умови обрахунків cos/sin/sqrt */
                if (brRes[q] == 'sqrt' && typeof brRes[q + 1] == 'string') {
                  let a = parseFloat(brRes[q + 1]);
                  let sum = Math.sqrt(a);
                  let indexOfSqrt = brRes.indexOf('sqrt');
                  brRes.splice(indexOfSqrt, 2, sum)
                  console.log(numbers, brRes)
                } else if (brRes[q] == 'sin' && typeof brRes[q + 1] == 'string') {
                  let a = parseFloat(brRes[q + 1]);
                  let sum = Math.sin(a);
                  let indexOfSin = brRes.indexOf('sin');
                  brRes.splice(indexOfSin, 2, sum)
                  console.log(numbers, brRes)
                } else if (brRes[q] == 'cos' && typeof brRes[q + 1] == 'string') {
                  let a = parseFloat(brRes[q + 1]);
                  let sum = Math.cos(a);
                  let indexOfSin = brRes.indexOf('cos');
                  brRes.splice(indexOfSin, 2, sum)
                  console.log(numbers, brRes)
                }
                if (typeof brRes[q] == "object") {

                  /* Умови додавання символів операції в массив */
                  if (operands.length == 0 && numbers.length !== 0) {
                    operands.push(brRes[q]);

                  }
                  /* Якщо перше , яке вводить користувач це символ сприймаємо слідуюче число з цим символом (Наприклад : -3) (Частина 1) */
                  else if (numbers.length == 0) {
                    numbers.push(brRes[q].key);
                  }

                  /* Перетворення +- в - (2+-3 => 2-3) */
                  else if (brRes[q].key == "-" && brRes[q - 1].key == "+") {
                    operands.push(brRes[q]);
                    operands.splice(-2, 1);
                  }

                  /* Умова для виразів (Наприклад : 2*-3 || 2/-3) тобто: множення / ділення на відємні числа */
                  else if (
                    (brRes[q].key == "-" && brRes[q - 1].key == "*") ||
                    brRes[q - 1].key == "/"
                  ) {
                    brRes[q + 1] = `-${brRes[q + 1]}`;
                  } else {
                    /* Умова виконання операцій ,якщо є лише 2 числа і 2 операдна в массивах (Наприклад : 2+2 , 2+2*3) */

                    if (brRes[q].priority <= operands[operands.length - 1].priority && numbers.length == 2) {
                      let a = parseFloat(numbers[numbers.length - 2]);
                      let b = parseFloat(numbers[numbers.length - 1]);
                      let c = operands[operands.length - 1].key;
                      let sum;
                      if (c == "+") {
                        sum = a + b;
                      } else if (c == "-") {
                        sum = a - b;
                      } else if (c == "*") {
                        sum = a * b;
                      } else if (c == "/") {
                        if (b == 0) {
                          sum = "На нуль ділити не можна";
                        } else {
                          sum = a / b;
                        }
                      } else if (c == "**") {
                        sum = a ** b;
                      }
                      numbers = [];
                      numbers.push(sum);
                      operands.splice(-1, 1);
                      operands.push(brRes[q]);
                    } else {
                      /* Умова ,якщо пріорітет данного символа більший за пріорітет попереднього , додаємо цей символ до массиву операндів,без виконання дій
                          Наприклад : 2 + 3 * 5 (+,*) */

                      operands.push(brRes[q]);
                      console.log(operands, numbers);

                      /* Якщо операндів в массиві більше 3  і до тих пір поки операнд який додається не буде мати пріорітет нижчий або рівний попердньому
                        добавляємо елементи по массивам, у іншиому випадку починаємо виконувати операції над останнім елементами,поки кількість операндів
                        буде меньше  3.
                      */

                      if (operands[operands.length - 1].priority >= brRes[q].priority && operands.length > 2) {
                        console.log(operands, numbers)
                        let a = parseFloat(numbers[numbers.length - 2]);
                        let b = parseFloat(numbers[numbers.length - 1]);
                        let c = operands[operands.length - 2].key;
                        let sum;
                        if (c == "+") {
                          sum = a + b;
                        } else if (c == "-") {
                          sum = a - b;
                        } else if (c == "*") {
                          sum = a * b;
                        } else if (c == "/") {
                          if (b == 0) {
                            sum = "На нуль ділити не можна";
                          } else {
                            sum = a / b;
                          }
                        } else if (c == "**") {
                          sum = a ** b;
                        }
                        let x = numbers.shift();
                        // let s = numbers.pop();
                        console.log(x);
                        numbers = [];
                        numbers.push(x);
                        numbers.push(sum);
                        // numbers.push(s)

                        operands.splice(-2, 1);
                        console.log(numbers, operands);

                        /* Коли операндів залишається 2 спочатку виконується дія * / , щоб перевести кількість цифер до 2 ,а операндів до 1. */
                        if (operands.length == 2 && numbers.length == 3) {
                          console.log(numbers, operands);
                          let a = parseFloat(numbers[numbers.length - 2]);
                          let b = parseFloat(numbers[numbers.length - 1]);
                          let c = operands[operands.length - 1].key;
                          let sum;

                          if (c == "+") {
                            sum = a + b;
                          } else if (c == "-") {
                            sum = a - b;
                          } else if (c == "*") {
                            sum = a * b;
                          } else if (c == "/") {
                            if (b == 0) {
                              sum = "На нуль ділити не можна";
                            } else {
                              sum = a / b;
                            }
                          } else if (c == "**") {
                            sum = a ** b;
                          }
                          let x = numbers.shift();
                          console.log(x);
                          numbers = [];
                          numbers.push(x)
                          numbers.push(sum);

                          operands.splice(-1, 1);

                          console.log(numbers, operands);
                        }
                        if (operands.length == 1 && numbers.length == 2) {

                          let a = parseFloat(numbers[numbers.length - 2]);
                          let b = parseFloat(numbers[numbers.length - 1]);
                          let c = operands[operands.length - 1].key;
                          let sum;

                          if (c == "+") {
                            sum = a + b;
                          } else if (c == "-") {
                            sum = a - b;
                          } else if (c == "*") {
                            sum = a * b;
                          } else if (c == "/") {
                            if (b == 0) {
                              sum = "На нуль ділити не можна";
                            } else {
                              sum = a / b;
                            }
                          } else if (c == "**") {
                            sum = a ** b;
                          }
                          /* Зачищаємо поля і массиви,виводимо результат */
                          numbers = [];
                          newArr = [];
                          operands = [];
                          operands.splice(-1, 1);
                          resultBlock.innerText = sum;
                          textArea.value = "";
                        }
                      }
                    }
                  }
                } else {
                  numbers.push(brRes[q]);

                  /* Якщо тип вводиться два числа і між ними немає операції,складає ці числе в одне (Наприклад : 10 , 100)*/
                  if (typeof brRes[q] == typeof brRes[q - 1]) {
                    numbers[numbers.length - 2] += brRes[q];
                    numbers.splice(-1, 1);
                  }
                  /* Якщо перше , яке вводить користувач це символ сприймаємо слідуюче число з цим символом (Наприклад : -3) (Частина 2) */
                  else if (numbers[numbers.length - 2] == "-") {

                    numbers[numbers.length - 2] += brRes[q];
                    numbers.splice(-1, 1);
                  }
                }
              }
              /* Коли операндів залишається 2 спочатку виконується дія * / , щоб перевести кількість цифер до 2 ,а операндів до 1. */

              if (operands.length == 2) {
                console.log(numbers, operands);
                let a = parseFloat(numbers[numbers.length - 2]);
                let b = parseFloat(numbers[numbers.length - 1]);
                let c = operands[operands.length - 1].key;
                let sum;
                if (c == "+") {
                  sum = a + b;
                } else if (c == "-") {
                  sum = a - b;
                } else if (c == "*") {
                  sum = a * b;
                } else if (c == "/") {
                  if (b == 0) {
                    sum = "На нуль ділити не можна";
                  } else {
                    sum = a / b;
                  }
                } else if (c == "**") {
                  sum = a ** b;
                }
                let x = numbers.shift();
                console.log(x);
                numbers = [];
                numbers.push(x);
                numbers.push(sum);
                operands.splice(-1, 1);
                console.log(numbers, operands);
              }

              /* Кінцеве обчислення при наявності лише  1 операнду в массиві  та 2 чисел в іншому массиві,обраховуємо їх */
              if (operands.length == 1) {
                let a = parseFloat(numbers[numbers.length - 2]);
                let b = parseFloat(numbers[numbers.length - 1]);
                let c = operands[operands.length - 1].key;
                let sum;

                if (c == "+") {
                  sum = a + b;
                } else if (c == "-") {
                  sum = a - b;
                } else if (c == "*") {
                  sum = a * b;
                } else if (c == "/") {
                  if (b == 0) {
                    sum = "На нуль ділити не можна";
                  } else {
                    sum = a / b;
                  }
                } else if (c == "**") {
                  sum = a ** b;
                }

                newArr.splice(leftBr, 0, sum)


                console.log(newArr)
                /* Зачищаємо поля і массиви,виводимо результат */
                numbers = [];
                operands = [];
              }
              /* !!!!!!!!! END !!!!!!   Операції над стрічкою brRes і додавання результатів на місце лівої дужки по індексу у старий массив */

            }
          }

          /* !!!!!!!!! START !!!!!!   Операції над основною стрічкою */

          for (let i = 0; i < newArr.length; i++) {

            /*Умови обрахунків cos/sin/sqrt */
            if (newArr[i] == 'sqrt' && typeof newArr[i + 1] == 'string') {
              let a = parseFloat(newArr[i + 1]);
              let sum = Math.sqrt(a);
              let indexOfSqrt = newArr.indexOf('sqrt');
              newArr.splice(indexOfSqrt, 2, sum)
              console.log(numbers, newArr)
            } else if (newArr[i] == 'sin' && typeof newArr[i + 1] == 'string') {
              let a = parseFloat(newArr[i + 1]);
              let sum = Math.sin(a);
              let indexOfSin = newArr.indexOf('sin');
              newArr.splice(indexOfSin, 2, sum)
              console.log(numbers, newArr)
            } else if (newArr[i] == 'cos' && typeof newArr[i + 1] == 'string') {
              let a = parseFloat(newArr[i + 1]);
              let sum = Math.cos(a);
              let indexOfSin = newArr.indexOf('cos');
              newArr.splice(indexOfSin, 2, sum)
              console.log(numbers, newArr)
            }
            if (typeof newArr[i] == "object") {
              if (newArr[i].key == ('(')) {
                operands.push(newArr[i])
              }
              /* Умови додавання символів операції в массив */
              if (operands.length == 0 && numbers.length !== 0) {
                operands.push(newArr[i]);

              }
              /* Якщо перше , яке вводить користувач це символ сприймаємо слідуюче число з цим символом (Наприклад : -3) (Частина 1) */
              else if (numbers.length == 0) {
                numbers.push(newArr[i].key);
              }

              /* Перетворення +- в - (2+-3 => 2-3) */
              else if (newArr[i].key == "-" && newArr[i - 1].key == "+") {
                operands.push(newArr[i]);
                operands.splice(-2, 1);
              }

              /* Умова для виразів (Наприклад : 2*-3 || 2/-3) тобто: множення / ділення на відємні числа */
              else if (
                (newArr[i].key == "-" && newArr[i - 1].key == "*") ||
                newArr[i - 1].key == "/"
              ) {
                newArr[i + 1] = `-${newArr[i + 1]}`;
              } else {

                if (operands[operands.length - 1].priority >= newArr[i].priority && numbers.length == 2) {
                  console.log(operands, numbers)
                  let a = parseFloat(numbers[numbers.length - 2]);
                  let b = parseFloat(numbers[numbers.length - 1]);
                  let c = operands[operands.length - 1].key;
                  let sum;
                  if (c == "+") {
                    sum = a + b;
                  } else if (c == "-") {
                    sum = a - b;
                  } else if (c == "*") {
                    sum = a * b;
                  } else if (c == "/") {
                    if (b == 0) {
                      sum = "На нуль ділити не можна";
                    } else {
                      sum = a / b;
                    }
                  } else if (c == "**") {
                    sum = a ** b;
                  }
                  numbers = [];
                  numbers.push(sum);
                  operands.splice(-1, 1);
                  operands.push(newArr[i]);
                } else {
                  operands.push(newArr[i]);

                  /* Якщо операндів в массиві більше 3  і до тих пір поки операнд який додається не буде мати пріорітет нижчий або рівний попердньому
                    добавляємо елементи по массивам, у іншиому випадку починаємо виконувати операції над останнім елементами,поки кількість операндів
                    буде меньше  3.
                  */
                  if (operands[operands.length - 1].priority >= newArr[i].priority && operands.length > 2) {
                    console.log(operands, numbers)
                    let a = parseFloat(numbers[numbers.length - 2]);
                    let b = parseFloat(numbers[numbers.length - 1]);
                    let c = operands[operands.length - 2].key;
                    let sum;
                    if (c == "+") {
                      sum = a + b;
                    } else if (c == "-") {
                      sum = a - b;
                    } else if (c == "*") {
                      sum = a * b;
                    } else if (c == "/") {
                      if (b == 0) {
                        sum = "На нуль ділити не можна";
                      } else {
                        sum = a / b;
                      }
                    } else if (c == "**") {
                      sum = a ** b;
                    }
                    let x = numbers.shift();
                    // let s = numbers.pop();
                    console.log(x);
                    numbers = [];
                    numbers.push(x);
                    numbers.push(sum);
                    // numbers.push(s)

                    operands.splice(-2, 1);
                    console.log(numbers, operands);


                    /* Коли операндів залишається 2 спочатку виконується дія * / , щоб перевести кількість цифер до 2 ,а операндів до 1. */
                    if (operands.length == 2 && numbers.length == 3) {
                      console.log(numbers, operands);
                      let a = parseFloat(numbers[numbers.length - 2]);
                      let b = parseFloat(numbers[numbers.length - 1]);
                      let c = operands[operands.length - 1].key;
                      let sum;

                      if (c == "+") {
                        sum = a + b;
                      } else if (c == "-") {
                        sum = a - b;
                      } else if (c == "*") {
                        sum = a * b;
                      } else if (c == "/") {
                        if (b == 0) {
                          sum = "На нуль ділити не можна";
                        } else {
                          sum = a / b;
                        }
                      } else if (c == "**") {
                        sum = a ** b;
                      }
                      let x = numbers.shift();
                      console.log(x);
                      numbers = [];
                      numbers.push(x)
                      numbers.push(sum);

                      operands.splice(-1, 1);

                      console.log(numbers, operands);
                    }
                    if (operands.length == 1 && numbers.length == 2) {

                      let a = parseFloat(numbers[numbers.length - 2]);
                      let b = parseFloat(numbers[numbers.length - 1]);
                      let c = operands[operands.length - 1].key;
                      let sum;

                      if (c == "+") {
                        sum = a + b;
                      } else if (c == "-") {
                        sum = a - b;
                      } else if (c == "*") {
                        sum = a * b;
                      } else if (c == "/") {
                        if (b == 0) {
                          sum = "На нуль ділити не можна";
                        } else {
                          sum = a / b;
                        }
                      } else if (c == "**") {
                        sum = a ** b;
                      }
                      /* Зачищаємо поля і массиви,виводимо результат */
                      numbers = [];
                      newArr = [];
                      operands = [];
                      operands.splice(-1, 1);
                      resultBlock.innerText = sum;
                      textArea.value = "";
                    }
                  }
                }
              }
            } else {
              numbers.push(newArr[i]);
              /* Якщо тип вводиться два числа і між ними немає операції,складає ці числе в одне (Наприклад : 10 , 100)*/

              /* Якщо перше , яке вводить користувач це символ сприймаємо слідуюче число з цим символом (Наприклад : -3) (Частина 2) */
              if (numbers[numbers.length - 2] == "-") {
                numbers[numbers.length - 2] += newArr[i];
                numbers.splice(-1, 1);
              }

            }
          }
          /* Коли операндів залишається 2 спочатку виконується дія * / , щоб перевести кількість цифер до 2 ,а операндів до 1. */

          if (operands.length == 2) {
            console.log(numbers, operands);
            let a = parseFloat(numbers[numbers.length - 2]);
            let b = parseFloat(numbers[numbers.length - 1]);
            let c = operands[operands.length - 1].key;
            let sum;
            if (c == "+") {
              sum = a + b;
            } else if (c == "-") {
              sum = a - b;
            } else if (c == "*") {
              sum = a * b;
            } else if (c == "/") {
              if (b == 0) {
                sum = "На нуль ділити не можна";
              } else {
                sum = a / b;
              }
            } else if (c == "**") {
              sum = a ** b;
            }
            let x = numbers.shift();
            console.log(x);
            numbers = [];
            numbers.push(x);
            numbers.push(sum);
            operands.splice(-1, 1);
            console.log(numbers, operands);
          }
          console.log(numbers, operands)

          /* Кінцеве обчислення при наявності лише  1 операнду в массиві  та 2 чисел в іншому массиві,обраховуємо їх */
          if (operands.length == 1) {

            let a = parseFloat(numbers[numbers.length - 2]);
            let b = parseFloat(numbers[numbers.length - 1]);
            let c = operands[operands.length - 1].key;
            let sum;

            if (c == "+") {
              sum = a + b;
            } else if (c == "-") {
              sum = a - b;
            } else if (c == "*") {
              sum = a * b;
            } else if (c == "/") {
              if (b == 0) {
                sum = "На нуль ділити не можна";
              } else {
                sum = a / b;
              }
            } else if (c == "**") {
              sum = a ** b;
            }
            /* Зачищаємо поля і массиви,виводимо результат */
            numbers = [];
            newArr = [];
            operands = [];
            operands.splice(-1, 1);
            resultBlock.innerText = sum;
            textArea.value = "";
          } else if (newArr.length == 1 && operands.length == 0) {
            resultBlock.innerText = numbers[0];
            numbers = [];
            newArr = [];
            operands = [];
            textArea.value = "";
          }
          /* !!!!!!!!! END !!!!!!   Операції над основною стрічкою */

          console.log(numbers, operands);
        }
      });
    });
  }


  /* Візуал долларів на фоні */
  function createDollars() {
    const dollar = document.createElement("div");
    dollar.classList.add("dollar");
    dollar.style.left = Math.random() * 100 + "vw";
    dollar.style.animationDuration = Math.random() + 2 + 3 + "s";
    dollar.innerText = `💲`;
    document.body.appendChild(dollar);
    setTimeout(function () {
      dollar.remove();
    }, 5000);
  }

  return {
    init: init,
  };

})();

calculator.init();


//